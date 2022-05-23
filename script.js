let arrNumber = [];
let arrAnswer = [];
const allInput = document.querySelectorAll(".form__field");
const allBtn = document.querySelectorAll(".form__button");
const totalQuestions = allInput.length;
document.querySelector(`.total_questions`).innerHTML = totalQuestions;

allBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    allInput.forEach((input) => {
      if (btn.classList.contains(input.id)) {
        let numberPuzzle = input.id;
        let inputVal = input.value;
        if (btn.classList.contains("form__button_type_submit")) {
          if (inputVal.toLowerCase() === input.dataset.answer) {
            document.querySelector(`.correct-answer-board.${numberPuzzle}`).style.display = "block";
            document.querySelector(`.wrong-answer-board.${numberPuzzle}`).style.display = "none";
            document.querySelector(`.hint-board.${numberPuzzle}`).style.display = "none";
            // btn.setAttribute("disabled", "disabled");
            arrNumber.push(numberPuzzle);
            arrNumber = [...new Set(arrNumber)];
            localStorage.setItem('numberPuzzle', JSON.stringify(arrNumber));
            arrAnswer.push(inputVal);
            console.log(arrAnswer);
            arrAnswer = [...new Set(arrAnswer)];
            localStorage.setItem('answers', JSON.stringify(arrAnswer));
            let correctAnswers = arrAnswer.length;
            document.querySelector(`.correct_answers`).innerHTML = correctAnswers;
            document.querySelector(`.quolity`).innerHTML = Math.floor((correctAnswers/totalQuestions)*100);
          } else {
            document.querySelector(`.wrong-answer-board.${numberPuzzle}`).style.display = "block";
            document.querySelector(`.correct-answer-board.${numberPuzzle}`).style.display = "none";
            document.querySelector(`.hint-board.${numberPuzzle}`).style.display = "none";
          }
        } else if (btn.classList.contains("form__button_type_hint")) {
          document.querySelector(`.hint-board.${numberPuzzle}`).style.display = "block";
          document.querySelector(`.wrong-answer-board.${numberPuzzle}`).style.display = "none";
          document.querySelector(`.correct-answer-board.${numberPuzzle}`).style.display = "none";
        }
      }
    });
  });
});

let localstorageAnswers = localStorage.getItem('answers');
let localstoragenumberPuzzle = localStorage.getItem('numberPuzzle');
if (localstorageAnswers !== null) {
  answers = JSON.parse(localstorageAnswers);
  numberPuzzle = JSON.parse(localstoragenumberPuzzle);
    for (let i = 0; i < answers.length; i++) {
      document.getElementById(`${numberPuzzle[i]}`).value = answers[i];
      document.querySelector(`.correct-answer-board.${numberPuzzle[i]}`).style.display = "block";
      arrNumber.push(numberPuzzle[i]);
      arrNumber = [...new Set(arrNumber)];
      arrAnswer.push(answers[i]);
      arrAnswer = [...new Set(arrAnswer)];
    }
    let correctAnswers = arrAnswer.length;
    document.querySelector(`.correct_answers`).innerHTML = correctAnswers;
    document.querySelector(`.quolity`).innerHTML = Math.floor((correctAnswers/totalQuestions)*100);
  }


