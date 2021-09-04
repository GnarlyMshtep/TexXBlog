//constants
const maxTitleLength = 20;
const maxAuthorLength = 15;

/**
 * @abstract set the iframe's proper height
 */
const frame = document.querySelector("Iframe");
frame.onload = () => {
    frame.style.height =
        frame.contentWindow.document.body.scrollHeight + 'px';

    frame.style.width =
        frame.contentWindow.document.body.scrollWidth + 'px';

}

/**
 * @abstract populate the navbar with the appropriate articles
 */
const navContentContainer = document.querySelector('.nav-content-container');
const populateNavbar = (filter) => {
    //first, empty the navbar.
    navContentContainer.innerHTML = "";

}

/**
 * 
 * @param {CreateNavButton} title 
 * @param {Matan SHtepel} author 
 * @param {9/4/2021} date 
 * @returns html eleent such as: 
 *          <div class="article-button nav-button">
                    <p class="article-button-title">Merkle Trees: Fundementals</p>
                    <p class="article-button-author">Ishaan Dham</p>
                    <p class="article-button-date">9/4/2021</p>
            </div>
 */
const createNavButtonHTML = (title, author, date, ) => {
    //normalize text length
    title = title.length > maxTitleLength ? title.substr(0, maxTitleLength) + "..." : title;
    author = author.length > maxAuthorLength ? author.substr(0, maxAuthorLength) + "..." : author;

    //set up html elements
    let button = document.createElement("div");

    let titleP = document.createElement("p")
    titleP.innerText = title;
    titleP.className = "article-button-title"

    let authorP = document.createElement("p");
    authorP.innerText = author;
    titleP.className = "article-button-author"

    let dateP = document.createElement("p");
    dateP.innerText = date;
    titleP.className = "article-button-date"

    button.appendChild(titleP);
    button.appendChild(authorP);
    button.appendChild(dateP);

    return button;
}