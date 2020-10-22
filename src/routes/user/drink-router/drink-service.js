
const DrinkService = {
    async insertDrink(db,drink){

        let value = await db.select('user_id').from('drink').where('user_id',drink.user_id)
        let userId;

        if(value.length > 0){
            userId = await value[0].user_id
        } else {
            console.log('empty array/no drink with id post')
        }

        if(drink.user_id !== userId || drink.user_id == null || drink.user_id == undefined){
            return db
            .insert(drink)
            .into('drink')
            .returning('*')
            .then(([drink]) => drink)
        } else {
            return db
                .select('*')
                .from('drink')
                .where('user_id',drink.user_id)
        }
    },

    serializeDrink(drink){
        return {
            user_id: drink.user_id,
            beer: drink.beer,
            wine: drink.wine,
            shots: drink.shots,
            cocktail: drink.cocktail,
            date: drink.date,
            seltzer: drink.seltzer,
            craft_beer: drink.craft_beer,
        }
    },
    async getUserDrink(db,userId){
      let result = await db
      .select('*')
      .from ('drink')
      .where('user_id',userId)
      .first()

      if(!result){
          return {error: 'No results found'}
      }
    return result 
    },
    async patchUserDrink(db,id,userDrink){
<<<<<<< HEAD:src/routes/user/drink-service.js

=======
>>>>>>> version1-copy:src/routes/user/drink-router/drink-service.js
        let result = await db.select('*').from('drink').where('user_id',id)

        let resultObj = result[0]
    
        let updateDrink = {}
       
        for(let prop in userDrink){
            //console.log('prop',prop,userDrink[prop])
            if(resultObj.hasOwnProperty(prop)){
                //console.log('match',prop)
                //console.log('typeof',typeof prop, typeof userDrink[prop])
                updateDrink[prop] = (resultObj[prop] + userDrink[prop])
            }
        }
        return await db
        .select('*')
        .from('drink')
        .where('user_id',id)
        .update(updateDrink)
    },


}

module.exports = DrinkService