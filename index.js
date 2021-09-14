/**
?What should be done? 
- compile all docs
- add new docs to JSON
- prompt the user to input in measing details with autocomplete, particularly on tags. 
//!for right now, just comile everything, but later we can save a date of the last compilation and the files compiled to compile only the right files/
//!create folder for new files/ some hack-around
Packages: 
commander
ommelete
inquirer
 */
const {
    execSync
} = require('child_process');
const editJsonFile = require("edit-json-file");
const inquirer = require('inquirer')
//!https://github.com/mokkabonna/inquirer-autocomplete-prompt

const main = async () => {
    const output = execSync('npm run docs', {
        encoding: 'utf-8'
    });
    let config = editJsonFile(`${__dirname}/config.json`);
    let compiledFiles = editJsonFile(`${__dirname}/_docs/contents.json`);

    //?in the case config is empty and this is teh first intialization 
    if (config.data === {}) {
        console.log("First time setting up? Awesome! Let's set upEven though we will set up right now, you can change everything later, so don't worry!");
        inquirer
            .prompt([
                "What is the name of your blog?",
                "Sounds fascinating! Add navigation tags of this structure Matan's Home Page#https://matanshtepel.com/>Ishaan's Home Page#https://ishaandham.com/> "
            ])
            .then((answers) => {
                console.log(answers);
            })
            .catch((error) => {
                if (error.isTtyError) {
                    console.error('Prompt couldn\'t be rendered in the current environment')
                } else {
                    console.error('Something else went wrong, plese try again!')
                }
            });

    }


    let objToAppend = {}
    console.log(compiledFiles.data.contents.length);
    for (let i = config.data.posts.length; i < compiledFiles.data.contents.length - config.data.posts.length; i++) {
        //first add what you need, then ask the user questions 
        let objToAppend = {};
        objToAppend.filename = compiledFiles.data.contents[i].url;
        objToAppend.id = compiledFiles.data.contents[i].id;
        objToAppend.date.UTCDate = Date.now();
        objToAppend.date.dateString = Date();
        objToAppend.date.monthDayYear = [date.getMonth(), date.getDate(), date.getFullYear()];
        inquirer
            .prompt([
                `What is the title of ${objToAppend.filename}?`,
                "Who is the author?",

            ])
            .then((answers) => {
                console.log(answers);
            })
            .catch((error) => {
                if (error.isTtyError) {
                    console.error('Prompt couldn\'t be rendered in the current environment')
                } else {
                    console.error('Something else went wrong, plese try again!')
                }
            });

        //config.append('posts', objToAppend);


    }
    /*
    inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
    inquirer.prompt([{
        type: 'autocomplete',
        name: 'from',
        message: 'Select a state to travel from',
        source: function (answersSoFar, input) {
            return myApi.searchStates(input);
        }
    }]).then(function (answers) {
        //etc
    });*/


    console.log("Remember, you can always make any changes @ config.json! \n Happy blogging 🤗😎");
}



main();

//!https://www.npmjs.com/package/edit-json-file */
/*
const {
    Command
} = require('commander');
const program = new Command();

program
    .version('0.0.1')
    .option('-c, --config <path>', 'set config path', './deploy.conf');

program
    .command('setup [env]')
    .description('run setup commands for all envs')
    .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
    .action((env, options) => {
        env = env || 'all';
        console.log('read config from %s', program.opts().config);
        console.log('setup for %s env(s) with %s mode', env, options.setup_mode);
    });

program
    .command('exec <script>')
    .alias('ex')
    .description('execute the given remote cmd')
    .option('-e, --exec_mode <mode>', 'Which exec mode to use', 'fast')
    .action((script, options) => {
        console.log('read config from %s', program.opts().config);
        console.log('exec "%s" using %s mode and config %s', script, options.exec_mode, program.opts().config);
    }).addHelpText('after', `
Examples:
    $ deploy exec sequential
$ deploy exec async `);

program.parse(process.argv);*/