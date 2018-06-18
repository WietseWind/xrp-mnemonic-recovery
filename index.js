const requiredWords = 24
const erroneousMnemonic = 'tornado child advance ... enter your mnemonic over here (23 or 24 words)'
const expectedAccount = 'rXXXXXX ... enter your wallet address here'

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripple-keypairs')
const fs = require('fs')
const words = fs.readFileSync('words.txt').toString('utf-8').trim().split(`\n`).slice(0, 10)

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

const m2a = (mnemonic) => {
  const seed = bip39.mnemonicToSeed(mnemonic.trim().toLowerCase()) // add second argument for 25th word encrypted
  const m = bip32.fromSeedBuffer(seed)
  const keyPair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs()
  const address = ripple.deriveAddress(keyPair.publicKey)
  return address
}

let mmsplit = erroneousMnemonic.toLowerCase().trim().split(' ')
let mmcount = mmsplit.length
let loopLength = Math.min(requiredWords, mmcount + 1)

for (let i = 0; i < loopLength; i++) {
  let b = mmsplit.slice(0, i)
  let a = mmsplit.slice(mmcount < requiredWords ? i : i + 1)
  words.forEach((word, j) => {
    let o = (b.join(' ') + ' ' + word + ' ' + a.join(' ')).trim()
    let m = m2a(o)
    if (m === expectedAccount) {
      console.log('')
      console.log('MATCH! RECOVERED :D')
      console.log(m)
      console.log(o)
      console.log('')
      process.exit(0)
    } else {
      console.log(i + '.' + j + ' ' + m + ' @ ' + o)
    }
  })
}

console.log('')
console.log('')
console.log('No results :(')
console.log('')
console.log('')

process.exit(1)