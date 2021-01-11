
import mongoose from 'mongoose'
import validator from 'validator'

const menuCollectionSchema = new mongoose.Schema({

    // item id
    iid: {
        type: String,
        unique: true
    },

    // item name
    iname: {
        type: String,
    },

    // short info for introduction
    idesc: {
        type: String,
    },

    // item thumbnail
    ithumb: {
        type: String,
    },

    // path to detail api address?
    // api : ...

})