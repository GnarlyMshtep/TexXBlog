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
const inquirer = require('inquirer');
const {
    config
} = require('process');
//!https://github.com/mokkabonna/inquirer-autocomplete-prompt


const main = async () => {
            const output = execSync('npm run docs', {
                encoding: 'utf-8'
            });
            let rawConfigJson = await fetch(`${__dirname}/config.json`);
            let rawContents = (`${__dirname}/_docs/contents.json`);
            

            //!in the case config is empty and this is teh first intialization 
            if (config.data.empty === true) {


                console.log(`First time compiling your xBlog? Awesome! We're so happy to have you!\n
                    xBlog is an easy to use, github pages oriented blog `);
                inquirer
                    .prompt([{

                        ])
                        .then((answers) => {
                            console.log(answers);
                        })
                        .catch((error) => {
                            if (error.isTtyError) {
                                console.error('Prompt couldn\'t be rendered in the current environment')
                            } else {
                                console.error(error)
                            }
                        });

                    }
                //! this should also happen on every compilation and is the compile all, later I'll add compile new
                let objToAppend = {}

                //for (let i = config.data.posts.length; i < compiledFiles.data.contents.length - config.data.posts.length; i++) {
                if (true) { //!later replace this with the if-recompile-all
                    //cycle through every blog post 
                    for (let i = 0; i < compiledFilesJsonFile.data.contents.length; i++) {

                        //here we add the non-user-decided fields, gurenteed that we don't already have them
                        objToAppend.filename = compiledFiles.data.contents[i].url;
                        objToAppend.id = compiledFiles.data.contents[i].id;
                        objToAppend.date.UTCDate = (configFile.data.contents[i].date.UTCDate ? configFile.data.contents[i].date.UTCDate : Date.now());
                        objToAppend.date.dateString = (configFile.data.contents[i].date.dateString ? configFile.data.contents[i].date.dateString : Date);
                        objToAppend.date.monthDayYear = (configFile.data.contents[i].date.monthDayYear ? configFile.data.contents[i].date.monthDayYear : [date.getMonth(), date.getDate(), date.getFullYear()]);
                        
                        obj



                        //config.append('posts', objToAppend);

                    }
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