// Variables
var posts = []
var keyWords = []

// Constants
const MAX_TITLE_LENGTH = 20;
const MAX_AUTHOR_LENGTH = 15;
const START_ONSLIDE_INTO_SCREEN = 80
const NUM_KEYWORDS = 30

/**
 * Function obtains the json data from config.json and set's up the entire page.
 */
async function main() {
    // Start by loading JSON, we can do that concurrently with page load.
    const jsonData = await loadJSONData();


    // create an event listener for the loaded function (had a problem that sometime the window would be loaded before we got here)
    if (document.readyState === 'complete') {
        windowLoaded();
    } else {
        window.addEventListener("load", windowLoaded);
    }

    /**
     * Make injections from the JSON file to make the page customizable + set up event listeners. 
     */
    function windowLoaded() {
        // load the latest post
        loadLastBlogPost(jsonData);

        // fix Iframe height
        const Iframe = document.querySelector("Iframe");
        adjustFrameHeight(Iframe);

        // create global variable array of posts (used in filter process)
        posts = jsonData.posts;

        //fix the colors
        fixColors(jsonData.colors);

        // Get filters form query string
        readQueryString()

        // Populate the navbar with posts
        filterPosts()

        // fill in header links
        const headerLinksContainer = document.querySelector('.header-links');
        headerLinksContainer.innerHTML = "";
        populateHeaderLinks(jsonData.metaInfo.navLinks, headerLinksContainer)

        document.querySelector('.h3-header').innerText = jsonData.metaInfo.siteTitle;

        // change the title of page to siteTitle
        document.querySelector('title').innerHTML = jsonData.metaInfo.siteTitle;
        //fill in description for footer
        document.querySelector('.site-description').innerText = jsonData.metaInfo.shortDescription;

        
        //nav for scroll away
        const nav = document.querySelector('nav');
        const originalNavWidth = nav.offsetWidth;
        //main page for scroll
        const navToContentSeperator = document.querySelector(".nav-to-content-seperator");
        //header for scroll 
        const headerWrapper = document.querySelector(".in-header-content-container");

        //clickAwayButton for nav scrollaway event listener
        const clickAwayMiddle = document.querySelector('.clickaway-middle');
        clickAwayMiddle.mOnScreen = true;



        //! Attach event listeners

        // for click on a different article, changes the Iframe src
        const navContentContainer = document.querySelector('.nav-content-container');
        navContentContainer.addEventListener('click', (clicked) => {
            // path doesn't work in safari and firefox.
            var _path = clicked.path || (clicked.composedPath && clicked.composedPath());
            if (_path[1].id) {
                Iframe.src = "../_docs/" + jsonData.posts[_path[1].id].filename;
                Iframe.onload = () => {
                    adjustFrameHeight(Iframe);
                }
            }

        }, false);

        clickAwayMiddle.addEventListener('click', (clicked) => {
                if (clickAwayMiddle.mOnScreen) {
                    clickAwayMiddle.mOnScreen = !clickAwayMiddle.mOnScreen
                    window.requestAnimationFrame(scrollNavBar.bind(nav, headerWrapper, navToContentSeperator, true, originalNavWidth))
                } else if (!clickAwayMiddle.mOnScreen) {
                    clickAwayMiddle.mOnScreen = !clickAwayMiddle.mOnScreen
                    window.requestAnimationFrame(scrollNavBar.bind(nav, headerWrapper, navToContentSeperator, false, originalNavWidth));
                } else {
                    alert('error occurred line 164')
                }

            }

        );
    }
}

/**
 * Function loads the latest blog in the iframe.
 */
function loadLastBlogPost(jsonData) {
    document.getElementById('Iframe').src = '../_docs/' + jsonData.posts[jsonData.posts.length - 1].filename
}

/**
 * Function manages scroll.
 * @param {*} headerWrapper 
 * @param {*} navToContentSeperator 
 * @param {*} isScrollOut 
 * @param {*} originalWidth 
 * @param {*} timestamp 
 * @param {*} currentCall 
 */
