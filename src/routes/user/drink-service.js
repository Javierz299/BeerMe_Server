const DrinkService = {
    async insertDrink(db,drink){
        console.log('drink',drink)

        let value = await db.select('user_id').from('drink').where('user_id',drink.user_id)
        let userId;

        if(value.length > 0){
            userId = await value[0].user_id
        } else {
            console.log('empty array/no drink with id post')
        }

        if(drink.user_id !== userId || drink.user_id == null || drink.user_id == undefined){
            console.log('add new drink')
            return db
            .insert(drink)
            .into('drink')
            .returning('*')
            .then(([drink]) => drink)
        } else {
            console.log('drink already exists')
            return db
                .select('*')
                .from('drink')
                .where('user_id',drink.user_id)
        }

        // return db
        //     .insert(drink)
        //     .into('drink')
        //     .returning('*')
        //     .then(([drink]) => drink)

    },

    serializeDrink(drink){
        return {
            user_id: drink.user_id,
            beer: drink.beer,
            wine: drink.wine,
            shots: drink.shots,
            cocktail: drink.cocktail,
            date: drink.date
        }
    },
    getUserDrink(db,userId){
      let result = db
      .select('*')
      .from ('drink')
      .where('user_id',userId)
      .first()

      if(!result){
          return {error: 'No results found'}
      }
    return result 
    },
    patchUserDrink(db,id,userDrink){
        return db
            .select('drink')
            .where({id})
            .update(userDrink)
    },

}

module.exports = DrinkService