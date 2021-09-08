import utility from './utility.js'


async function main() {
    const filters = ["quantom mechanics"] //?dummy filter for now
    const jsonData = await loadJSONData(); //!start by loading JSON, we can do that concurrently with page load -- this is nice : )


    //?create an event listener for the loaded function -- we had a problem that sometime the window would be loaded before we got here
    if (document.readyState === 'complete') {
        windowLoaded();
    } else {
        window.addEventListener("load", windowLoaded);
    }

    //stuff that should be done on load
    function windowLoaded() {
        //fix Iframe height
        const Iframe = document.querySelector("Iframe");
        adjustFrameHeight(Iframe);


        //nav content container for population
        const navContentContainer = document.querySelector('.nav-content-container');
        populateNavbar(jsonData, filters, navContentContainer);

        //nav for scroll away
        const nav = document.querySelector('nav');
        const originalNavWidth = nav.offsetWidth

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
                    window.requestAnimationFrame(scrollNavBar.bind(nav, true, originalNavWidth))
                } else if (!clickAwayMiddle.mOnScreen) {
                    clickAwayMiddle.mOnScreen = !clickAwayMiddle.mOnScreen
                    window.requestAnimationFrame(scrollNavBar.bind(nav, false, originalNavWidth));
                } else {
                    alert('error occured line 164')
                }

            }

        );
    }
    console.log(window.onload)
}


//Is scroll Out of screen (not in ) //!move to utility
function scrollNavBar(isScrollOut, originalWidth, timestamp, currentCall) {



    if (!currentCall) {
        currentCall = 0;
    }

    if (isScrollOut) {
        if (this.offsetWidth > 2.5) {
            this.style.width = utility.sideBarWidth(originalWidth, currentCall, isScrollOut) + "px";
            window.requestAnimationFrame(scrollNavBar.bind(this, isScrollOut, originalWidth, timestamp, currentCall + 2))
        } else { // if no more animation, just make sure we are where we wanna be
            this.style.width = "0px"
        }
    } else {
        if (this.offsetWidth < originalWidth - 1.5) {
            this.style.width = utility.sideBarWidth(originalWidth, currentCall, isScrollOut) + "px";
            window.requestAnimationFrame(scrollNavBar.bind(this, isScrollOut, originalWidth, timestamp, currentCall + 2))
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
const populateNavbar = async (jsonData, filter = [], navContentContainer) => {
    // JSON loaded
    //then, empty the navbar. we onload so we can load the JSON before the entire file loads
    navContentContainer.innerHTML = "";

    let putUpArticles = false; //we need this know if we should place the empty messege
    if (jsonData.posts.length > 0) {

        for (let i = 0; i < jsonData.posts.length; i++) {
            //!check the filter
            if (utility.tagsMatch(jsonData.posts[i].tags, filter)) {
                putUpArticles = true
                navContentContainer.appendChild(utility.createNavButtonHTML(jsonData.posts[i].title, jsonData.posts[i].author, jsonData.posts[i].date, jsonData.posts[i].id))
            }

        }
    } else if (!putUpArticles) {
        const noPostsP = document.createElement("p");
        noPostsP.className = "no-posts-p "
        noPostsP.innerText = "No posts avalabile with the applied filters. Try different filters!"
        navContentContainer.appendChild(noPostsP)
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
    const rawJson = await fetch('config.json');
    /*const reader = rawJson.arrayBuffer.body.getReader()
    console.log(reader);*/
    const jsonData = await rawJson.json();
    return jsonData
}


main();
//!always handle events last