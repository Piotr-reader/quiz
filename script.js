'use strict';

const arrCorrectAnswers = [`Поздравляем! Начало положено, вы&nbsp;разгадали первое
из&nbsp;семи заданий.`, `Отлично! Два задания из&nbsp;семи уже позади.`, `Почти половина квеста уже пройдена! Три задания из&nbsp;семи
покорились вам.`, `Ого, вы&nbsp;ответили уже на&nbsp;четыре задания из&nbsp;семи!
Осталось всего ничего.`, `Пятое задание из&nbsp;семи тоже за&nbsp;вами, осталось всего два!`, `Супер, вы&nbsp;ответили на&nbsp;шесть заданий из&nbsp;семи! Даже
немного грустно, что осталось всего одно.`, `Семь из&nbsp;семи, наши поздравления! Теперь можете получить свой
бонус у&nbsp;администратора. <br>  Надеемся, что вам понравилось! Если квест, действительно, пришёлся вам по&nbsp;душе или есть
какие-то пожелания по&nbsp;нему, то&nbsp;будем признательны, если упомянете об&nbsp;этом
в&nbsp;своих социальных сетях, отметив при этом нас&mdash; нам будет о-о-очень приятно! В&nbsp;любом
случае, будем рады если подпишетесь на&nbsp;наши социальные сети, которые найдете внизу страницы
<span>&#129303</span>`];
const btnPopupReset = document.querySelector(".btn__popup_reset");
const btnCancel = document.querySelector(".btn_cancel");
const BODY = document.querySelector(".popup_body");
const POPUP_BODY = document.querySelector("body");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup_close");
const POPUP_TITLE = document.querySelector(".popup_title");
let arrNumber = [];
let arrAnswer = [];
let textGift = "";
const allInput = document.querySelectorAll(".form__field");
const allBtn = document.querySelectorAll(".form__button");
const checkedAnswer = document.querySelectorAll(".checked_answer");
const btnReset = document.querySelector(".btn_reset");
const totalQuestions = allInput.length;
const btnPopupGift = document.querySelector(".btn_gift");
document.querySelector(`.total_questions`).innerHTML = totalQuestions;
const addDataToGift = () => {
  let localstorageDate = localStorage.getItem("date");
  if (localstorageDate === null) {
  const date = new Date();
  const newdate = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
  localStorage.setItem("date", JSON.stringify(newdate));
  document.querySelector(".popup_data").style.display = "block";
  document.querySelector(".popup_data").innerHTML = newdate;
  }
}

allBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    allInput.forEach((input) => {
      if (btn.classList.contains(input.id)) {
        let numberPuzzle = input.id;
        let inputVal = input.value;
        if (btn.classList.contains("form__button_type_submit")) {
          if (inputVal.toLowerCase().trim() === input.dataset.answer) {
            const correctAnswerBoardText = document.querySelector(`.correct-answer-board__text.${numberPuzzle}`);
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
            correctAnswerReload(arrNumber)
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
const correctAnswerReload = (arrNumber) => {
  for (let i = 0; i < arrNumber.length; i++) {
    document.querySelector(`.correct-answer-board__text.${arrNumber[i]}`).innerHTML = arrCorrectAnswers[i];
    if (document.querySelector(".correct_answers").innerHTML === "7") {
      document.querySelector(".fireworks-canvas").style.display = "block";
      addDataToGift();
      dateFromLocalstorage();
      startCanvas();
      setTimeout(() => {
        POPUP.classList.add("open");
        POPUP_BODY.classList.add("lock");
        POPUP_TITLE.classList.add("active_title");

        document.querySelector(".popup_reset_btn").style.display = "none";
        document.querySelector(".popup_img").style.display = "block";
        document.querySelector(".popup_description").innerHTML = "Поздравляю, Вы настоящий знаток Шагала!";
      }, 5000);
    }
  }
};
let localstorageAnswers = localStorage.getItem("answers");
let localstoragenumberPuzzle = localStorage.getItem("numberPuzzle");
if (localstorageAnswers !== null) {
  let answers = JSON.parse(localstorageAnswers);
  let numberPuzzle = JSON.parse(localstoragenumberPuzzle);
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
  correctAnswerReload(arrNumber);
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
// onload src for iframe
const iFrameAll = document.querySelectorAll(".puzzle__video");
const imgVideoAll = document.querySelectorAll(".img_video");
const srcYouTube = "https://www.youtube.com/embed/";
const srcIFrameArr = ["mCVBrKfyzQY", "704nRRLQesE", "F9FqruAP_mU", "CisKFPrxAhE", "TGbBtAYzetw", "1oxZ4PkOoXQ", "yR534LAcWOI", "wNaeHHKW3RE"];
[...imgVideoAll].forEach((img, index) => {
  img.addEventListener('click', (e) => {
    let src = e.target.nextElementSibling;
    e.target.style.display = "none";
    iFrameAll[index].style.display = "block"
    src.setAttribute("src", `${srcYouTube}${srcIFrameArr[index]}`);
  })

})

// popup reset score
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
// popup gift
btnPopupGift.addEventListener("mousedown", (e) => {
  popupGiftOpen();
});
POPUP_CLOSE.addEventListener("mousedown", () => {
  popupGiftClose();
});
if (POPUP.hasAttributes("popup_open")) {
  BODY.addEventListener("mousedown", (e) => {
    if (e.target.classList.value === "popup_body") {
      popupGiftClose();
    }
  });
}
function popupGiftOpen() {
  POPUP.classList.add("open");
  POPUP_BODY.classList.add("lock");
  POPUP_TITLE.classList.add("active_title");
  document.querySelector(".popup_reset_btn").style.display = "none";
  valueScore();
  document.querySelector(".popup_description").innerHTML = textGift;
};
const popupGiftClose = () => {
  POPUP.classList.remove("open");
  POPUP_BODY.classList.remove("lock");
  POPUP_TITLE.classList.remove("active_title");
  document.querySelector(".popup_reset_btn").style.display = "flex";
  document.querySelector(".popup_img").style.display = "none";
  document.querySelector(".popup_data").style.display = "none";
  document.querySelector(".popup_description").innerHTML = "Вы уверены что хотите сбросить результат?";
  document.querySelector(".fireworks-canvas").style.display = "none";
};
const valueScore = () => {
  switch (document.querySelector(".correct_answers").innerHTML) {
    case "0":
      textGift = "Вы серъёзно? Ответьте хотябы на несколько вопросов.";
      break;
    case "1":
      textGift = "Уже что-то! Но этого все равно слишком мало.";
      break;
    case "2":
      textGift = "Да вы прям знаток искусства! Не стоит останавливаться.";
      break;
    case "3":
      textGift = "Вот это запал! Ещё немного и Вы у цели.";
      break;
    case "4":
      textGift = "Круто!!! Оствалось разгадать всего три вопроса.";
      break;
    case "5":
      textGift = "Этого не может быть. Супер эрудиция!";
      break;
    case "6":
      textGift = "Завидую вашим знаниям. Вы в одном шаге до приза";
      break;
    case "7":
      dateFromLocalstorage();
      document.querySelector(".popup_img").style.display = "block";
      textGift = "Поздравляю, Вы настоящий знаток Шагала!";
      break;
    default:
      break;
  }
};
function dateFromLocalstorage() {
  let localstorageDate = localStorage.getItem("date");
  if (localstorageDate !== null) {
    let date = JSON.parse(localstorageDate);
    document.querySelector(".popup_data").style.display = "block";
    document.querySelector(".popup_data").innerHTML = date;
  }
}

function startCanvas() {
  var firework = JS_FIREWORKS.Fireworks({
    id : 'fireworks-canvas',
    hue : 120,
    particleCount : 50,
    delay : 0,
    minDelay : 20,
    maxDelay : 40,
    boundaries : {
        top: 50,
        bottom: 240,
        left: 50,
        right: 590
    },
    fireworkSpeed : 2,
    fireworkAcceleration : 1.05,
    particleFriction : .95,
    particleGravity : 1.5
});
firework.start();
}