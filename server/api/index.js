const router = require('express').Router();
const jsonData = require('../../data.json')

const foundRecipe = (name) => jsonData.recipes.find(recipe => recipe.name === name)

// GET /recipes

router.get('/', function(req,res,next){
  try {
    const recipeNames = [];
    jsonData.recipes.forEach(recipe => recipeNames.push(recipe.name))
    res.send(recipeNames).status(200)
  } catch (error) {
    next(error)
    console.log("Error in the get /recipes route", error)

  }
})

// GET recipes/details/: recipeName

router.get('/details/:recipeName', function(req,res,next){
  try {
   const {recipeName} = req.params
   const found = foundRecipe(recipeName)
   if(found){
   const details = {ingredients:found.ingredients, instructions:found.instructions}
    res.send(details).status(200);
   }else{
     res.send({}).status(200)
   }
  } catch (error) {
    next(error)
    console.log('Error in the get/recipe/details/recipeName router', error)
  }
})

// POST to /recipes

router.post('/', function(req,res,next){
  try {
    const {name, ingredients, instructions} = req.body
    const newRecipe = {name,ingredients,instructions}
    const found = foundRecipe(name)
    if(!found){
      jsonData.recipes.push(newRecipe);
      res.status(201);
    }else{
      res.send("Recipe already exists").status(400);
    }
  } catch (error) {
    next(error)
    console.log("Error in the recipe post route",error)
  }
})


// PUT to '/recipes'

router.put('/', function(req,res,next){
  try {
    const {name, ingredients, instructions} = req.body
    const found = foundRecipe(name);
    if(found){
      found.name = name
      found.ingredients = ingredients;
      found.instructions = instructions;
      console.log('the new found', found)
      res.status(204)
    }else{
      res.send("Recipe does not exist").status(404);
    }

  } catch (error) {
    next(Error)
    console.log("Error in the put recipes route", error)
  }
})



// Error handling if client requests nonexisting route
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;