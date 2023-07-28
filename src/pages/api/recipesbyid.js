export default async function handler(req, res) {
  let response = await fetch(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${req.query.s}&includeNutrition=false`
  );
  response = await response.json();
  if (response.ok) { // success
    res.status(response.code).send(response.data);
  } else { // failure
    res.status(response.code).send(response.message);
  }
}
