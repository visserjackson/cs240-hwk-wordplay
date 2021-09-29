const randWord = dictionary[Math.floor(Math.random() * dictionary.length)];
const scramWord = shuffleDurenstenfield(randWord);
alert(`Available letters: ${scramWord}`);

/*
shuffle algorithm modeled based on https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method. 
however, i wrote all the code for this implementation from scratch(0(N)). 
*/
function shuffleDurenstenfield(word) {
  let origWord = populateArray(word);
  let shuffleWord = shuffle(origWord);

  return shuffleWord.join("");

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

  //   function stringify(array) {
  //     str = "";
  //     for (let letter of array) {
  //       str = str.concat(letter);
  //     }
  //     return str;
  //   }
}

console.log(
  `Original word: ${randWord} Shuffled word: ${shuffleDurenstenfield(randWord)}`
);

function getRandIntInc(min, max) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function removeImpossibleWords(dictionary, targetWord) {
  let dict = splitArray(dictionary);
  let dict1 = dict[0];
  let dict2 = dict[1];
  for (let i = 0; i < dict1.length; i++) {
    if (dict1[i].length < targetWord.length) {
      dict1.splice(dict1[i], 1);
    }
  }

  for (let i = 0; i < dict2.length; i++) {
    if (dict2[i].length < targetWord.length) {
      dict2.splice(dict2[i], 1);
    }
  }

  return dict1.concat(dict2);

  //   function hasDiffLetter(targetWord, word) {
  //     let arr = populateArray(targetWord);
  //     for (let letter of arr) {
  //       if (!word.includes(letter)) {
  //         return true;
  //       }
  //     }
  //     return false;
}

function populateArray(word) {
  let origWord = [];
  for (let i = word.length + 1; i >= 0; i--) {
    origWord.unshift(word.substring(i, i - 1));
  }
  origWord.shift();
  origWord.pop();
  return origWord;
}

function splitArray(arr) {
  let splitPoint = Math.floor(arr.length / 2);
  arr1 = arr.slice(0, splitPoint);
  arr2 = arr.slice(splitPoint, arr.length - 1);

  return [arr1, arr2];
}
