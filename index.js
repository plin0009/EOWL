const fs = require("fs");
const fetch = require("node-fetch");

const a = 65;
const z = 90;

//const dict = {};
const nineLetters = {};

const readFileAsync = (letter) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./words/${letter} Words.txt`, "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};
const appendFileAsync = (stream, chunk) => {
  return new Promise((resolve, reject) => {
    stream.write(chunk, "utf-8", (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

const getFrequency = async (word) => {
  const res = await fetch(
    new URL(`https://api.datamuse.com/words?sp=${word}&md=f&max=1`)
  );
  const data = await res.json();
  try {
    const listing = data[0];
    const retrievedWord = listing.word;
    if (word !== retrievedWord) {
      return -1;
    }
    const frequencyTag = listing.tags[0];
    const frequency = +frequencyTag.substring(2);
    return frequency;
  } catch (e) {
    return -2;
  }
};

const continueFrom = null;

(async () => {
  let resumed = continueFrom === null;
  const stream = fs.createWriteStream("nine.txt", { flags: "a" });
  for (let i = a; i <= z; i++) {
    const letter = String.fromCharCode(i);
    const data = await readFileAsync(letter);

    const words = data.split(`\n`);
    for (const word of words) {
      if (word.length !== 9) {
        continue;
      }
      if (!resumed && word === continueFrom) {
        resumed = true;
      }
      if (resumed) {
        const frequency = await getFrequency(word);
        nineLetters[word] = frequency;
        console.log(`${word}: ${frequency}`);
        await appendFileAsync(stream, `${word}: ${frequency}\n`);
      }
    }
  }
})();
