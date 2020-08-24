
const FriendService = {
    //when sending friend request check if request already exists
   async insertFriendReq(db,request){
        console.log(request)
             //searching through db to see if request already exists
        let value = await db.select('id').from('friend').where('id',request.id)
            console.log('value',value)
       

      

    },
    serializeRequset(req){
        return {
            user_id: req.id,
            sent_request_to: req.friendId,
            accepted: req.boolean,
            declined: req.boolean
        }
    },
    async getFriendId(db,email){
        //check if friend exists
        //send back id if friend exists
        console.log('email',email)
        let value = await db.select('id').from('user').where('email',email)
        let friendId;
        console.log('getfriendid',value)

        if(value.length > 0){
            friendId = await value[0].id
        } else {
            console.log('no user by that email exists')
        }
        if(!friendId){
            return {error: 'no friend id'}
        }

        return db
            .select('id')
            .from('user')
            .where('id',friendId)
            .first()
    },


}

module.exports = FriendService