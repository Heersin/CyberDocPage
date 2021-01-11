import cors from 'cors'
import express from 'express'
import {connectDB} from './config/db.js'
import {globalCfg} from './config/config.js'


// middleware set
const app = express();

app.use(express.json())
app.use(express.urlencoded( {extended: true}));

app.use(
    cors({
        credentials: true,
        origin: true
    })
)

app.options('*', cors())

app.use(async (req, res, next) => {
    req.context = {
        models,
    }
    next();
})


// manage router path here



// error handle
app.use((error, req, res, next) => {
    if ( !error.statusCode )
    { error.statusCode = 500 }

    if (error.statusCode === 301)
    { return res.status(301).redirect('/notfound')}

    return res.status(error, statusCode)
              .json({error: error.toString() })
})


app.get('*', (req, res, next) => {
    const error = new Error(
        `${req.ip} access bad url ${req.originalUrl}`,
    )

    error.statusCode = 301

    next(error)
})


// connect DB and start

connectDB().then(async() => {
    app.listen(globalCfg.PORT, () => 
        {console.log(`running on ${PORT}`)})
})