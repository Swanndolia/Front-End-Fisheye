function mediaFactory(data) {

    const { image, video, title, likes } = data

    const picture = `assets/samples/${image}`;
    const thumbnail = `assets/samples/${video}`;

    function getMediaCardDOM() {
        const figure = document.createElement('figure');
        const figureLink = document.createElement('a');
        const nameElem = document.createElement('h2');
        const likesElem = document.createElement('p');
        const figcaption = document.createElement('figcaption');
        const article = document.createElement('article');

        if (image != undefined){
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("alt", "");
            figure.appendChild(img);
        }
        else{
            const videoElem = document.createElement('video');
            const source = document.createElement("source");
            source.setAttribute("src", thumbnail)
            videoElem.appendChild(source);
            figure.appendChild(videoElem);
            console.log(source)
        }

        nameElem.textContent = title;
        likesElem.textContent = likes;

        figureLink.appendChild(figure);
        figcaption.appendChild(nameElem);
        figcaption.appendChild(likesElem);
        article.appendChild(figureLink);
        article.appendChild(figcaption);


        return article;
    }
    return { getMediaCardDOM }
}