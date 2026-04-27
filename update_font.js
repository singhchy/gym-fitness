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

    // Search for the 3 inserted lines and replace with styling
    const target1 = '<p>Want this theme:</p>';
    const target2 = '<p><a href=\"tel:+9779860213414\">Call +977 9860213414</a></p>';
    const target3 = '<p>Email: singhchy@gmail.com</p>';

    const replacement1 = '<p style=\"font-size: 1.125rem;\">Want this theme:</p>';
    const replacement2 = '<p style=\"font-size: 1.125rem;\"><a href=\"tel:+9779860213414\">Call +977 9860213414</a></p>';
    const replacement3 = '<p style=\"font-size: 1.125rem;\">Email: singhchy@gmail.com</p>';

    content = content.replace(new RegExp(target1, 'g'), replacement1);
    content = content.replace(new RegExp(target2.replace(/\+/g, '\\+').replace(/\//g, '\\/'), 'g'), replacement2);
    content = content.replace(new RegExp(target3, 'g'), replacement3);

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated font size in: ' + file);
    }
});
console.log('Done.');
