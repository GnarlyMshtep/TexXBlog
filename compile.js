//constants
const firstTimeMessage = `xBlog is a fully frontend, GitHub-pages-oriented, minimum set-up necessary, blogging utility.
This script will ask you various set-up questions you may have not fully decided, but do not worry, everything can be changed!
After the compilation is needed, your fascinating writing will be prepered to be displayed on the interenet!
To learn more visit __repo_link__ or check out the tutorial videos at __Vidlink__`

const thankYouMessage = "Thank you very much for using xBlog! Please..."

const trimShortDesLength = 150
//dependencies


const {
    execSync
} = require('child_process');
const inquirer = require('inquirer');
const fs = require("fs");

const main = async () => {
    // later we want to add the option to compile only some files
    const config = require('./config.json'); //! what if no config

    if (config === {} || config.empty) { // first time set up -- will be annoying to test every time
        config.posts = [] //we will need to make this array to append into it

        console.log(firstTimeMessage); //hello messge

        await inquirer //ask user for basic meta info
            .prompt([{
                    type: 'input',
                    name: 'blogName',
                    message: "First and foremost, what is the name of your blog?",
                },
                {
                    type: 'input',
                    name: 'blogDescription',
                    message: 'For us and for all your future readers, please give a one line description of your blog/site!'
                }
                /*{type:'list', 
                message:'Wow! That sounds fascinatingly lit! \n at the top of the page, there will be navlinks, input them'}*/ //! will want to add navs, to confusing for start

            ])
            .then((answers) => {
                config.metaInfo = {
                    siteTitle: answers.blogName,
                    shortDescription: answers.blogDescription.length > trimShortDesLength ?
                        answers.blogDescription.substr(0, trimShortDesLength) + "..." : answers.blogDescription, //trim for way-too-longs
                    navLinks: []
                }
            })
            .catch((error) => {
                if (error.isTtyError) {
                    console.error(error, 'prompt couldn\'t be rendered in current env');
                } else {
                    console.error(error);
                }
            });


        config.empty = false;
    }

    await compileAll(config);


    //console.log(thankYouMessage);
}

const compileAll = async (config) => {
    /*
        I'm in a bit of a predicament, because there a many ways to optimize that not all files are gone through but I'm scared the user 
        will make some change (to, let's say filename), and I won't change it, and everythign will screw up. So I will go through everything, one by one.
    */
    const output = execSync('npm run docs', {
        encoding: 'utf-8'
    });
    let compiledContents = require('./_docs/contents.json');
    compiledContents = compiledContents.contents;
    //could .map to get rid of all the unecessey fields, but that may even be less efficient

    const date = new Date(); //? We will use the same date for all files compiled in the same batch

    for (let i = 0; i < compiledContents.length; i++) {
        //get proper md file. we will need it's meta info
        let currentPostText = (fs.readFileSync(`./docs/${compiledContents[i].path}`));
        currentPostText = currentPostText.toString();

        let objToAppend = {}

        if (config.posts && config.posts[i]) { // what to do if we already have some post information
            objToAppend.filename = compiledContents[i].url;
            objToAppend.id = compiledContents[i].id;
            objToAppend.date = {}
            objToAppend.date.UTCDate = (config.posts[i].date.UTCDate ? config.posts[i].date.UTCDate : Date.now());
            objToAppend.date.dateString = (config.posts[i].date.dateString ? config.posts[i].date.dateString : Date);
            objToAppend.date.monthDayYear = (config.posts[i].date.monthDayYear ? config.posts[i].date.monthDayYear : [date.getMonth(), date.getDate(), date.getFullYear()]);

        } else { //we have to add the post from 0
            objToAppend.filename = compiledContents[i].url;
            objToAppend.id = compiledContents[i].id;
            objToAppend.date = {}
            objToAppend.date.UTCDate = date.getUTCDate();
            objToAppend.date.dateString = date.toString();
            objToAppend.date.monthDayYear = [date.getMonth(), date.getDate(), date.getFullYear()];
        }
        //add the user-decided meta stuff
        try {
            const postMetaInfo = await JSON.parse(currentPostText.substring(currentPostText.indexOf('{'), currentPostText.indexOf('}') + 1)) //cut out the JSON_text meta information
            objToAppend.title = postMetaInfo.title;
            objToAppend.author = postMetaInfo.author;
            objToAppend.tags = postMetaInfo.tags;

        } catch (error) {
            console.error(error);
            console.error('it is likely that the meta information for ' + objToAppend.filename + 'has not been properly formatted, please look at our example @ exampleFile and try again!');
            objToAppend.title = "none properly added"
            objToAppend.author = "Sry, I didn't seem to catch yo name!"
            objToAppend.tags = ["NoTagsAdded"]
        }

        //add or replace the current data to config
        if (config.posts && config.posts[i]) {
            config.posts[i] = objToAppend;
        } else {
            config.posts.push(objToAppend);
        }

    }

    //console.log(config);
    //save to file
    fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.error(err);
        console.log('Succesfully compiled! Push to GitHub and allow your readers enjoy!');
    });

}

main();