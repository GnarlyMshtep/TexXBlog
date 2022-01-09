
// Variable that stores the users keywords.
//! Store this as a session cookie?
var keyWords = [];
// variable that stores array of posts
var posts = [];
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


/**
 * This function creates a array of blog id's based on the fiters.
 * @param {array of (id, tag) for each post} postsAndIds
 * @returns array of id's
 */
const populateNavbar2 = async (posts, postAndIds) => {
    console.log("posts:", posts);
    console.log("postsAfterFilter", postAndIds);
}