const GraphService = {
  async getAllUserData(db){
        const allUserData = await db
            .select('user.id','user.username','drink.beer','drink.wine',
                    'drink.shots','drink.cocktail','seltzer',
                    'drink.craft_beer','drinkTwo.duce','drinkTwo.eight_n_up',
                    'drinkTwo.beer_bong','drinkTwo.shotgun','drinkTwo.wine_flight',
                    'drinkTwo.beer_flight')
            .from('user')
            .innerJoin('drink','drink.user_id','user.id')
            .innerJoin('drinkTwo','drinkTwo.user_id','user.id')

        console.log('alluserdata',allUserData)

        return allUserData
    },
}

module.exports = GraphService