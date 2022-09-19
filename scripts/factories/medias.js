function mediaFactory(data) {

    const { image } = data

    const picture = `assets/samples/${image}`;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figureLink = document.createElement('a');
        const nameElem = document.createElement('h2');
        const figcaption = document.createElement('figcaption');

        figureLink.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(nameElem);
        article.appendChild(figureLink);
        article.appendChild(figcaption);

        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        return article;
    }
    return { getMediaCardDOM }
}