export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${req.query.s}&includeNutrition=true`
    );
    const data = await response.json();
    // console.log(response)
    if (response.ok) {
      res.status(200).send(data);
    } else {
      res.status(response.code || response.status).send(response.message);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to parse response");
  }
}
