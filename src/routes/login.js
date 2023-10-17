const { User } = require('../db/sequelize')
const brcypt =require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

 module.exports = (app) =>{
    app.post('/api/login', (req,res) =>{

        User.findOne({where: {username: req.body.username}})
        .then(user=>{

            if(!user){
                const message = "L'utilisateur n'existe pas"
                return res.status(404).json({message: message})
            }
            brcypt.compare(req.body.password, user.password)
            .then(isPasswordValid =>{
                if(!isPasswordValid){
                    const message = "Le mot de passe n'existe pas";
                    return res.status(401).json({message:message, data:user}) //401 car le client n'a pas le droit d'accéder
                }

                //JWT
                const token = jwt.sign({userId: user.id},privateKey,{expiresIn:86400})

                const message = "L'utilisateur a été connecté avec succès";
                return res.json({message:message, data:user, token })
            })
        })
        .catch(error => {
            const message = "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants"
            res.json({message:message, data: error})
        })
    })
 } 