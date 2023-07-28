export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.query.s}`
    );
    const data = await response.json();
    if (response.ok) {
      res.status(200).send(data)
    } else {
      res.status(data.code).send(data.message);
    }
  } catch (err) {
    res.status(500).send('Failed to parse response')
  }
}
