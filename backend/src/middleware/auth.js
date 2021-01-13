import jwt from 'jsonwebtoken'
import User from '../models/user'

const auth = async(req, res, next) => {
    const delimiter = ':'
    const token = req.header('Authtoken').replace(':', '')
    const data = jwt.verify(token, process.env.JWT_KEY)

    try{
        const user = await User.findOne({_id: data.id, 'tokens.token':token})

        if (!user){
            throw new Error()
        }

        // repack request with user and token
        req.user = user
        req.token = token
        next()
    }
    catch(error){
        res.status(401).send({error: "Not Authorized"})
    }
}

export default auth