export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${req.query.s}&includeNutrition=false`
    );
    const data = await response.json();
    if (response.ok) {
      res.status(200).send(data);
    } else {
      res.status(response.code).send(response.message);
    }

  } catch (err) {
    res.status(500).send('Failed to parse response')
  }
}
