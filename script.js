const btnPopupReset = document.querySelector(".btn__popup_reset");
const btnCancel = document.querySelector(".btn_cancel");
const BODY = document.querySelector(".popup_body");
const POPUP_BODY = document.querySelector("body");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup_close");
const POPUP_TITLE = document.querySelector(".popup_title");

let arrNumber = [];
let arrAnswer = [];
const allInput = document.querySelectorAll(".form__field");
const allBtn = document.querySelectorAll(".form__button");
const checkedAnswer = document.querySelectorAll(".checked_answer");
const btnReset = document.querySelector(".btn_reset");
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
            document.querySelector(`.checked_answer.${numberPuzzle}`).style.display = "block";
            document.querySelector(`.wrong-answer-board.${numberPuzzle}`).style.display = "none";
            document.querySelector(`.hint-board.${numberPuzzle}`).style.display = "none";
            // btn.setAttribute("disabled", "disabled");
            arrNumber.push(numberPuzzle);
            arrNumber = [...new Set(arrNumber)];
            localStorage.setItem("numberPuzzle", JSON.stringify(arrNumber));
            arrAnswer.push(inputVal);
            arrAnswer = [...new Set(arrAnswer)];
            localStorage.setItem("answers", JSON.stringify(arrAnswer));
            let correctAnswers = arrAnswer.length;
            document.querySelector(`.correct_answers`).innerHTML = correctAnswers;
            document.querySelector(`.quolity`).innerHTML = Math.floor((correctAnswers / totalQuestions) * 100);
          } else {
            document.querySelector(`.wrong-answer-board.${numberPuzzle}`).style.display = "block";
            document.querySelector(`.correct-answer-board.${numberPuzzle}`).style.display = "none";
            document.querySelector(`.hint-board.${numberPuzzle}`).style.display = "none";
            document.querySelector(`.checked_answer.${numberPuzzle}`).style.display = "none";
          }
        } else if (btn.classList.contains("form__button_type_hint")) {
          document.querySelector(`.hint-board.${numberPuzzle}`).style.display = "block";
          document.querySelector(`.wrong-answer-board.${numberPuzzle}`).style.display = "none";
          document.querySelector(`.correct-answer-board.${numberPuzzle}`).style.display = "none";
          document.querySelector(`.checked_answer.${numberPuzzle}`).style.display = "none";
        }
      }
    });
  });
});

let localstorageAnswers = localStorage.getItem("answers");
let localstoragenumberPuzzle = localStorage.getItem("numberPuzzle");
if (localstorageAnswers !== null) {
  answers = JSON.parse(localstorageAnswers);
  numberPuzzle = JSON.parse(localstoragenumberPuzzle);
  for (let i = 0; i < answers.length; i++) {
    document.getElementById(`${numberPuzzle[i]}`).value = answers[i];
    document.querySelector(`.correct-answer-board.${numberPuzzle[i]}`).style.display = "block";
    document.querySelector(`.checked_answer.${numberPuzzle[i]}`).style.display = "block";
    arrNumber.push(numberPuzzle[i]);
    arrNumber = [...new Set(arrNumber)];
    arrAnswer.push(answers[i]);
    arrAnswer = [...new Set(arrAnswer)];
  }
  let correctAnswers = arrAnswer.length;
  document.querySelector(`.correct_answers`).innerHTML = correctAnswers;
  document.querySelector(`.quolity`).innerHTML = Math.floor((correctAnswers / totalQuestions) * 100);
}

btnReset.addEventListener("click", () => {
  arrNumber = [];
  arrAnswer = [];
  localStorage.clear();
  allInput.forEach((input) => {
    input.value = "";
    document.querySelector(`.correct-answer-board.${input.id}`).style.display = "none";
    document.querySelector(`.checked_answer.${input.id}`).style.display = "none";
    document.querySelector(`.correct_answers`).innerHTML = 0;
    document.querySelector(`.quolity`).innerHTML = 0;
  });
  POPUP.classList.remove("open");
  POPUP_BODY.classList.remove("lock");
  POPUP_TITLE.classList.remove("active_title");
});

// burger
const burger = document.querySelector(".header_burger");
const navbar = document.querySelector(".navbar");
const body = document.querySelector("body");
const navbarText = document.querySelectorAll(".navbar_text");

burger.addEventListener("mousedown", () => {
  navbar.classList.toggle("active_burger");
  burger.classList.toggle("active_burger_burger");
  body.classList.toggle("lock");
});
navbarText.forEach((text) => {
  text.addEventListener("click", () => {
    body.classList.remove("lock");
    navbar.classList.remove("active_burger");
    burger.classList.remove("active_burger_burger");
  });
});
if (navbar.hasAttributes("active_burger")) {
  navbar.addEventListener("mousedown", (e) => {
    if (!e.target.closest(".navbar_width")) {
      navbar.classList.remove("active_burger");
      burger.classList.remove("active_burger_burger");
      body.classList.remove("lock");
    }
  });
}

// popup
btnPopupReset.addEventListener("mousedown", (e) => {
  POPUP.classList.add("open");
  POPUP_BODY.classList.add("lock");
  POPUP_TITLE.classList.add("active_title");
});
btnCancel.addEventListener("mousedown", () => {
  POPUP.classList.remove("open");
  POPUP_BODY.classList.remove("lock");
  POPUP_TITLE.classList.remove("active_title");
});
POPUP_CLOSE.addEventListener("mousedown", () => {
  POPUP.classList.remove("open");
  POPUP_BODY.classList.remove("lock");
  POPUP_TITLE.classList.remove("active_title");
});
if (POPUP.hasAttributes("popup_open")) {
  BODY.addEventListener("mousedown", (e) => {
    if (e.target.classList.value === "popup_body") {
      POPUP.classList.remove("open");
      POPUP_BODY.classList.remove("lock");
      POPUP_TITLE.classList.remove("active_title");
    }
  });
}