// Is scroll Out of screen (not in ) 
//! Refactor.
function scrollNavBar(headerWrapper, navToContentSeperator, isScrollOut, originalWidth, timestamp, currentCall) {
    let temp = 0
    if (!currentCall) {
        currentCall = 0;
    }

    if (isScrollOut) {
        if (this.offsetWidth > 2) {
            temp = sideBarWidth(originalWidth, currentCall, isScrollOut)
            this.style.width = temp + "px";
            navToContentSeperator.style.marginLeft = temp + "px"
            headerWrapper.style.marginLeft = temp + "px"
            window.requestAnimationFrame(scrollNavBar.bind(this, headerWrapper, navToContentSeperator, isScrollOut, originalWidth, timestamp, currentCall + 2))
        } else { // if no more animation, just make sure we are where we wanna be
            this.style.width = "0px"
        }
    } else {
        if (this.offsetWidth < originalWidth - 1.5) {
            temp = sideBarWidth(originalWidth, currentCall, isScrollOut)
            navToContentSeperator.style.marginLeft = temp + "px"
            this.style.width = temp + "px";
            headerWrapper.style.marginLeft = temp + "px"
            window.requestAnimationFrame(scrollNavBar.bind(this, headerWrapper, navToContentSeperator, isScrollOut, originalWidth, timestamp, currentCall + 2))
        } else { // if no more animation, just make sure we are where we wanna be
            this.style.width = originalWidth + "px"
        }
    }

}

/**
 * Set the iframe's proper height
 */

function adjustFrameHeight(Iframe) {
    Iframe.style.height =
        (Iframe.contentWindow.document.body.scrollHeight + 40) + 'px';
    Iframe.style.width = "100%"
}

/**
 * Function add the proper color scheme from config.json file
 * @param {json} colors taken from jsonData
 */
const fixColors = (colors) => {
    if (colors) {
        const r = document.querySelector(':root');
        r.style.setProperty('--nav-color', colors.nav_color);
        r.style.setProperty('--scrolltab-color', colors.scrolltab_color);
        r.style.setProperty('--scrolltab-filling-color', colors.scrolltab_filling_color);
        r.style.setProperty('--text-color', colors.text_color);
        r.style.setProperty('--scrollwheel-color', colors.scrollwheel_color);
    }
}

/**
 * Populate the navbar with the appropriate articles, and 
 * change the query string in url. 
 *
 * @param {json} posts Comes from jsonData
 * @param {String[]} filter the filter of the posts
 */
const populateNavbar = (posts, filter = null) => {
    // Empty the navbar. we onload so we can load the JSON before the entire file loads
    const navContentContainer = document.querySelector('.nav-content-container');
    navContentContainer.innerHTML = "";

    let putUpArticles = false; //we need this know if we should place the empty message
    if (posts) {
        // Add the filtered posts
        for (const post of posts) {
            if (filter == null || filter.has(post.id)) {
                putUpArticles = true
                navContentContainer.appendChild(createNavButtonHTML(post.title, post.author, post.date, post.id))
            }
        }
    }
    // case there were no posts matching the tags, we want to let the user know
    if (!putUpArticles || !posts) {
        const noPostsP = document.createElement("p");
        noPostsP.className = "no-posts-p "
        noPostsP.innerText = "No posts available with the applied filters. Try different filters!"
        navContentContainer.appendChild(noPostsP)
    }

    // change the query string
    let queryString = ""
    for (word of keyWords) {
        queryString += word + ":"
    }
    queryString = queryString.slice(0, queryString.length - 1)
    queryString = queryString != "" ? "?filter=" + queryString : queryString
    if (history.pushState) {
        let newUrl = window.location.origin + queryString
        window.history.pushState({path:newUrl}, '', newUrl)
    }
}

/**
 * Function adds header links to navbar
 * @param {String[]} links 
 * @param {*} headerLinksContainer 
 */
const populateHeaderLinks = (links, headerLinksContainer) => {
    if (links) {
        for (let i = 0; i < links.length; i++) {
            headerLinksContainer.appendChild(createNavLinkButtonHTML(links[i]))
        }
    }
}

/**
 * Function reads the query string and updates the 
 * keyWords array and filter keywords UI.
 */
const readQueryString = () => {
    const params = new URLSearchParams(window.location.search);
    // checks for valid value of query string param "filter"
    function isValidWord(word) {
        const arr = word.match(/^[\w !-]*$/)
        return arr != null
    }
    if (params.has('filter')) {
        const wordsStr = params.get('filter')
        const words = wordsStr.split(':')
        // add words to filter
        for (const word of words) {
            if (isValidWord(word)) {
                if (keyWords.length <= NUM_KEYWORDS) {
                    keyWords.push(word.toLowerCase())
                } else {
                    alert("No more keywords can be added")
                }
            }
        }
        // apply the keywords in filter
        populateFilterTags()
    }
}

/**
 * Function fetches and converts config.json into a object.
 * @returns object
 */
const loadJSONData = async () => {
    const rawJson = await fetch('../config.json');
    const jsonData = await rawJson.json();
    return jsonData
}

