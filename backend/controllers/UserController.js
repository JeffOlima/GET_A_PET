const User = require('../models/User')

const bcrypt = require('bcrypt')

const createUserToken = require('../helpers/create-user-token')

module.exports = class UserController{
    static async register(req, res){
       const {name, email, phone, password, confirmpassword} =req.body
    
       //Validations
       if(!name){
           res.status(422).json({ message: 'Name required !'})
           return
       } 
       if(!email){
        res.status(422).json({ message: 'Email required !'})
        return
       } 
       if(!phone){
        res.status(422).json({ message: 'Phone required!'})
        return
       } 
       if(!password){
        res.status(422).json({ message: 'Password required!'})
        return
       } 
       if(!confirmpassword){
        res.status(422).json({ message: 'Confirmation required!'})
        return
       } 
       if(password !==confirmpassword){
        res.status(422).json({
             message: 'password and password confirmation do not match!'
            })
        return
       }
       
       //check if user exists 
       const userExists = await User.findOne({ email: email})
        
       if(userExists){
           res.status(422).json({
               message: 'This email already exists on the system!'
           })
           return
       }

       //create a pasword
       const salt = await bcrypt.genSalt(12)
       const passwordHash = await bcrypt.hash(password, salt)

       //create a user
       const user = new User({
           name,
           email,
           phone,
           password: passwordHash,
       })

       try {
           const newUser = await user.save()
          
           await createUserToken(newUser, req, res)
       } catch (error) {
           res.status(500).json({ message: error})
       }
    }
    static async login(req, res){
        const {email, password} = req.body

        if(!email){
            res.status(422).json({ message: 'email required!'})
            return
           } 

           if(!password){
            res.status(422).json({ message: 'Password required!'})
            return
           } 
               
           //check if user exists 
          const user = await User.findOne({ email: email})
        
          if(!user){
           res.status(422).json({
               message: 'There is no account using this email!'
           })
           return
       }
       //check if password match with db password
       const checkPassword = await bcrypt.compare(password, user.password)

       if(!checkPassword){
           res.status(422).json({
               message: 'Invalid password',
           })
           return
       }
       await createUserToken(user, req, res)
    }
}