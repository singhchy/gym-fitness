const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const files = walk('e:/projects/gym-fitness');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    content = content.replace(/Calla \+977/g, 'Call +977');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed typo in: ' + file);
    }
});
console.log('Done.');
