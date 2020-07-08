# EOWL
Word-checking with the English Open Word List.

The English Open Word List can be downloaded from https://diginoodles.com/projects/eowl and placed in the `./words/` directory.

For my purpose, I needed a list of the most common English nine-letter words.

To use:
1. `npm install`
2. `node index.js` to read word list and create `nine.txt` populated with nine-letter words and their frequencies (commonness).
3. `node processNines.js` to make use of `nine.txt`, logging words with a frequency above a certain threshold.
