//import mongoose from 'mongoose'

const mongoose = require('mongoose')
const user = "test"
const password = "test"
const address = "localhost"
const port = "27017"
const db_name = "test"
const conn = `mongodb://${user}:${password}@${address}:${port}/${db_name}`

console.log(conn)

const connectDB = () => {
    return mongoose.connect(conn, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}

export {connectDB}