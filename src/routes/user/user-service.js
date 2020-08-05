

const UserService = {
    insertUser(db,newUser){
        return db
            .insert(newUser)
            .into('user')
            .returning('*')
            .then(([user]) => user)
    },
    serializeUser(user){
        return {
            name: user.full_name,
            email: user.email
        }
    },
}