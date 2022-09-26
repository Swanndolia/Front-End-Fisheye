const userHeader = document.querySelector(".photograph-header");
const contactButton = document.querySelector(".contact_button")
const bottomFixedElem = document.querySelector(".bottom-fixed-box");
const priceElem = document.createElement("p");
const totalLikesElem = document.createElement("p");
const userInfosElem = document.createElement('article');
const nameElem = document.createElement("h1");
const loationElem = document.createElement("p");
const taglineElem = document.createElement("p");
const imgElem = document.createElement("img");
const modalContact = document.querySelector("#contact_modal");

contactButton.addEventListener("click", showModalContact);

async function getData() {
    const response = await fetch("data/photographers.json")
    return await response.json()
}

async function getUserDetails(photographers, userId) {
    return photographers.find(photographer => {
        return photographer.id == userId
    })
}

async function filterMedia(medias, userId) {
    return medias.filter(media => {
        return media.photographerId == userId
    })
}

async function displayData(mediaList, userDetails) {
    setupUserCardDOM(userDetails)
    const mediaSection = document.querySelector(".media_section");
    mediaList.forEach((media) => {
        const mediaProcessing = mediaFactory(media);
        const mediaCardDOM = mediaProcessing.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
};

function setupUserCardDOM(userDetails) {
    console.log(userDetails)
    const { name, country, city, tagline, price, portrait, id } = userDetails;
    const picture = `assets/photographers/${portrait}`;

    priceElem.textContent = [price, "€ / jour"].join("");
    nameElem.textContent = name;
    loationElem.textContent = [city, country].join(", ")
    taglineElem.textContent = tagline

    imgElem.setAttribute("src", picture);
    imgElem.setAttribute("alt", "");

    bottomFixedElem.appendChild(totalLikesElem)
    bottomFixedElem.appendChild(priceElem)

    userInfosElem.appendChild(nameElem)
    userInfosElem.appendChild(loationElem)
    userInfosElem.appendChild(taglineElem)

    userHeader.insertBefore(userInfosElem, contactButton);
    userHeader.appendChild(imgElem)
}

function showModalContact() {
    modalContact.style.display = "block";
}

async function init() {
    // Récupère les datas des medias
    const userId = new URLSearchParams(window.location.search).get("id");
    const { photographers, media } = await getData();
    const userDetails = await getUserDetails(photographers, userId);
    const mediaList = await filterMedia(media, userId);
    displayData(mediaList, userDetails)
};

init();
