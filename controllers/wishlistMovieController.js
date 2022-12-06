const ApiError = require('../error/ApiError')
const { WishlistMovie } = require('../models/models')


class wishlistMovieController {

    // add movie into DB 
    async addMovie(req, res, next) {
        try {
            const { id, title, budget, genres, overview, release_date, status, vote_average, img, production_countries, wishlistId } = req.body
            const movie = await WishlistMovie.create({id, title, budget, genres, overview, release_date, status, vote_average, img, production_countries, wishlistId})
            return res.json(movie)
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    // return response with movie data
    async getAll(req, res) {
        try {
            const {wishlistId} = req.body
            const movies = await WishlistMovie.findAndCountAll({where: {wishlistId}})
            return res.json(movies)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    // delete movie from DB  
    async destroy(req, res, next) {
        try {
            const {id} = req.params
            const movieDeleteId = await WishlistMovie.findByPk(id)
            const deleteMovie = await movieDeleteId.destroy()
            return res.json(deleteMovie)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new wishlistMovieController()