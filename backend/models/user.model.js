import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5; characters']
    },
    password: {
        type: String,
        // required: true,
        select: false,
    },
    googleId: {
        type: String,
        // unique: true,
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
        // unique: true,
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/dqj0xgk8h/image/upload/v1697060982/DefaultProfilePicture.png'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'} )
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

export const userModel = mongoose.model('user', userSchema)