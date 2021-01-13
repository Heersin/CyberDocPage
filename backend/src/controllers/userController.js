import User from '../models/user'
import auth from '../middleware/auth'
import Router from 'express'

const router = Router()

// for develop only
const user_list = async(req, res) => {
    const users = await req.context.models.User
        .find()
        .select({
            'uid': 1,
            '_id': 1,
            'username': 1,
            'email': 1,
            'bioinfo': 1
        })

    return res.send(users)
}


// Register service
const user_signup = async(req, res, next) => {
    try{
        const exists = await User.findOne({email: req.body.email})
        if( exists ){
            return res.status(401).send({error: 'User allready exists'})
        }

        // save user
        // TODO check potential Attack ?
        const user = new User(req.body)
        await user.save()

        // gen token
        const token = await user.generateAuthToken()

        res.status(201).send({user, token})
    }
    catch(error){
        res.status(400).send(error)
    }
}


// Login auth
const user_login = async(req, res) => {
    const email = await User.findOne({
        email: req.body.email
    })

    // no such email in db
    if(!email){
        try {
            const user = new User(req.body)
            await user.save()

            const token = await user.generateAuthToken()
            return res.status(201).send({user, token})
        }
        catch (error){
            return res.status(400).send(error)
        }
    }

    try {
        const {email, password} = req.body
        const user = await User.findByEmailandPwd(email, password)

        if(!user){
            return res.status(401).send({error: 'Login failed'})
        }

        const token = await user.generateAuthToken()
        res.send({user, token})
    }
    catch(error){
        res.status(400).send(error)
    }
}


// user update
// frontend validate data ?
// or validate here ?
// TODO : vuln here maybe
const user_update = async(req, res) => {
    try {
        const user = await req.context.models.User.findByIdAndUpdate(
            req.params.uid,
            {
                username: req.body.username,
                bioinfo: req.body.bioinfo,
            },
            
            function(err, docs){
                if (err){
                    res.status(500).send(err)
                }
                else {
                    return res.send(docs)
                }
            })
    }
    catch(error){
        res.status(500).send(error)
    }
}

// view profile
const user_viewbio = async(req, res) => {
    res.send(req.user)
}


