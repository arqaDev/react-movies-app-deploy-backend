const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        // receive token from request
        const token = req.headers.authorization.split(' ')[1]

        // if token has not set, then return error
        if (!token) {
            res.status(401).json({message: 'Не авторизован'})
        }

        // decode token and set data about user to var
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({message: 'Не авторизован'})
    }
}