export default async function handler(req, res) {
  try {
    let URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.query.s}&addRecipeNutrition=true&instructionsrequired=true`
    if (req.query.cuisines)
      URL += "&cuisine=" + req.query.cuisines
    if (req.query.diet)
      URL += "&diet=" + req.query.diet
    if (req.query.intolerances)
      URL += "&intolerances=" + req.query.intolerances
    if (req.query.type)
      URL += "&type=" + req.query.type
      if (req.query.ingredients)
      URL += "&includeIngredients=" + req.query.ingredients
    console.log(URL)
    const response = await fetch(URL);
    const data = await response.json();
    if (response.ok) {
      res.status(200).send(data.results);
    } else {
      res.status(data.code || response.status).send(data.message);
    }
  } catch (err) {
    res.status(500).send("Failed to parse response");
  }
}
