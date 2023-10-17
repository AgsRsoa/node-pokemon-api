const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) =>{
    app.delete('/api/pokemons/:id', auth, (req,res)=> {
      Pokemon.findByPk(req.params.id).then(pokemon=>{
         
            if(pokemon===null){
                const message = "Le pokemon a supprimé n\'existe plus. Veuillez essayer un autre identifiant."
                res.status(404).json({message})
            }
            const pokemonDeleted = pokemon;
            //return factorise l'erreur 500
       return   Pokemon.destroy({
                where: {id:pokemon.id}
            }) .then(_ =>{
                //on retourne le pokemon initial avant de le suppr d'où 
                const message = `Le pokemon avec l'identifiant n° ${pokemonDeleted.id} a bien été supprimé`
                res.json({message, data:pokemon})
            })
            .catch(error => {
                const message = "La requête par Sequelize pour supprimer un pokemon en base de données a écouhé"
            })
        }
    )
    })
}