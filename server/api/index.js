const router = require('express').Router();
const jsonData = require('../../data.json')

console.log(jsonData)

// GET /recipes

router.get('/', function(req,res,next){
  try {
    const recipeNames = [];
    jsonData.recipes.forEach(recipe => recipeNames.push(recipe.name))
    console.log('recipeNames', recipeNames)
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
   const found = jsonData.recipes.find(recipe => recipe.name === recipeName)
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


// Error handling if client requests nonexisting route
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;