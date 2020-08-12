

const UserService = {
    async insertUser(db,newUser){
        console.log(newUser.email)
        let value = await db.select('email').from('user').where('email',newUser.email)
        console.log('value',value)
        let emailValue;
        if(value.length > 0){
            emailValue = await value[0].email
        } else {
            console.log('empty array/no user with that email')
        }
       

        if(newUser.email !== emailValue || newUser.email == null || newUser.email == undefined){
            console.log('add new user')
            return db
            .insert(newUser)
            .into('user')
            .returning('*')
            .then(([user]) => user)
        } else {
            console.log('user already exists')
            return db
                .select('*')
                .from('user')
                .where('email',newUser.email)
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
            .first()
    },

}

module.exports = UserService