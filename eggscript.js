const inputValue = document.querySelector("input");
const egg = document.querySelector(".egg");
const eggColor = document.querySelector(".egg-color");
const openEggColor = document.querySelector(".open-egg-color");
const list = document.querySelector("ol");
const listBtn = document.querySelector(".listBtn");
let lotteryList = [];

function listRender() {
  list.innerHTML = lotteryList.map((ele) => `<li>${ele}</li>`).join("");
}

listBtn.addEventListener("click", function () {
  document.querySelector(".list-wrap").classList.toggle("active");
});

inputValue.addEventListener("keyup", function (e) {
  if (e.key === "Enter" && inputValue.value.trim() !== "") {
    console.log(inputValue.value);
    const lottery = inputValue.value.trim().split(" ");
    lotteryList = lotteryList.concat(lottery);
    inputValue.value = "";
    listRender();
  }
});

const colors = ["#E5A0B9", "#F3D478", "#9DCFE0", "#B9AED4"];
const messages = ["Your'e the best", "Keep It up", "You can do it!"];
let currentColor = "#E5A0B9";

egg.addEventListener("click", function () {
  const luckyNum = Math.floor(Math.random() * lotteryList.length);
  const winner = lotteryList[luckyNum];
  const message = messages[Math.floor(Math.random() * messages.length)];
  document.querySelector(".winner").innerHTML =
    lotteryList.length >= 1 ? `<span>${winner} - ${message}</span>` : "!! Insert your name in the sidebar icon and Press Enter To get the egg (๑•́ ₃ •̀๑)";
  lotteryList.splice(luckyNum, 1);
  listRender();
});

document.querySelector(".switch").addEventListener("click", function () {
  currentColor = colors[Math.floor(Math.random() * colors.length)];
  eggColor.style.fill = currentColor;
  openEggColor.style.fill = currentColor;
  this.classList.toggle("active");
  setTimeout(() => this.classList.remove("active"), 700);
  egg.classList.toggle("active");
});

egg.addEventListener("click", function () {
  this.classList.remove("active");
  document.querySelector(".mask").classList.toggle("active");
});

document.querySelector(".mask").addEventListener("click", function () {
  this.classList.toggle("active");
});
