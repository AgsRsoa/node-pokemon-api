//Ici endpoints pour récupérer des données sur une liste statique
/*Middleware qui affiche les requêtes reçues par l'API
const logger = (req,res,next)=>{
    console.log(`URL: ${req.url}`);
    next();
}
app.use(logger)*/

//Envoie d'une requete get à l'API rest et elle a renvoyée une reponse
//endpoint 'route',(req reçue par client, resultat renvoyé par la methode send de l'objet response)
app.get('/', (req,res)=>res.send('Hello, Express again !')) 

app.get('/api/pokemons/:id',(req,res) => {
   const id =  parseInt(req.params.id); //string puis int //ppté params permet de récuperer les paramètre de la requête
   const pokemon = pokemons.find(pokemon => pokemon.id === id);
   const message = 'Un pokemon a bien été trouvé';
    res.json(success(message,pokemon)) //.json() renvoie json et ajoute type mime
                                        // au lieu de res.json(helper.success(message,pokemon))
                                    
})

app.get('/api/pokemons',(req,res)=>{ 
    //const total = pokemons.length;
    const message = "Voici tous les pokemons";
    res.json(success(message,pokemons))

})

app.post('/api/pokemons', (req,res)=>{
    const id = getUniqueId(pokemons)
    //Pb le body est une string et non du JSON
    //Parser la cc reçue via HTTP en JSON pour l'API à l'aide du middleware body-parser
    const createdPokemon = {...req.body,...{id: id, create: new Date()}}
    pokemons.push(createdPokemon)
    const message = `Le pokemon ${createdPokemon.name}a bien été ajouté`;
    res.json(success(message,createdPokemon))
})
//Pour modifier, créer une copie du pokemon à modifier
//lui appliquer les modifs
//remplacer l'ancien par le nouveau

app.put('/api/pokemons/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const updatedPokemon = {...req.body, id:id};
    pokemons = pokemons.map(pokemon => {
       return pokemon.id === id ? updatedPokemon : pokemon
    })
    const message = `Le pokemon ${updatedPokemon.name} a bien été modifié`;
    res.json(success(message,updatedPokemon))

})

app.delete('/api/pokemons/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const deletedPokemon = pokemons.find(pokemon => pokemon.id === id);
    pokemons =  pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${deletedPokemon.name} a bien été supprimé`;
    res.json(success(message,deletedPokemon))
    
})