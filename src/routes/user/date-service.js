const { use } = require("./user-router")
const { contentSecurityPolicy } = require("helmet")

const DateService = {
    insertDate(db,date){
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
    },
   async getLastEntry(db,userId){
        console.log('lastservice ',userId)
        let entries =  await db
            .select('date')
            .from('date')
            .where('user_id',userId)
            .then(res => res[res.length - 1])
        console.log('dates',entries)
       // console.log('last entry',entries[entries.length - 1])
        return entries
    }
}

module.exports = DateService