import mongoose from 'mongoose'
import validator from 'validator'

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
)