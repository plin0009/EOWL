const fs = require("fs");

const words = {};
const ordered = [];
const threshold = 0.8;

fs.readFile("nine.txt", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const pairs = data.split("\n");
  pairs.forEach((pair) => {
    const [word, b] = pair.split(": ");
    const frequency = +b;
    words[word] = frequency;
    ordered.push(word);
  });

  ordered.sort((a, b) => words[b] - words[a]);
  console.log(ordered);

  let i = 0;
  let finalWords = [];
  while (true) {
    finalWords.push(ordered[i]);
    if (words[ordered[i]] < threshold) {
      break;
    }
    i++;
  }
  console.log(finalWords.join(" "));
  console.log(i);
});
