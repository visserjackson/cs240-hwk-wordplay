const rootWordBank = generateRootWordBank(dictionary); //bank of possible root words
const rootWord = rootWordBank[Math.floor(Math.random() * rootWordBank.length)];
let scramWord = shuffleDurenstenfield(rootWord);
let scramWordSpaced = spaceWord(scramWord);
let wordBank = generateWordBank(dictionary, rootWord); //initial array of possible words
let gameDictionary = generateGameDictionary(wordBank); //final array of possible words
const correctToWin = gameDictionary.length;
let hiddenDictionary = generateHiddenDictionary(gameDictionary); //array of words that start as blank and then are filled in as user guesses
let correctCounter = 0;
let gameOver = false;
while (!gameOver) {
  playRound();
}

/*
shuffle algorithm modeled based on https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method. 
however, i wrote all the code for this implementation from scratch. 
*/
function shuffleDurenstenfield(word) {
  let origWord = populateArray(word);
  let shuffleWord = shuffle(origWord);

  return shuffleWord.join("");

  function shuffle(word) {
    let shuffleWord = [];
    for (let i = word.length - 1; i > 0; i--) {
      let k = getRandIntInc(1, i);
      let letter = word.splice(k, 1);
      shuffleWord.push(letter);
    }
    shuffleWord.push(word[0]);
    return shuffleWord;
  }
}

function getRandIntInc(min, max) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function removeImpossibleWords(dictionary) {
  let dict = [];
  for (let word of dictionary) {
    if (!hasDiffLetter(rootWord, word) && isCorrectLength(word)) {
      dict.push(word);
    }
  }

  function hasDiffLetter(rootWord, testWord) {
    let arr = populateArray(testWord);
    for (let letter of arr) {
      if (!rootWord.includes(letter)) {
        return true;
      }
    }
    return false;
  }

  return dict;
}

function isCorrectLength(word) {
  if (word == null) {
    return "null";
  }
  if (word.length >= 3 && word.length < 6) {
    return true;
  } else {
    return false;
  }
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

function generateRootWordBank(dictionary) {
  let dict = [];
  for (let word of dictionary) {
    if (word.length == 6) {
      dict.push(word);
    }
  }
  return dict;
}

function generatePossibleWords(dictionary, combinations) {
  let possibleWords = [];
  for (let element of combinations) {
    if (dictionary.includes(element)) {
      possibleWords.push(element);
    }
  }
  return possibleWords;
}

function checkPermutations(testWord, targetWord) {
  let target = populateArray(targetWord);
  let test = populateArray(testWord);

  for (let t of test) {
    if (target.includes(t)) {
      target.splice(target.indexOf(t), 1);
    } else {
      return false;
    }
  }
  return true;
}

function generateWordBank(dictionary, rootWord) {
  let wordBank = [];
  for (word of dictionary) {
    if (checkPermutations(word, rootWord)) {
      wordBank.push(word);
    }
  }
  wordBank.push(rootWord);
  return wordBank;
}

function spaceWord(word) {
  let str = "";
  for (let i = 0; i < word.length; i++) {
    str = str.concat(word.charAt(i), " ");
  }
  return str;
}

function hideWord(word) {
  str = "";
  for (let i = 0; i < word.length; i++) {
    str = str.concat("_", " ");
  }
  return str;
}

function generateGameDictionary(dictionary) {
  let dict = removeImpossibleWords(dictionary);
  dict = generateWordBank(dict, rootWord);
  return dict;
}

function playRound() {
  //console.log(gameDictionary);
  console.clear();
  displayGameBoard();
  let guess = prompt("Enter a guess (or * to shuffle the letters):", "");
  if (guess == null) {
    gameOver = true;
    alert(`Game over! You got ${correctCounter} out of ${correctToWin} words.`);
    console.clear();
    displayEndingBoard();
    function displayEndingBoard() {
      str = "";
      for (let word of gameDictionary) {
        str = str.concat(word, "\n");
      }
      console.log(str);
    }
  } else {
    if (gameDictionary.includes(guess) && !hiddenDictionary.includes(guess)) {
      alert("Correct!");
      let guessIndex = gameDictionary.indexOf(guess);
      hiddenDictionary.splice(guessIndex, 1, gameDictionary[guessIndex]);
      correctCounter++;
    } else if (guess == "*") {
      scramWord = shuffleDurenstenfield(rootWord);
      scramWordSpaced = spaceWord(scramWord);
      alert("Shuffled! Good luck.");
    } else if (!dictionary.includes(guess) || !isCorrectLength(guess)) {
      {
        alert(`${guess} is not a valid word.`);
      }
    } else if (hiddenDictionary.includes(guess)) {
      alert(`${guess} has already been found.`);
    }
    if (correctCounter == correctToWin) {
      gameOver = true;
      displayEndingBoard();
      alert(`Congratulations, you win! You got all ${correctToWin} words.`);
    }
  }
}

function generateHiddenDictionary(dictionary) {
  let hidden = [];
  for (let word of dictionary) {
    hidden.push(hideWord(word));
  }
  return hidden;
}

function displayGameBoard() {
  str = "";
  str = str.concat(`Letters: ${scramWordSpaced}`, "\n");

  for (let word of hiddenDictionary) {
    str = str.concat(word, "\n");
  }
  console.log(str);
}
