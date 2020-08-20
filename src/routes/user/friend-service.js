
const FriendService = {
    // when sending a request need to check if user even exists
    //if they do, then post. if not do nothing. client will handle
    // empty data if cant finduser/doesnt exists
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
    }


}

module.exports = FriendService