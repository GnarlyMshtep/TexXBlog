function filterButtonToggle() {
    filterContainer = document.getElementById("filter-container");
    if (filterContainer.className == "hide") {
        filterContainer.className = "show"
    }
    else {
        filterContainer.className = "hide"
    }
}

// Variable that stores the users keywords.
//! Store this as a session cookie?
var keyWords = [];

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
