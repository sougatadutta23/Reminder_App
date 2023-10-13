const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//static signup method
userSchema.statics.signup = async function(email, password){ //don't use arrow funcs when 'this' keyword is used
    
    if(!email || !password)
        throw Error('All fields must be filled')
    if(!validator.isEmail(email))
        throw Error('Invalid Email')
    if(!validator.isStrongPassword(password))
        throw Error('Weak Password')

    const exists = await this.findOne({email})

    if(exists)
        throw Error('Email already in use')

    // salt - set of characters appended to passwords in order to differentiate the same passwords
    const salt = await bcrypt.genSalt(10) // salt of 10 chars generated
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password:hash})

    return user
}

userSchema.statics.login = async function(email, password){

    if(!email || !password)
        throw Error('All fields must be filled')

    const user = await this.findOne({email})

    if(!user)
        throw Error('Incorrect Email')

    const match = await bcrypt.compare(password, user.password)

    if(!match)
        throw Error('Password incorrect')

    return user
}

module.exports = new mongoose.model('User',userSchema)