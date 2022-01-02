import utility from './utility.js'


async function main() {
    const filters = [] //?dummy filter for now
    const jsonData = await loadJSONData(); //!start by loading JSON, we can do that concurrently with page load -- this is nice : )


    //?create an event listener for the loaded function -- we had a problem that sometime the window would be loaded before we got here
    if (document.readyState === 'complete') {
        windowLoaded();
    } else {
        window.addEventListener("load", windowLoaded);
    }

    /**
     * @abstract Make the injections from teh JSON file to make the page customizable + set up event listeners. 
     */
    function windowLoaded() {
        loadLastBlogPost(jsonData)

        //fix Iframe height
        const Iframe = document.querySelector("Iframe");
        adjustFrameHeight(Iframe);


        //nav content container for population
        const navContentContainer = document.querySelector('.nav-content-container');
        console.log(jsonData.posts);
        populateNavbar(jsonData.posts, filters, navContentContainer);

        //fill in header links
        const headerLinksContainer = document.querySelector('.header-links');
        headerLinksContainer.innerHTML = "";
        populateHeaderLinks(jsonData.navLinks, headerLinksContainer)

        document.querySelector('.h3-header').innerText = jsonData.metaInfo.siteTitle;

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



        //!attach event listeners

        //for click on a different article, changes teh Iframe src
        navContentContainer.addEventListener('click', (clicked) => {
            if (clicked.path[1].id) {
                console.log('at event listener func');
                Iframe.src = "../_docs/" + jsonData.posts[clicked.path[1].id].filename;
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
                    alert('error occured line 164')
                }

            }

        );
    }
}


function loadLastBlogPost(jsonData) {
    document.getElementById('Iframe').src = '../_docs/' + jsonData.posts[jsonData.posts.length - 1].filename
}


//Is scroll Out of screen (not in ) //!move to utility
//?!I'm ugly! please refactor me :)
function scrollNavBar(headerWrapper, navToContentSeperator, isScrollOut, originalWidth, timestamp, currentCall) {

    let temp = 0
    if (!currentCall) {
        currentCall = 0;
    }

    if (isScrollOut) {
        if (this.offsetWidth > 2) {
            temp = utility.sideBarWidth(originalWidth, currentCall, isScrollOut)
            this.style.width = temp + "px";
            navToContentSeperator.style.marginLeft = temp + "px"
            headerWrapper.style.marginLeft = temp + "px"
            window.requestAnimationFrame(scrollNavBar.bind(this, headerWrapper, navToContentSeperator, isScrollOut, originalWidth, timestamp, currentCall + 2))
        } else { // if no more animation, just make sure we are where we wanna be
            this.style.width = "0px"
        }
    } else {
        if (this.offsetWidth < originalWidth - 1.5) {
            temp = utility.sideBarWidth(originalWidth, currentCall, isScrollOut)
            navToContentSeperator.style.marginLeft = temp + "px"
            this.style.width = temp + "px";
            headerWrapper.style.marginLeft = temp + "px"
            window.requestAnimationFrame(scrollNavBar.bind(this, headerWrapper, navToContentSeperator, isScrollOut, originalWidth, timestamp, currentCall + 2))
        } else { // if no more animation, just make sure we are where we wanna be
            this.style.width = originalWidth + "px"
        }
    }

}

//utilities end
//constants
//!make constants for the class names of the created elements



//constants end

/**
 * @abstract set the iframe's proper height
 */

function adjustFrameHeight(Iframe) {
    Iframe.style.height =
        (Iframe.contentWindow.document.body.scrollHeight + 40) + 'px';
    Iframe.style.width = "100%"
}



/**
 * @abstract populate the navbar with the appropriate articles
 */

/**
 * 
 * @param {comes from json file} jsonData 
 * @param {the filte of the posts} filter 
 */
const populateNavbar = async (posts, filters = [], navContentContainer) => {
    // JSON loaded
    //then, empty the navbar. we onload so we can load the JSON before the entire file loads
    navContentContainer.innerHTML = "";

    let putUpArticles = false; //we need this know if we should place the empty messege
    if (posts) {
        for (let i = 0; i < posts.length; i++) {
            //!check the filter
            if (utility.tagsMatch(posts[i].tags, filters)) {
                putUpArticles = true
                console.log(posts[i].title)
                navContentContainer.appendChild(utility.createNavButtonHTML(posts[i].title, posts[i].author, posts[i].date, posts[i].id))
            }

        }

    }
    if (!putUpArticles || !posts) { //in case there were no posts matching the tags, we want to let the user know
        const noPostsP = document.createElement("p");
        noPostsP.className = "no-posts-p "
        noPostsP.innerText = "No posts avalabile with the applied filters. Try different filters!"
        navContentContainer.appendChild(noPostsP)
    }

}
const populateHeaderLinks = (links, headerLinksContainer) => {
    if (links) {
        for (let i = 0; i < links.length; i++) {
            headerLinksContainer.appendChild(utility.createNavLinkButtonHTML(links[i]))
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

const loadJSONData = async () => {
    const rawJson = await fetch('../config.json');
    /*const reader = rawJson.arrayBuffer.body.getReader()
    console.log(reader);*/
    const jsonData = await rawJson.json();
    return jsonData
}


main();
//!always handle events last