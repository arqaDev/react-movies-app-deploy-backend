const { User, Wishlist } = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// function for generate token 
const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '30m'}
    )
}

class UserController {

    // registration function, which return token with data about user
    async registration(req, res, next) {
        const {email, password} = req.body
        const validEmail = email.toLowerCase()
        
        // check, if email or passord is empty, then return error
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный пароль или email'))
        }
        
        // find user in database
        const candidate = await User.findOne({where: {email: validEmail}})

        // if he's found, then return error
        if (candidate) {
            return next(ApiError.badRequest('Такой пользователь уже существует'))
        }
        
        // make hash of password, add data about user into DB, create wishlist for new user, make generate of token
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        const wishlist = await Wishlist.create({userId: user.id})
        const token = generateJwt(user.id, user.email)

        return res.json({token})
    }

    // login function return user token
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        
        // if user not in DB, then return error
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким именем не найден'))
        }

        // check entered password
        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный логин или пароль'))
        }

        const token = generateJwt(user.id, user.email)

        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
}

module.exports = new UserController()