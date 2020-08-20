
const FriendService = {
    //when sending friend request check if request already exists
   async insertFriendReq(db,request){
        console.log(request)
             //searching if email exists
        let value = await db.select('id').from('user').where('email',request.id)
        let idRequest;
        console.log('request value',value)
        //if it does get id
        if(value.length > 0){
            idRequest = await value[0].id
        } else {
            console.log('no user by that email exists')
        }

        console.log('idRequest',idRequest)
        if(request.id !== idRequest || request.id == null || request.id == undefined){
            console.log('post friend request')
            return db
            .insert(request)
            .into('friend')
            .returning('*')
            .then(([friend]) => friend)
        } else {
            console.log('friend request already exists')
            return db
            .select('*')
            .from('friend')
            .where('id',request.id)
        }

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
        let value = await db.select('id').from('user').where('email',email.email)
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