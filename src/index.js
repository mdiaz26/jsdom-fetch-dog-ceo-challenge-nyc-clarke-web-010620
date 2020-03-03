let breeds = []

document.addEventListener('DOMContentLoaded', function () {
    fetchImages()
    fetchBreeds()
})

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    return fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => addImages(json))
}

function addImages(json) {
    let div = document.getElementById("dog-image-container")
    json.message.forEach(image => {
        const dog = document.createElement('div')
        dog.innerHTML = `<img class="dog-image" src=${image}>`
        div.appendChild(dog)
    })
}

function fetchBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => {

            breeds = Object.keys(json.message)
            updateBreedList(breeds)
            addBreedSelectListener()
    })
}

function updateBreedList(breeds) {
    let ul = document.getElementById("dog-breeds")
    removeChildren(ul)
    breeds.forEach(breed => addBreed(breed))
}

function addBreed(breed) {
    let ul = document.getElementById("dog-breeds")
    let li = document.createElement('li')
        li.innerHTML = `${breed}`
        li.addEventListener('click', changeColor)
        ul.appendChild(li)
    }

function changeColor(event) {
    event.target.style.color = 'red'
}

function addBreedSelectListener() {
    let dropDown = document.querySelector('#breed-dropdown')
    dropDown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value)
    })
}


function removeChildren(element) {
    let child = element.lastElementChild
    while(child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}

function selectBreedsStartingWith(letter) {
    console.log(breeds)
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)))
}