

const UserService = {
    async insertUser(db,newUser){
        //check db if email exits
        let value = await db.select('email').from('user').where('email',newUser.email)
        let emailValue;
        //if value contains ele in arr then grab email if not log()
        if(value.length > 0){
            emailValue = await value[0].email
        } else {
            console.log('empty array/no user with that email')
        }
        
        if(newUser.email !== emailValue || newUser.email == null || newUser.email == undefined){
            return db
            .insert(newUser)
            .into('user')
            .returning('*')
            .then(([user]) => user)
        } else {
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
        return db 
            .select('*')
            .from('user')
            .where('email',email)
            .first()
    },

}

module.exports = UserService