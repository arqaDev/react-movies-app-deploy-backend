const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const wishlistMovie = require('./wishlistMovieRoute')


router.use('/user', userRouter)
router.use('/wishlist', wishlistMovie)

module.exports = router
