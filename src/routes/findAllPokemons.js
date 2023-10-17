const { Pokemon } = require('../db/sequelize')//sequelize fournit le modele 
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) =>{
    app.get('/api/pokemons', auth,  (req,res)=>{
        
        if(req.query.name){
            const name = req.query.name; //extrait le paramètre name de la requête passer par la pppté query
            const limit = parseInt(req.query.limit) || 5; //limit est un nombre sous forme de cc
            
            if(name.length < 2){
                const message = "Le nom recherché doit contenir au moins 2 caractères"
                return res.status(400).json({message: message})
            }
            return Pokemon.findAndCountAll({ 
                where: {
                    name: {
                        [Op.like]:`%${name}%`     
                    }},
                    order: ['name'],
                    limit:limit
            })
            .then(({count,rows}) => {
                const message = `Il y a ${count} pokémons qui correspondent au terme ${name}`;
                res.json({message: message, data: rows})
            })
        } else {
        Pokemon.findAll({order:['name']}) 
        .then(pokemons => { 
        const message = "La liste de tous les pokemons a été récupérée";
        res.json({message, data:pokemons})})
        .catch(error => {
            const message = "La liste des pokémons n\'a pas pu être récupérée. Réessayer dans quelques instants."
            res.status(500).json({message, data : error})
        })

        }

    })
   
}