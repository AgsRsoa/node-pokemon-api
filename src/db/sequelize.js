const {Sequelize, DataTypes} = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

let sequelize 

if(process.env.NODE_ENV === "production"){
     sequelize = new Sequelize (
        'txh0y9l7mjq4nny4',
        'h8jab69nruszlv3p', 
        'oukeaz37qh29gc44', 
        {
            host:'dcrhg4kh56j13bnu.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            dialect: 'mariadb',
            dialectOptions: { timezone: 'Etc/GMT-2'}  
        ,
        logging: true
    })
} else {
     sequelize = new Sequelize (
        'pokedex',//nom BDD 
        'root', //id pour accès à BDD root pour Maria DB 'root' par défaut
        '', //mdp 
        {
            host:'localhost',
            dialect: 'mariadb',
            dialectOptions: { timezone: 'Etc/GMT-2'}  
        ,
        logging: false
    })

}


const Pokemon = PokemonModel(sequelize,DataTypes) //Instanciation du modele PokemonModel
const User = UserModel(sequelize, DataTypes)

const initDb = ()=>{
    return sequelize.sync().then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name:pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture:pokemon.picture,
                types: pokemon.types,
           }).then(pokemon=>console.log(pokemon.toJSON()))
        })
       console.log('La base de données a bien été initialisée ')
      
       bcrypt.hash('pikachu', 10)
       .then(hash => User.create({ username: 'pikachu', password: hash }))
       .then(user => console.log(user.toJSON()))
   
    })

  
}

//imports de la fonction d'initialisation de la DB et du modèle sequelize Pokemon
module.exports = {
    initDb,Pokemon,User
}
