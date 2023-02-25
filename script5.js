const order = {};
const delay = 1400;
const block = document.querySelector(".do-I-exist");
const questions = `
"I am a creature both wild and tame,
I hide in the shadows, and play in the game.
I have sharp claws, and eyes that see,
But when I purr, I'm as sweet as can be.
What am I?
"I am always hungry, I must always be fed. The finger I touch, will soon turn red. What am I?
I am a tale in children's minds, I have no pictures, only lines. I have no pages, yet I'm read, I'm often spoken, never said. What am I?
I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?
I am always there, yet you cannot see me. I come in all shapes and sizes, but I am often overlooked. 
I am your silent partner, always behind you, and I will never leave your side. What am I?
 am full of words, but I cannot speak. I have a spine and a cover, but no bones. People open me up to learn and explore, but I never leave my place. 
 What am I?`.split("?");

questions.forEach(why => {
  const context = document.createElement("span");
  context.innerText = " " + why.replace("\n", "") + "? ";
  block.appendChild(context);
});

const visible_questions = [...block.querySelectorAll("span")].filter(e => {
  const bottom = e.getBoundingClientRect().bottom;
  const height = window.innerHeight;
  return bottom < height;
});

visible_questions.forEach((e, index) => {
  order[index] = {};
  order[index].element = e;
  order[index].yet = false;
});

const choose = () => {
  const is_false = Object.keys(order)
    .map(e => order[e].yet)
    .some(v => v == false);
  const random = Math.floor(Math.random() * visible_questions.length);
  if (!is_false) {
    console.log("fisihsdq");
    return;
  }
  if (order[random].yet) {
    console.log("looking for random 🤫");
    choose();
  } else {
    order[random].yet = true;
    order[random].element.style.opacity = "1";
    order[random].element.style.color = "#333";
    setTimeout(() => {
      order[random].element.style.color = "#ccc";
      choose();
    }, delay);
  }
};

choose();