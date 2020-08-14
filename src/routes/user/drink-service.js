const DrinkService = {
    insertDrink(db,drink){
        console.log('drink',drink)

        return db
            .insert(drink)
            .into('drink')
            .returning('*')
            .then(([drink]) => drink)

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
        console.log('get user id',userId)
        return db
            .select('*')
            .from ('drink')
            .where('user_id',userId)
            .first()
    },

}

module.exports = DrinkService