/**
?What should be done? 
- compile all docs
- add new docs to JSON
- prompt the user to input in measing details with autocomplete, particularly on tags. 
 */


//!This is the main compilation script that runs the application 


const {
    execSync
} = require('child_process');

const output = execSync('npm run docs', {
    encoding: 'utf-8'
});

console.log('The output is:');
console.log(output);

var fs = require('fs');
fs.writeFile("test.json", JSON.stringify({
    matan: "is cool"
}), function (err) {
    if (err) {
        console.log(err);
    }
});

//!https://www.npmjs.com/package/edit-json-file */