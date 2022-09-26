function mediaFactory(data) {

    const { image, video, title, likes } = data

    const picture = `assets/samples/${image}`;
    const thumbnail = `assets/samples/${video}`;

    function getMediaCardDOM() {
        const figure = document.createElement('figure');
        const figureLink = document.createElement('a');
        const nameElem = document.createElement('p');
        const likesElem = document.createElement('p');
        const figcaption = document.createElement('figcaption');
        const article = document.createElement('article');

        if (image != undefined) {
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("alt", "");
            figure.appendChild(img);
        }
        else {
            const videoElem = document.createElement('video');
            const source = document.createElement("source");
            source.setAttribute("src", thumbnail)
            videoElem.appendChild(source);
            figure.appendChild(videoElem);
            console.log(source)
        }

        nameElem.textContent = title;
        likesElem.textContent = [likes, "❤"].join(" ");
        likesElem.classList.add("likes-btn")
        likesElem.addEventListener("click", function () {
            if (likesElem.hasAttribute("liked", true)) {
                likesElem.textContent = [likes, "❤"].join(" ");
                likesElem.removeAttribute("liked")
                document.querySelector(".bottom-fixed-box").firstElementChild.textContent = [document.querySelector(".bottom-fixed-box").firstElementChild.textContent.split(" ")[0] - 1, "❤"].join(" ")
            }
            else {
                likesElem.textContent = [likes + 1, "❤"].join(" ");
                likesElem.setAttribute("liked", true)
                document.querySelector(".bottom-fixed-box").firstElementChild.textContent = [parseInt(document.querySelector(".bottom-fixed-box").firstElementChild.textContent.split(" ")[0]) + 1, "❤"].join(" ")
            }
        });
        figureLink.appendChild(figure);
        figcaption.appendChild(nameElem);
        figcaption.appendChild(likesElem);
        article.appendChild(figureLink);
        article.appendChild(figcaption);


        return article;
    }
    return { getMediaCardDOM }
}
