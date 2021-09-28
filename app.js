const randWord = dictionary[Math.floor(Math.random() * dictionary.length)];
const scramWord = shuffleDurenstenfield(randWord);
alert(`Available letters: ${scramWord}`);

/*
In crafting my shuffling algorithm, I consulted https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method. 
Based on the steps outlined in the article, I coded my own implementation of a Durstenfield shuffling algorithm (0(N)). 
*/
function shuffleDurenstenfield(word) {
  let origWord = populateArray(word);
  let shuffleWord = shuffle(origWord);

  return stringify(shuffleWord);

  function populateArray(word) {
    let origWord = [];
    for (let i = word.length + 1; i >= 0; i--) {
      origWord.unshift(word.substring(i, i - 1));
    }
    origWord.shift();
    origWord.pop();
    return origWord;
  }

  function shuffle(word) {
    let shuffleWord = [];
    for (let i = origWord.length - 1; i > 0; i--) {
      let k = getRandIntInc(1, i);
      let letter = origWord.splice(k, 1);
      shuffleWord.push(letter);
    }
    shuffleWord.push(origWord[0]);
    return shuffleWord;
  }

  function stringify(array) {
    str = "";
    for (let val of array) {
      str = str.concat(val);
    }
    return str;
  }
}

console.log(
  `Original word: ${randWord} Shuffled word: ${shuffleDurenstenfield(randWord)}`
);

function getRandIntInc(min, max) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (max - min + 1) + min);
}
