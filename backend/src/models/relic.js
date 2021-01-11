import mongoose from 'mongoose';

const relicSchema = new mongoose.Schema({
    rid: {
        type: String,
        unique: true
    },

    // docs of relic
    rdocs: [{
        info: {
            type: String,
            required: true
        },

        // read level limit
        rlevel: {
            type: Number,
            default: 4
        },

        // write level limit
        wlevel: {
            type: Number,
            default: 4
        },

        // path to related pics
        pics: [{
            pname: {
                type: String
            },

            ppath: {
                type: String
            }
        }]
    }],
})