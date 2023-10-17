const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) =>{
    app.get('/api/pokemons/:id',auth, (req,res)=> {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            if(pokemon === null){
                const message = "Le pokemon demandé n\'existe pas.Réessayer avec un autre identifiant."
                return res.status(404).json({message})

            }else{
                const message = "Un pokemon a bien été trouvé"
                res.json({message, data:pokemon})
            }
            })
            .catch(error =>{
                const message = "La requête par Sequelize (serveur) pour récupérer le pokemon dans la base de données a echouhé."
                res.status(500).json({message, data: error})
            })
    })
   

}