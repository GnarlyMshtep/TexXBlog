//constants
//!make constants for the class names of the created elements

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
const populateNavbar = async (filter) => {
    //load the JSON
    const jsonData = await loadJSONData();

    //then, empty the navbar. we onload so we can load the JSON before the entire file loads
    window.onload = () => {
        navContentContainer.innerHTML = "";
        //console.log(createNavButtonHTML(jsonData.posts[0].title, jsonData.posts[0].author, jsonData.posts[0].date));
        for (let i = 0; i < jsonData.posts.length; i++) {
            navContentContainer.appendChild(createNavButtonHTML(jsonData.posts[i].title, jsonData.posts[i].author, jsonData.posts[i].date))
        }

    }
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
    button.className = "article-button nav-button"

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

const loadJSONData = async () => {
    const rawJson = await fetch('config.json');
    console.log(rawJson);
    /*const reader = rawJson.arrayBuffer.body.getReader()
    console.log(reader);*/
    const jsonData = await rawJson.json();
    return jsonData
}


populateNavbar();