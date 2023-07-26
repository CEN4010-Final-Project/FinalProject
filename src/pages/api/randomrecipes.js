export default async function handler(req, res) {
  let response = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=6`
  );
  res.status(200).json(await response.json());
}
