export default async function handler(req, res) {
  let response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.query.s}`
  );
  res.status(200).json(await response.json());
}
