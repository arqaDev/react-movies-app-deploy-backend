const sequelize = require('../db')
const { DataTypes } = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false}
})

const Wishlist = sequelize.define('wishlist', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
})

const WishlistMovie = sequelize.define('wishlist_movie', {
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    budget: {type: DataTypes.INTEGER, allowNull: false},
    genres: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
    overview: {type: DataTypes.TEXT, allowNull: false, unique: true},
    release_date: {type: DataTypes.DATEONLY, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    vote_average: {type: DataTypes.FLOAT, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false, unique: true},
    production_countries: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false}
})

User.hasOne(Wishlist)
Wishlist.belongsTo(User)

Wishlist.hasMany(WishlistMovie)
WishlistMovie.belongsTo(Wishlist)

module.exports = {
    User,
    Wishlist,
    WishlistMovie,
}