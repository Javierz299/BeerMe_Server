const GraphService = {
  async getAllUserData(db){
        const allUserData = await db
            .select('user.id','user.username','drink.beer','drink.wine',
                    'drink.shots','drink.cocktail','seltzer',
                    'drink.craft_beer')
            .from('user')
            .innerJoin('drink','drink.user_id','user.id')

        return allUserData
    },
}

module.exports = GraphService