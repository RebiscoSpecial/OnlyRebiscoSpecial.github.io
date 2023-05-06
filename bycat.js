const febHolidays = [
  "You are the sunshine in my life.",
  "I can't imagine my life without you.",
  "Your smile makes my heart melt.",
  "Your love is the sweetest thing in the world.",
  "You make every moment worth living.",
  "I cherish every moment spent with you.",
  "You are the best thing that ever happened to me.",
  "I feel so lucky to have you in my life.",
  "You make me a better person.",
  "I love the way you make me feel.",
  "Your love is my safe haven.",
  "I can't get enough of your love",
  "You are my forever love",
  "You complete me.",
  "I can't wait to spend the rest of my life with you.",
  "Your love is the anchor that keeps me grounded.",
  "You bring so much happiness into my life. ",
  "You are my soulmate.",
  "You are the missing puzzle piece in my life.",
  "I can't imagine a future without you.",
  "You are the most beautiful person inside and out.",
  "Your love is my greatest treasure.",
  "I am so grateful for your love",
  "You make my heart skip a beat.",
  "Your love is the foundation of our relationship.",
  "You make everything in life worth it.",
  "I fall in love with you more every day.",
  "Your love fills my life with so much joy.",
  "You are the love of my life, now and forever."
];
const ulEl = document.querySelector("ul");
const d = new Date();
let daynumber = d.getMonth() == 1 ? d.getDate() - 1 : 0;
let activeIndex = daynumber;
const rotate = -360 / febHolidays.length;
init();
function init() {
  febHolidays.forEach((holiday, idx) => {
    const liEl = document.createElement("li");
    liEl.style.setProperty("--day_idx", idx);
    liEl.innerHTML = `<time datetime="2022-02-${idx + 1}">${
      idx + 1
    }</time><span>${holiday}</span>`;
    ulEl.append(liEl);
  });
  ulEl.style.setProperty("--rotateDegrees", rotate);
  adjustDay(0);
}
function adjustDay(nr) {
  daynumber += nr;
  ulEl.style.setProperty("--currentDay", daynumber);
  const activeEl = document.querySelector("li.active");
  if (activeEl) activeEl.classList.remove("active");
  activeIndex = (activeIndex + nr + febHolidays.length) % febHolidays.length;
  const newActiveEl = document.querySelector(
    `li:nth-child(${activeIndex + 1})`
  );
  document.body.style.backgroundColor = window.getComputedStyle(
    newActiveEl
  ).backgroundColor;
  newActiveEl.classList.add("active");
}
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      adjustDay(-1);
      break;
    case "ArrowDown":
      adjustDay(1);
      break;
    default:
      return;
  }
});