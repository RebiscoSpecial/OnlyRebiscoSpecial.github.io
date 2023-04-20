document.getElementById("getFact").addEventListener("click", cat);

function cat() {
  fetch("https://catfact.ninja/fact")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("fact").innerHTML = data.fact;
    });
}