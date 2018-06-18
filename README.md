# Recover XRP account Mnemonic

This code can recover a 24-word mnemonic within a few hours, if:

- One word is **missing**

or...

- One word is **wrong**

Make sure you have [nodejs](https://nodejs.org/en/download/) installed, and clone this repo. Edit `index.js`, enter your mnemonic and wallet address at line 2 and 3 and run the code using `node index.js`.

The script will try all combinations and stop if a match is found.