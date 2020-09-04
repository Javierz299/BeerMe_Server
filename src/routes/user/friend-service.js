const { contentSecurityPolicy } = require("helmet");

const FriendService = {
    //when sending friend request check if request already exists
    async insertFriendReq(db,request){
        console.log("insert request",request)
             //searching through db to see if request already exists
        let value = await db.select('*').from('friend').where('user_id',request.user_id)
            console.log('db value',value)
        //if their are multiple friend requests from a user then filter out ids
        // to allow new friend requests if not already made to specific user
    if(value.length === 0){
        console.log("add request")
        return db
            .insert(request)
            .into('friend')
            .returning('*')
            .then(([request]) => request)
    }
    function requestExists(istrue){
        return istrue.user_id === request.user_id && istrue.sent_request_to === request.sent_request_to
    }
if(value.length > 0){
    if(value.find(requestExists)){
        return {message: 'request already exists'}
    } else {
        console.log('add the request')
        return db
        .insert(request)
        .into('friend')
        .returning('*')
        .then(([request]) => request)
    }
}
    },
    serializeRequset(req){
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
    patchAcceptRequest(db,id,updateUser){
        console.log('accept',id,updateUser)
          return db
            .select('accepted')
            .from('friend')
            .where('user_id',id)
            .andWhere('sent_request_to',updateUser)
            .update({'accepted': true})
    },
   async patchDeclineRequest(db,id,updateUser){
        console.log('decline',id,updateUser)
          await db
          .select('declined')
          .from('friend')
          .where('user_id',id)
          .andWhere('sent_request_to',updateUser)
          .update({'declined': true})

        let declined = await db.select('declined').from('friend').where('user_id',id).andWhere('sent_request_to',updateUser)
          console.log('declined',declined)
          if(declined[0].declined){
              return db
              .from('friend')
              .where('user_id',id)
              .andWhere('sent_request_to',updateUser)
              .delete()
          }
    },
    async getFollowing(db,id){
        // select *
        // from Prices
        // where product_id = ?
        // order by updated_at desc 
        // limit 1
        let friend = await db.select('*').from('friend').where('user_id',id).andWhere({'accepted': true})
        console.log('friend db',friend)
        let friends = []
        let last = []
        for(let i = 0; i < friend.length; i++){
           let lastEntry = await db.select('*').from('').from('date').where('user_id',friend[i].sent_request_to).orderBy('date', 'desc').limit(1)
           let value = await db.select('*').from('user').join('drink', {'user.id': 'drink.user_id'}).where('id',friend[i].sent_request_to)

           if(!value){
               return {message: 'no posts'}
           }
            
           friends.push(value)
           last.push(...lastEntry) 
    
           if(friends[i][0].id === last[i].user_id){
               friends[i][0].last = last[i].date
           }

        }
        console.log('friends',friends)
        console.log("last entry",last)
        return friends
    }, 

}

module.exports = FriendService