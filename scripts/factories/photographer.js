function photographerFactory(data) {
    const { name, country, city, tagline, price, portrait, id} = data;

    const picture = `assets/photographers/${portrait}`;
    const photographerLink = ["photographer.html?id=", id].join("")

    function getUserCardDOM() {
        const article = document.createElement('article');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figureLink = document.createElement('a');
        const nameElem = document.createElement('h2');
        const figcaption = document.createElement('figcaption');
        const locationElem = document.createElement('p'), taglineElem = document.createElement('p'), priceElem = document.createElement('p');
        figureLink.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(nameElem);
        article.appendChild(figureLink);
        figcaption.appendChild(locationElem);
        figcaption.appendChild(taglineElem);
        figcaption.appendChild(priceElem);
        article.appendChild(figcaption);
        nameElem.textContent = name;
        locationElem.textContent = [city, country].join(", ")
        taglineElem.textContent = tagline;
        priceElem.textContent = [price, "€/jour"].join("");
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        addCSSToCardDOM(article, figure, figureLink, figcaption, locationElem, priceElem, img);
        return article;
    }

    function addCSSToCardDOM(article, figure, figureLink, figcaption, locationElem, priceElem, img) {
        figureLink.setAttribute('href', photographerLink)
        img.style.borderRadius = "50%";
        article.style.display = 'flex'
        article.style.flexDirection = 'column'
        article.style.alignItems = 'center'
        article.style.justifyContent = 'center'
        figure.style.margin = '0'
        figcaption.style.lineHeight = "40%"
        locationElem.style.color = "#901C1C"
        priceElem.style.color = "#525252"
        figure.childNodes.forEach(element => element.style.margin = "0")
        article.childNodes.forEach(element => element.style.textAlign = "center")
    }

    return { name, picture, getUserCardDOM }
}