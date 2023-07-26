export default async function handler(req, res) {
  console.log(req.query.s)
  let response = await fetch(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${req.query.s}&includeNutrition=false`
  );
  res.status(200).json(await response.json());
}
