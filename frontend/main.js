//constants
//!make constants for the class names of the created elements

const maxTitleLength = 20;
const maxAuthorLength = 15;

/**
 * @abstract set the iframe's proper height
 */
const frame = document.querySelector("Iframe");
frame.onload = () => {
    adjustFrameHeight();
}

function adjustFrameHeight() {
    frame.style.height =
        (frame.contentWindow.document.body.scrollHeight + 40) + 'px';
    frame.style.width = "100%"
    console.log(frame.contentWindow.document.body.scrollHeight);
    console.log(frame.style.height);
}



/**
 * @abstract populate the navbar with the appropriate articles
 */
const navContentContainer = document.querySelector('.nav-content-container');

/**
 * 
 * @param {comes from json file} jsonData 
 * @param {the filte of the posts} filter 
 */
const populateNavbar = async (jsonData, filter = []) => {
    //load the JSON

    //then, empty the navbar. we onload so we can load the JSON before the entire file loads
    window.onload = () => {
        navContentContainer.innerHTML = "";
        //console.log(jsonData.posts[0].id);
        //console.log(createNavButtonHTML(jsonData.posts[0].title, jsonData.posts[0].author, jsonData.posts[0].date));
        let putUpArticles = false;
        if (jsonData.posts.length > 0) {

            for (let i = 0; i < jsonData.posts.length; i++) {
                //!check the filter
                if (tagsMatch(jsonData.posts[i].tags, filter)) {
                    putUpArticles = true
                    navContentContainer.appendChild(createNavButtonHTML(jsonData.posts[i].title, jsonData.posts[i].author, jsonData.posts[i].date, jsonData.posts[i].id))
                }

            }
        } else if (!putUpArticles) {
            const noPostsP = document.createElement("p");
            noPostsP.className = "no-posts-p "
            noPostsP.innerText = "No posts avalabile with the applied filters. Try different filters!"
            navContentContainer.appendChild(noPostsP)
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

const loadJSONData = async () => {
    const rawJson = await fetch('config.json');
    console.log(rawJson);
    /*const reader = rawJson.arrayBuffer.body.getReader()
    console.log(reader);*/
    const jsonData = await rawJson.json();
    return jsonData
}

async function main() {
    const filter = ["quanton mechanics"]

    const jsonData = await loadJSONData();
    populateNavbar(jsonData, filter);
    navContentContainer.addEventListener('click', (clicked) => {
        if (clicked.path[1].id) {
            frame.src = "../_docs/" + jsonData.posts[clicked.path[1].id].filename;
            adjustFrameHeight();
        }

    }, false)
}

main();
//!always handle events last

function tagsMatch(tags, filters) {
    console.log("hsbadjhasb", tags);
    if (tags && filters) {
        for (let i = 0; i < tags.length; i++) {
            if (filters.includes(tags[i])) {
                console.log('i am included');
                return true;
            }
        }
    }
    return false;
}