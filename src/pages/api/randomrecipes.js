export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=6`
    );
    const data = await response.json();
    if (response.ok) {
      res.status(200).send(data.recipes);
    } else {
      res.status(response.code || response.status).send(response.message);
    }
  } catch (err) {
    res.status(500).send("Failed to parse response.")
  }
}