// Call main
main();

//! Utility Functions. 

/**
 * Calculates and returns the sidebar width.
 * @param {*} originalWidth 
 * @param {*} callNumber 
 * @param {*} isForward 
 * @returns int
 */
function sideBarWidth(originalWidth, callNumber, isForward) {
    callNumber = isForward ? callNumber : START_ONSLIDE_INTO_SCREEN - callNumber

    /*return (-originalWidth / 4) * (.05 * callNumber - 6) ** (1 / 3) + (1 / 2) * originalWidth*/
    //console.log(-originalWidth / (1 + Math.exp(-.06 * (callNumber - 100))) + originalWidth);
    return (-originalWidth / (1 + Math.exp(-.12 * (callNumber - 40))) + originalWidth + 2)

}

/**
 * Creates a blog entry in the side navbar.
 * @param {String} title 
 * @param {String} author 
 * @param {*} date 
 * @param {*} id 
 * @returns 
 */
const createNavButtonHTML = (title, author, date, id) => {
    //normalize text length
    title = title.length > MAX_TITLE_LENGTH ? title.substr(0, MAX_TITLE_LENGTH) + "..." : title;
    author = author.length > MAX_AUTHOR_LENGTH ? author.substr(0, MAX_AUTHOR_LENGTH) + "..." : author;

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
    dateP.innerText = date.monthDayYear.toString().replaceAll(',', '/');
    dateP.className = "article-button-date"

    button.appendChild(titleP);
    button.appendChild(authorP);
    button.appendChild(dateP);

    return button;
}

/**
 * Creates a nav link.
 * @param {String} link 
 * @returns 
 */
const createNavLinkButtonHTML = (link) => {
    const a = document.createElement("a")
    a.href = link.href;

    const div = document.createElement("div")
    div.className = "header-link"
    div.innerText = link.title

    a.appendChild(div)
    return a
}

/** 
* Function that is used to toggle the display of the filter container.
*
* */
function filterButtonToggle() {
    filterContainer = document.getElementById("filter-container");
    if (filterContainer.className == "hide") {
        filterContainer.className = "show"
        document.getElementById("filter-search-bar").focus();
    }
    else {
        filterContainer.className = "hide"
    }
}

/**
 * Adds the new keyword to variable keywords and re-populates the filter-container
 * using populateFilterTags()
 * 
 * */
function updateKeywords() {
    let text = document.getElementById('filter-search-bar').value
    if (text != "") {
        // Limit the number of keywords to NUM_KEYWORDS.
        if (keyWords.length <= NUM_KEYWORDS) {
            keyWords.push(text.toLowerCase())
        } else {
            alert("No more keywords can be added")
        }
        populateFilterTags();
    }
    // clear the search bar
    document.getElementById('filter-search-bar').value = "";
}

/**
 * Populates div "tags-list" with all the tags in var keywords.
 */
function populateFilterTags() {
    // remove all the tags
    document.getElementById("tags-list").innerHTML = ""
    // add all the tags
    keyWords.forEach((tag) => {
        let list = document.getElementById("tags-list");
        // create a <li> with <span> for close 'X'
        let node = document.createElement("li");
        // limit display of tag to 10 chars
        let tagNode = document.createTextNode(tag.substring(0, 11).toLowerCase());
        let span = document.createElement('span');
        span.innerHTML = "&times";
        // Onclick function deletes the keyword and re-populates the tags.
        span.onclick = () => {
            let index = keyWords.indexOf(tag);
            if (index != -1) {
                keyWords.splice(index, 1);
            }
            populateFilterTags();
        }

        node.appendChild(tagNode);
        node.appendChild(span);
        list.appendChild(node);
    })
}

/**
 * Function that filters the posts using keywords and updates the blogs in 
 * navbar by calling func populateNavbar.
 * @returns Set()
 */
const filterPosts = () => {
    let filterPostsId = new Set();
    if (posts) {
        posts.forEach((post) => {
            // keywords of post
            postKeywords = new Set();
            postKeywords.add(post.title.toLowerCase());
            postKeywords.add(post.author.toLowerCase());
            post.tags.forEach((tag) => {
                postKeywords.add(tag.toLowerCase())
            })
            hasAllKeywords = true;
            for (let i = 0; i < keyWords.length; i++) {
                if (!postKeywords.has(keyWords[i])) {
                    hasAllKeywords = false;
                    break;
                }
            }
            if (hasAllKeywords) {
                filterPostsId.add(post.id);
            }
        })
    }
    // Update the navbar
    populateNavbar(posts, filterPostsId);
}