const express = require('express') //prends express dans node_modules
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require ('cors') //rendre API accessible aux app exterieures

const corsOptions = {
    origin:'https://preview-1632138.playcode.io' , 
    optionsSuccessStatus: 200
    
};

  
const app = express()//serveur web de l'API Rest, nouvelle instance express
const port = process.env.PORT || 3000

app
.use(favicon(__dirname + '/favicon.ico'))
.use(bodyParser.json()) //parse automatiquement les cc reçues de toutes les requêtes en JSON
.use(cors(corsOptions))

sequelize.initDb()

app.get('/',(req,res)=>{
    res.json('Hello, Heroku !')
})

//Ici les futurs points de terminaison
/*Ou import du point de terminaison : 
const findAllPokemons = require ('./src/routes/findAllPokemons')
Puis nouvelle route auprès d'Express en appelant notre point de terminaison avec le param app
findAllPokemons(app)
*/
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//Ajout de la gestion des erreurs
app.use(({res}) => {
    const message = "Désolé cette page est inexistante.Essayer une autre URL"
    res.status(404).json({message})
})

app.listen(port, ()=>console.log(`L'application Node est démarée sur : http://localhost:${port} `))




