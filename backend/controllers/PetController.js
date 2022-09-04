const Pet = require('../models/Pet') 

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
    //create a pet
    static async create(req, res) {
        const { name, age, weight, color } = req.body

        const images = req.files

        const available = true 

        //images upload 

        // validations 
        if(!name){
            res.status(422).json({ mesage: "Name required"})
            return
        }
        if(!age){
            res.status(422).json({ mesage: "Age required"})
            return
        }
        if(!weight){
            res.status(422).json({ mesage: "weight required"})
            return
        }
        if(!color){
            res.status(422).json({ mesage: "color required"})
            return
        }
        if(images.length === 0){
            res.status(422).json({ message: "Images required"})
            return
        }
        // get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        // create a pet 
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images:[],
            user: {
               _id: user._id,
               name: user.name,
               image: user.image,
               phone: user.phone, 
            },
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })
          

        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet registered successfully!',
                newPet,
            })
        } catch (error) {
            res.status(500).json({ message: error})
        }
    }
   
    static async getAll(req, res){
        const pets = await Pet.find(). sort('-createdAt')

        res. status(200).json ({
            pets: pets,
        })
        
    }

    static async getAllUserPets(req, res){
        //get user from token 
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'user._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }

    
    static async getAllUserAdoptions(req, res){
        //get user from token 
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'adopter._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }

    static async getPetById(req, res){
        const id = req.params.id

        //check if id is valid
        if(!ObjectId.isValid(id)){
            res.status(422).json({ message: 'Invalid ID'})
            return
        }

        //check if pet exists 
        const pet = await Pet.findOne({_id: id})

        if (!pet){
            res.status(404).json({ message : 'Pet not found!'})
        }

        res.status(200).json({
            pet: pet,
        })
    }

    static async removePetById(req, res){
        const id = req.params.id

        //check if id is valid
        if(!ObjectId.isValid(id)){
            res.status(422).json({ message: 'Invalid id!'})
            return
        }

        //check if pet exists 
        const pet = await Pet.findOne({_id: id})

        if (!pet){
            res.status(404).json({ message : 'Pet not found!'})
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()){
            res.status(422)
            .json({
                message: "We are facing a problem try it latter!"
            })
        }

        await Pet.findByIdAndRemove(id)

        res.status(200).json({ message: 'Pet removed successfully!'})
    }
}