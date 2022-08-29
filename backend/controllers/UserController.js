const User = require('../models/User')

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
       }
    }
}