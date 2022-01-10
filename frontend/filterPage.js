// window variable used - window.postsAndIds, window.posts

// variable that stores the users keywords.
var keyWords = [];
// variable that stores array of posts
var posts = [];
// constants
const maxTitleLength = 20; 
const maxAuthorLength = 15;


/** 
* Function that is used to toggle the display of the filter container.
*
* */
function filterButtonToggle() {
    filterContainer = document.getElementById("filter-container");
    if (filterContainer.className == "hide") {
        filterContainer.className = "show"
    }
    else {
        filterContainer.className = "hide"
    }
}

/**
 * Adds the new keyword to KEYWORDS and re-populated the filter-container
 * using populateFilterTags()
 * 
 * */
function updateKeywords() {
    let text = document.getElementById('filter-search-bar').value
    if (text != "") {
        // Limit the number of keywords to 30
        if (keyWords.length <= 30) {
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
 * Populates div "tags-list" with all the tags in KEYWORDS.
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


const populateNavbar2 = () => {
    let filterPostsId = new Set();
    if (window.posts) {
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
    // Re-populate the navbar with the filter blogs (id's in navbarPostsIds)
    const navContentContainer = document.querySelector('.nav-content-container');
    navContentContainer.innerHTML = "";

    let putUpArticles = false; //we need this know if we should place the empty message
    if (window.posts) {
        for (let i = 0; i < window.posts.length; i++) {
            // check the filter
            if (filterPostsId.has(posts[i].id)) {
                putUpArticles = true
                navContentContainer.appendChild(createNavButtonHTML(window.posts[i].title, window.posts[i].author, window.posts[i].date, window.posts[i].id))
            }

        }

    }
    if (!putUpArticles || !posts) { //in case there were no posts matching the tags, we want to let the user know
        const noPostsP = document.createElement("p");
        noPostsP.className = "no-posts-p "
        noPostsP.innerText = "No posts available with the applied filters. Try different filters!"
        navContentContainer.appendChild(noPostsP)
    }

    }
}

/**
 * This function creates a array of blog id's based on the filters.
 * @param {array of (id, tag) for each post} postsAndIds
 * @returns array of id's
 */
const populateNavbar3 = async () => {
    // console.log("posts:", window.posts);
    // console.log("postsAfterFilter", window.postsAndIds);
    // Binary Search
    let navbarPostsIds = new Set();
    function binarySearch(arr, el) {
        var m = 0;
        var n = arr.length - 1;
        while (m <= n) {
            var k = (n + m) >> 1;
            comp = el.localeCompare(arr[k][0]);
            if (comp > 0) {
                m = k + 1;
            } else if(comp < 0) {
                n = k - 1;
            } else {
                return k;
            }
        }
        return -m - 1;
    }
    keyWords.forEach((keyword) => {
        index = binarySearch(window.postsAndIds, keyword)
        if (index > -1) { 
            // get all the matches (all matches are between left - right)
            left = index - 1;
            right = index + 1;
            while (left >= 0 && window.postsAndIds[left][0] == keyword) {
                left--;
            }
            while (right < window.postsAndIds.length && window.postsAndIds[right][0] == keyword) {
                right++;
            }
            // Add the id's to navPostsIds array
            for (let x = left + 1; x < right; x++) {
                navbarPostsIds.add(window.postsAndIds[x][1]);
            }
        }
    })
    console.log(navbarPostsIds);
    // Re-populate the navbar with the filter blogs (id's in navbarPostsIds)
    const navContentContainer = document.querySelector('.nav-content-container');
    navContentContainer.innerHTML = "";

    let putUpArticles = false; //we need this know if we should place the empty message
    if (window.posts) {
        for (let i = 0; i < window.posts.length; i++) {
            // check the filter
            if (navbarPostsIds.has(posts[i].id)) {
                putUpArticles = true
                navContentContainer.appendChild(createNavButtonHTML(window.posts[i].title, window.posts[i].author, window.posts[i].date, window.posts[i].id))
            }

        }

    }
    if (!putUpArticles || !posts) { //in case there were no posts matching the tags, we want to let the user know
        const noPostsP = document.createElement("p");
        noPostsP.className = "no-posts-p "
        noPostsP.innerText = "No posts available with the applied filters. Try different filters!"
        navContentContainer.appendChild(noPostsP)
    }

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
    dateP.innerText = date.monthDayYear.toString().replaceAll(',', '/');
    dateP.className = "article-button-date"

    button.appendChild(titleP);
    button.appendChild(authorP);
    button.appendChild(dateP);

    return button;
}