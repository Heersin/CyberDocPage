import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({

    // login id
    uid: {
        type: String,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if ( !validator.isEmail(value) ) {error: "Email Address Invalid"}
        }
    },

    password: {
        type: String,
        minlen: 6
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

    // screen name
    username: {
        type:String,
    },

    // resume
    bioinfo: {
        type: String,
    },

    // picture on bio card
    // a path to it
    biopic: {
        type: String
    },

    // permission control level
    // level 0 means Super Admin
    // level 1 is admin
    // level 2 is master
    // level 3 is elite agent
    // level 4 is normal agent
    level: {
        type: Number,
        default: 4
    },

    lastlog: {
        type: String
    }
},
    { timestamps: true, },
    { toJSON: 
        { virtuals: true }, },
    { toObject:
        { virtuals: true }}
)

// userSchema.set('toObject', {virtuals: true})
// userSchema.set('toJSON', {virtuals: true})

// middle ware pre
// save
userSchema.pre('save', async function(next){
    // hash password
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


// define instance methods
userSchema.methods.generateAuthToken = async function() {
    // token generation
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// static functions
userSchema.statics.findByEmailAndPwd = async (email, password) => {
    function findCredentialError(error){
        this.error = error
        console.log("cannot find by email and password")
    }

    findCredentialError.prototype = new Error()

    const user = await user.findOne({email})
    if (!user){throw new findCredentialError("No such mail")}

    const isPwd = await bcrypt.compare(password, user.password)
    if (!isPwd){throw new findCredentialError("password not matched")}

    return user
}

const User = mongoose.model('User', userSchema)

export default User;