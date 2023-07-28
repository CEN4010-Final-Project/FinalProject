export default async function handler(req, res) {
  let response = await fetch(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${req.query.s}&includeNutrition=false`
  );
  res.status(200).json(await response.json());
}
