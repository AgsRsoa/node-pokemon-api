const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

/*module.exports = (app) =>{
    app.put('./api/pokemons/:id', (req,res)=>{
       
       Pokemon.update(req.body, {where:{ id: id}})
        .then(_ => {
    
            return Pokemon.findByPk(id).then(pokemon =>{

                if(pokemon === nul){
                    const message = "Le pokemon à modifier n'existe pas";
                    return res.status(404).json({message})
                }
                const message = `Le pokemon ${pokemon.name} a bien été modifié`
                res.json({data:pokemon})
            })
        })
        .catch(error =>{
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data: error})
            }
            const message = "Le pokemon n\'a pas pu être modifié. La requête par Sequelize pour modifié un pokemon en base de données a échoué"
            res.status(500).json({message, data: error})
        })
    })
}*/



module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
        //avec return on transmet l'erreur renvoyer par findByPk, qui renvoie une promesse, au bloc catch
        //permet de traiter toutes les erreur 500 en une seule fois
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon === null) {
          const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
     if(error instanceof UniqueConstraintError){
        return res.status(400).json({message: message.error, data:error})
     }
      const message = `Le pokémon n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}