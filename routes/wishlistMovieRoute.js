const Router = require('express')
const router = new Router()
const wishlistMovieController = require('../controllers/wishlistMovieController')


router.post('/movie/add', wishlistMovieController.addMovie)
router.post('/movies', wishlistMovieController.getAll)
router.delete('/movie/delete/:id', wishlistMovieController.destroy)

module.exports = router