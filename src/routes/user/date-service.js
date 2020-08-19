
const DateService = {
    async insertDate(db,date){
        console.log(date)

        return db
            .insert(date)
            .into('date')
            .returning('*')
            .then((([date]) => date))
    },
    serializeDate(date){
        return {
            user_id: date.user_id,
            date: date.date,
        }
    }
}

module.exports = DateService