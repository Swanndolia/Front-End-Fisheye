async function getPhotographers() {
    const response = await fetch("data/photographers.json")
    return await response.json()
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((media) => {
        const photographerModel = photographerFactory(media);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
