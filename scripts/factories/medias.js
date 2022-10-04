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
            img.style.cursor = "pointer"
            figure.appendChild(img);
        }
        else {
            const videoElem = document.createElement('video');
            const source = document.createElement("source");
            source.setAttribute("src", thumbnail)
            videoElem.appendChild(source);
            videoElem.style.cursor = "pointer"
            figure.appendChild(videoElem);
        }
        figureLink.setAttribute('href', "javascript:;")
        figure.appendChild(figcaption);
        nameElem.textContent = title;
        likesElem.textContent = [likes, "❤"].join(" ");
        likesElem.ariaLabel = "likes"
        likesElem.classList.add("likes-btn")
        likesElem.addEventListener("click", function () { handleLikes(likes, likesElem) });
        figureLink.appendChild(figure);
        figcaption.appendChild(nameElem);
        figcaption.appendChild(likesElem);
        figcaption.classList.add('caption-photographer')
        article.appendChild(figureLink);


        return article;
    }
    return { getMediaCardDOM }
}

function handleLikes(likes, likesElem) {
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
}

