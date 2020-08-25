
const FriendService = {
    //when sending friend request check if request already exists
   async insertFriendReq(db,request){
        console.log("insert request",request)
             //searching through db to see if request already exists
        let value = await db.select('user_id').from('friend').where('user_id',request.user_id)
            console.log('db value',value)
       

      

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