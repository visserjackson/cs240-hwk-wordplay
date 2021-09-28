const randWord = dictionary[Math.floor(Math.random() * dictionary.length)];
alert(`The random word is: ${randWord}`);

function shuffleDurenstenfield(word) {
  let origWord = populateArray(word);

  let shuffleWord = [];
  for (let i = origWord.length - 1; i > 0; i--) {
    let k = getRandIntInc(1, i);
    let letter = origWord.splice(k, 1);
    shuffleWord.push(letter);
  }
  shuffleWord.push(origWord[0]);
  return shuffleWord;

  function populateArray(word) {
    let origWord = [];
    for (let i = word.length + 1; i >= 0; i--) {
      origWord.unshift(word.substring(i, i - 1));
    }
    origWord.shift();
    origWord.pop();
    return origWord;
  }
  return populateArray(word);
}

console.log(
  `Original word: ${randWord} Shuffled word: ${shuffleDurenstenfield(randWord)}`
);

function getRandIntInc(min, max) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (max - min + 1) + min);
}
