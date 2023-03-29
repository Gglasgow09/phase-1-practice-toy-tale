let addToy = false;
let baseUrl = 'http://localhost:3000/'
let toyUrl = baseUrl + 'toys/'


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch(toyUrl)
  .then(response => response.json())
  .then(toys => toys.forEach(renderToy) 
  )
}
fetchToys()

// function submitNewToy() {
  const addToyForm = document.getElementById("form")
  addToyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const newToyInput = document.getElementById("text-input").value
    const newImgInput = document.getElementById("img-input").value
    
    fetch(toyUrl, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": newToyInput,
      "image": newImgInput,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(toys => renderToy(toys))
})
;

function renderToy(toy) {
const toysCollection = document.getElementById("toy-collection")

const div = document.createElement('div')
div.className = "card"
toysCollection.appendChild(div)

const h2 = document.createElement('h2')
h2.innerText = toy.name 
div.appendChild(h2)

const img = document.createElement('img')
img.src = toy.image
img.classList.add('toy-avatar')
div.appendChild(img)

const p = document.createElement('p')
p.innerText = toy.likes
div.appendChild(p)

const btn = document.createElement('button')
btn.className = "like-btn"
btn.id = toy.id
btn.textContent = "Like ❤️"
div.appendChild(btn)
btn.addEventListener('click', (e) => {

  //you don't always need to interpolate if we add to the toyUrl
  //we couldn't interpolate above because it was placed in global scope so it didn't know what the tou.id was 
  fetch(`http://localhost:3000/toys/${toy.id}` , {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({ likes: toy.likes ++})
})
.then(response => response.json())
.then(toys => (p.innerText = toys.likes))
})

}