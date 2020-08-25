
const FriendService = {
    //when sending friend request check if request already exists
   async insertFriendReq(db,request){
        console.log("insert request",request)
             //searching through db to see if request already exists
        let value = await db.select('*').from('friend').where('user_id',request.user_id)
            console.log('db value',value)
       
        let requestId;

            if(value.length > 0){
                requestId = await value
            } else {
                console.log('empty array/no request with id')
            }
            console.log('db data',requestId)
            // if(request.user_id !== requestId || request.user_id == null || request.user_id == undefined){
            //     console.log('add new request')
            //     return db
            //     .insert(request)
            //     .into('friend')
            //     .returning('*')
            //     .then(([request]) => request)
            // } else {
            //     console.log('request already exists')
            //     return db
            //         .select('*')
            //         .from('friend')
            //         .where('user_id',request.user_id)
            // }
      

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


}

module.exports = FriendService