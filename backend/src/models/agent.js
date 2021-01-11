import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
    aid: {
        type: String,
        unique: true
    },

    bioinfo: {
        type: String,
    },

    // path to directory
    biopics: {
        type: String,
    },

    // level of agent
    biolevel: {
        type: Number,
        default: 4
    },

    // connection way
    // 1 - email
    // 2 - phone
    // 3 - special
    // 0 - unknown
    bioconnType: {
        type: Number,
        default: 0
    },

    bioconn: {
        type: String,
    },

    // current stauts
    biostatus: {
        type: Number, 
        enum:[
            0, // secrect
            1, // activating
            2, // pending
            3, // hiding
            4, // death
            5, // lost
            6, // unknown
        ],
        default: 2
    },

    // related relics
    relatedRelics: [{
        rid: {
            type: String,
            unique: true
        },
    }],

    // skill
    skills: [{
        skillname: {
            type: String
        },
        skilldesc: {
            type: String
        }
    }]
})