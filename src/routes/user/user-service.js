

const UserService = {
    async insertUser(db,newUser){

        let value = await db.select('email').from('user').where('email',newUser.email)
        console.log('value',value)
        let emailValue = await value[0].email
        console.log('emailValue',emailValue)

        if(newUser.email !== emailValue || newUser.email == null || newUser.email == undefined){
            console.log('add new user')
            return db
            .insert(newUser)
            .into('user')
            .returning('*')
            .then(([user]) => user)
        } else {
            console.log('user already exists')
            return 'already exists'
        }
        
    },
    serializeUser(user){
        return {
            username: user.name,
            email: user.email,
            email_verified: user.email_verified,
        }
    },

    getUserProfile(db,email){
        console.log('get user email',email)
        return db 
            .select('*')
            .from('user')
            .where('email',email)
    },

}

module.exports = UserService