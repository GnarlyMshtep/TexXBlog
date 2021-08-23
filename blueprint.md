# Blueprint

### Goal
Open-source LaTeX-based blogging application which is easaly embedable in any static sites, with particular aim at those hosted for free on [GitHub Pages](https://pages.github.com/). The application features a modern react interface and allows for sorting of posts by many author-determined catageories. We hope that this project will serve as a get-into Tex for some folks. This way, students, academics, and people at large can have slick-lookin' blogs, entirely for free!


## Specifics

### "Backend" 
One of our design goals is that no server will be necessery, so deployement will be free on GitHub. Users will upload .tex files in a specific, yet simple, file structure, update tags in JSON file, compile with a designated script, push to GitHub, and vwhalla! Their ideas are presented to the entire world. 

##### The File Structure

##### The JSON "Tags" file

##### The Script 

### Frontend
The page is comprised of a left side bar used for navigation, main content (blog) displayed in the main section of the page, and possible headers and footers to tie it all together. Normally, the sidebar contains a button which slides the filtering menu open, and below it vertically stacked boxes containing names and meta-info of posts. For reading convinience, the sidebar can be scrolled entirely away. When the "filter" button is pressed, the navigation is bar slides over the entire screen and a menue which allows users to filter (by date, time, tags, etc) the posts opens. Once the user makes a selction, they click confirm, the menu slides back and the filtered entries show. Perhaps, we may add the option for an about/home page for the blog.

### Customization
We may choose to add a file (JSON) that allows authors to have some simple stylistic customizations of their blogs (color scheme, logo, etc). 

## Possibilities for Further Improvement/Optimization
Could have backend features hosted by us such as reader comments, and raitings.  It could be cool have an option to sync with your overleaf library so it's more nicely visible. 