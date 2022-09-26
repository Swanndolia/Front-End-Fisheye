const lightBoxElem = document.querySelector("#lightbox")
const lightBoxContentElem = document.querySelector(".lightbox-preview")
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

let mediaList;

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

async function displayData(userDetails) {
    setupUserCardDOM(userDetails)
    displayMedias()
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

function displayMedias() {
    const mediaSection = document.querySelector(".media_section");
    mediaSection.replaceChildren()
    mediaList.forEach((media) => {
        const mediaProcessing = mediaFactory(media);
        const mediaCardDOM = mediaProcessing.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
        if (mediaCardDOM.querySelector("img"))
            mediaCardDOM.querySelector("img").addEventListener("click", function () { openLightbox(mediaCardDOM.querySelector("figure").cloneNode(true)) }); //TODO REFACTOR
        else
            mediaCardDOM.querySelector("video").addEventListener("click", function () { openLightbox(mediaCardDOM.querySelector("figure").cloneNode(true)) }); //TODO REFACTOR
    });
}

function openLightbox(figureElem) {
    lightBoxElem.style.display = "block";
    lightBoxContentElem.replaceChildren();
    figureElem.querySelector("figcaption").removeChild(figureElem.querySelector("figcaption").lastChild)
    lightBoxContentElem.appendChild(figureElem);
}

function navPrevFigure() {

}
function navNextFigure() {

}

function closeLightbox() {
    console.log()
    lightBoxElem.style.display = "none";
}

function showModalContact() {
    modalContact.style.display = "block";
}

function getTotalLikes(mediaList) {
    let totalLikes = 0;
    mediaList.forEach(media => {
        totalLikes += media.likes;
    });
    return totalLikes;
}

async function sortMedia(order) {
    nestedSort = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
        const a = prop2 ? e1[prop1][prop2] : e1[prop1],
            b = prop2 ? e2[prop1][prop2] : e2[prop1],
            sortOrder = direction === "asc" ? 1 : -1
        return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
    }//change it'sawful
    mediaList.sort(nestedSort(order))

    displayMedias()
}

async function init() {
    // Récupère les datas des medias
    const userId = new URLSearchParams(window.location.search).get("id");
    const { photographers, media } = await getData();
    const userDetails = await getUserDetails(photographers, userId);
    mediaList = await filterMedia(media, userId);
    totalLikesElem.textContent = [getTotalLikes(mediaList), "❤"].join(" ");
    displayData(userDetails)
};

init();
