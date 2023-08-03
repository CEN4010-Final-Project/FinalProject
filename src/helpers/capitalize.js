export const capitalize = (words) => {
  let wordArray = words.split(" ");
  wordArray = wordArray.map(word => word[0].toUpperCase() + word.substr(1));
  return wordArray.join(" ");
}