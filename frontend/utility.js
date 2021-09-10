//!constants
const maxTitleLength = 20;
const maxAuthorLength = 15;
const startFromOnSlideIntoScreen = 80

const tagsMatch = (tags, filters) => {
    //console.log("hsbadjhasb", tags);
    if (tags && filters) {
        for (let i = 0; i < tags.length; i++) {
            for (let i = 0; i < filters.length; i++) {
                if (tags[i] === filters[i]) {
                    console.log('i am included');
                    return true;
                }
            }
        }
        return false;
    }
}

function sideBarWidth(originalWidth, callNumber, isForward) {
    callNumber = isForward ? callNumber : startFromOnSlideIntoScreen - callNumber

    /*return (-originalWidth / 4) * (.05 * callNumber - 6) ** (1 / 3) + (1 / 2) * originalWidth*/
    //console.log(-originalWidth / (1 + Math.exp(-.06 * (callNumber - 100))) + originalWidth);
    return (-originalWidth / (1 + Math.exp(-.12 * (callNumber - 40))) + originalWidth + 2)

}

const createNavButtonHTML = (title, author, date, id) => {
    //normalize text length
    title = title.length > maxTitleLength ? title.substr(0, maxTitleLength) + "..." : title;
    author = author.length > maxAuthorLength ? author.substr(0, maxAuthorLength) + "..." : author;

    //set up html elements
    let button = document.createElement("div");
    button.className = "article-button nav-button"
    button.id = id

    let titleP = document.createElement("p")
    titleP.innerText = title;
    titleP.className = "article-button-title"

    let authorP = document.createElement("p");
    authorP.innerText = author;
    authorP.className = "article-button-author"

    let dateP = document.createElement("p");
    dateP.innerText = date;
    dateP.className = "article-button-date"

    button.appendChild(titleP);
    button.appendChild(authorP);
    button.appendChild(dateP);

    return button;
}

const createNavLinkButtonHTML = (link) => {
    const a = document.createElement("a")
    a.href = link.href;

    const div = document.createElement("div")
    div.className = "header-link"
    div.innerText = link.title

    a.appendChild(div)
    return a
}

export default {
    tagsMatch,
    sideBarWidth,
    createNavButtonHTML,
    createNavLinkButtonHTML
}