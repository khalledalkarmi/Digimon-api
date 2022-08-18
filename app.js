const Base_URL = "https://digimon-api.vercel.app/api/digimon";

// get search button from DOM 
const searchButton = document.getElementById("searchButton")
// get search by name input from DOM 
const searchFelidByName = document.getElementById("searchFelidByName")

// get search by name input from DOM 
const searchFelidByLevel = document.getElementById("searchFelidByLevel")

class Digimon {
    constructor(name, level, image) {
        this.name = name;
        this.level = level;
        this.image = image;
    }
}

// fire event on click 
searchButton.onclick = (event) => {
    // cancel default behavior (refresh page)
    event.preventDefault()

    // get search value 
    const digimonName = searchFelidByName.value
    const digimonLevel = searchFelidByLevel.value

    // call getData function and pass move name as parameter 
    if (digimonName && digimonLevel == "") {
        getDataByName(digimonName);
    } else if (digimonLevel && digimonName == "") {
        getDataByLevel(digimonLevel);

    } else {
        alert("can't search by name and level in the same time")
    }

}

// function to handle get data from server 
function getDataByName(digimonName) {

    // fetch function take api URL as as parameter  
    fetch(Base_URL + "/name/" + digimonName)
        // convert response to object by json() method  
        .then((response) => response.json())
        // after we handle the response 
        .then((data) => {
            // log the response as object
            console.log(data)

            // call function display and take data as parameter to represent the data by DOM Manipulation
            display(data[0])
        });
}

// get div container to append child to it 
let cardDiv = document.getElementById("cardDiv");

function display(data) {

    // create div container and set class name 
    let divCol = document.createElement("div");
    divCol.className = "col-sm-3";
    cardDiv.append(divCol);

    // create div container to carry card-title, card-image, card-body, and card-text 
    let card = document.createElement("div");
    card.className = "card"
    divCol.append(card);

    let imgCard = document.createElement("img");
    imgCard.className = "card-img-top w-100";
    imgCard.style.width = "100px"
    imgCard.src = data.img
    card.append(imgCard)

    let cardBody = document.createElement("div");
    cardBody.className = "card-body"
    card.append(cardBody);

    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title"
    cardTitle.textContent = data.name
    cardBody.append(cardTitle);

    let cardText = document.createElement("p");
    cardText.className = "card-text"
    cardText.setAttribute('style', 'white-space: pre;');
    cardText.textContent = "- Level: " + data.level
    cardBody.append(cardText);

}

async function getAllData() {
    const response = await fetch(Base_URL);
    if (response.status !== 200) {
        throw new Error("cannot fetch data");
    }

    let dataAsJson = response.json();
    return dataAsJson;
}

let digimonArray = []
getAllData().then((data) => {
    
    for (let index = 0; index < 20; index++) {
        const element = data[index];
        let digimon = new Digimon(data.name, data.level, data.img);
        digimonArray.push(digimon);
        display(element);
    }
});


for (let index = 0; index < digimonArray.length; index++) {
    console.log("here");
    const element = digimonArray[index];
    display(element)
}

function getDataByLevel(digimonLevel) {
    // fetch function take api URL as as parameter  
    fetch(Base_URL + "/level/" + digimonLevel)
        // convert response to object by json() method  
        .then((response) => response.json())
        // after we handle the response 
        .then((data) => {
            // log the response as object
            console.log(data)

            // call function display and take data as parameter to represent the data by DOM Manipulation
            data.forEach(element => {
                display(element)
            });
        });
}

console.log(digimonArray)










