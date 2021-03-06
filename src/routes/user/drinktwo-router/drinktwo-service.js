const DrinkTwoService = {
    async insertDrinkTwo(db,drink){
        let value = await db.select('user_id').from('drinkTwo').where('user_id',drink.user_id)
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
            .into('drinkTwo')
            .returning('*')
            .then(([drink]) => drink)
        } else {
            console.log('drink already exists')
            return db
                .select('*')
                .from('drink')
                .where('user_id',drink.user_id)
        }
    },

    serializeDrinkTwo(drink){
        return {
            user_id: drink.user_id,
            duce: drink.ducer,
            eight_n_up: drink.eight_n_up,
            beer_bong: drink.beer_bong,
            shotgun: drink.shotgun,
            wine_flight: drink.wine_flight,
            beer_flight: drink.beer_flight,
        }
    },
    getUserDrinkTwo(db,userId){
      let result = db
      .select('*')
      .from ('drinkTwo')
      .where('user_id',userId)
      .first()

      if(!result){
          return {error: 'No results found'}
      }
    return result 
    },
    async patchUserDrinkTwo(db,id,userDrink){
        console.log('patch serivce',id,userDrink)

        let result = await db.select('*').from('drinkTwo').where('user_id',id)

        let resultObj = result[0]
        console.log('obj',resultObj)
    
        let updateDrink = {}
       
        for(let prop in userDrink){
            //console.log('prop',prop,userDrink[prop])
            if(resultObj.hasOwnProperty(prop)){
                //console.log('match',prop)
                //console.log('typeof',typeof prop, typeof userDrink[prop])
                updateDrink[prop] = (resultObj[prop] + userDrink[prop])
            }
        }
       console.log('update',updateDrink)
        return await db
        .select('*')
        .from('drinkTwo')
        .where('user_id',id)
        .update(updateDrink)
    },


}

module.exports = DrinkTwoService