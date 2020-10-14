const CheersService = {
    //check if cheers request already exists
    async insertCheers(db,request){
        console.log('cheers',request)

        let data = await db.select('*').from('cheers').where('user_id',request.user_id);
        console.log('db data', data)

        const cheersSent = (isTrue) => {
            return isTrue.user_id === request.user_id && isTrue.sent_to === request.sent_to;
        };

        if(data.length === 0){
            return db.insert(request).into('cheers').returning('*').then(([request]) => request);
        } else if(data.length > 0){
            if(data.find(cheersSent)){
                console.log('cheers exists',)
                return{message: 'Already sent a cheers'};
            } else {
                console.log('send/add the cheers')
                return db.insert(request).into('cheers').returning('*').then(([request]) => request);
            };
        };
    },
    serializeCheers(req){
       return { 
            user_id: req.user_id,
            sent_to: req.sent_to,
        };
    },
    async getCheers(db,id){
        let value = await db.select('*').from('cheers').where('sent_to',id);

        if(value.length === 0){
            return{message: 'no cheers yet'}
        }

        return value;
    },
    deleteCheers(db,cheers){
        
        return db
            .from('cheers')
            .where('user_id',cheers.user_id)
            .andWhere('sent_to',cheers.sent_to)
            .delete()
    },


};

module.exports = CheersService;