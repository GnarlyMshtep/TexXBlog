//!utility funcs start
const tagsMatch = (tags, filters) => {
    console.log("hsbadjhasb", tags);
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

function decreaseByFunction(originalWidth, currentWidth) {
    console.log(Math.abs(originalWidth - currentWidth), currentWidth);
    return (Math.min(Math.abs(originalWidth - currentWidth - 1), currentWidth));
}

function scrollNavBarAway(timestamp, originalWidth, currentCall) {
    if (!originalWidth) {
        originalWidth = this.offsetWidth;
        currentCall = 0;
    }

    if (this.offsetWidth > 3) {
        console.log(decreaseByFunction(originalWidth, this.offsetWidth, currentCall));
        this.style.width = (this.offsetWidth - 3 /*decreaseByFunction(originalWidth, this.offsetWidth)*/ ) + "px";
        window.requestAnimationFrame(scrollNavBarAway.bind(this, timestamp, originalWidth))
    } else { // if no more animation, just make sure we are where we wanna be
        this.style.width = "0px"
    }
}

//utilities end
//constants
//!make constants for the class names of the created elements

const maxTitleLength = 20;
const maxAuthorLength = 15;

//constants end

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

/**
 * 
 * @param {comes from json file} jsonData 
 * @param {the filte of the posts} filter 
 */
const populateNavbar = async (jsonData, filter = [], navContentContainer) => {
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
    const filters = ["quantom mechanics"] //?dummy filter for now
    const jsonData = await loadJSONData(); //!start by loading JSON, we can do that concurrently with page load

    //get page elements 
    const navContentContainer = document.querySelector('.nav-content-container');
    const nav = document.querySelector('nav');
    const clickAwayMiddle = document.querySelector('.clickaway-middle');
    clickAwayMiddle.mClicked = false;

    //call intioalization funcs

    populateNavbar(jsonData, filters, navContentContainer);


    //attach event listeners

    navContentContainer.addEventListener('click', (clicked) => {
        if (clicked.path[1].id) {
            frame.src = "../_docs/" + jsonData.posts[clicked.path[1].id].filename;
            adjustFrameHeight();
        }

    }, false);

    clickAwayMiddle.addEventListener('click', (clicked) => {

            if (clickAwayMiddle.mClicked) {
                clickAwayMiddle.mClicked = !clickAwayMiddle.mClicked
                window.requestAnimationFrame(scrollNavBarBackIn);
            } else if (!clickAwayMiddle.mClicked) {
                clickAwayMiddle.mClicked = !clickAwayMiddle.mClicked
                window.requestAnimationFrame(scrollNavBarAway.bind(nav));
            } else {
                alert('error occured line 164')
            }

        }

    );
}

main();
//!always handle events last