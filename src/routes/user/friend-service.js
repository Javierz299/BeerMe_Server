
const FriendService = {
    //when sending friend request check if request already exists
   async insertFriendReq(db,request){
        console.log("insert request",request)
             //searching through db to see if request already exists
        let value = await db.select('*').from('friend').where('user_id',request.user_id)
            console.log('db value',value)

        let requestId;

        //if their are multiple friend requests from a user then filter out ids
        // to allow new friend requests if not already made to specific user
        if(value.length > 0){
            value.filter(item => {
                if(item.user_id === request.user_id && 
                    item.sent_request_to !== request.sent_request_to){
                        console.log('add new request as long as its not to the same perosn')
                        return db
                        .insert(request)
                        .into('friend')
                        .returning('*')
                        .then(([request]) => request)
                } else if(item.user_id === request.user_id && 
                    item.sent_request_to === request.sent_request_to){
                    console.log(`request to ${request.sent_request_to} already exists`)
                    return db
                    .select('*')
                    .from('friend')
                    .where('user_id',request.user_id)
                }
            })
        }

            if(value.length > 0){
                requestId = await value
            } else {
                console.log('empty array/no request with id')
            }
           
            //if request id is empty/undfined then no initial friend request has been made
            if(!requestId){
                console.log('add new request')
                return db
                .insert(request)
                .into('friend')
                .returning('*')
                .then(([request]) => request)
            }

    },
    serializeRequset(req){
        console.log('request',req)
        return {
            user_id: req.user_id,
            sent_request_to: req.sent_request_to,
        }
    },
    async getFriendId(db,email){
        //check if friend exists
        //send back id if friend exists
        console.log('email',email)
        let value = await db.select('id').from('user').where('email',email)
        let friendId;

        if(value.length > 0){
            friendId = await value[0].id
        } else {
            console.log('no user by that email exists')
        }
        if(!friendId){
            return {error: 'no friend id'}
        }

        return db
            .select('*')
            .from('user')
            .where('id',friendId)
            .first()
    },
   async getRequests(db,id){
    let value = await db.select('*').from('friend').where('sent_request_to',id)
    console.log('value',value)
    
    if(value.length > 0){
    let filtered = value.filter(item => item.accepted === null && item.declined === null)
    let names = []

        for(let i = 0; i < filtered.length; i++){
            await db.select('username').from('user').where('id',filtered[i].user_id)
                .then(pending => names.push([...pending,filtered[i].user_id]))
        }
        console.log('names',names)
        return names
    }

    if(value.length === 0){
        return {message: 'no pending requests'}
    }
    
    },
    patchAcceptRequest(db,id){
        console.log('db,id,bool',id)
          return db
            .select('accepted')
            .from('friend')
            .where('user_id',id)
            .update({'accepted': true})
    },


}

module.exports = FriendService