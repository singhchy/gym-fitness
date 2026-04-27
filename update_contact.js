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

const newContent = `Want this theme:<br/>
<a href="tel:+9779860213414">Calla +977 9860213414</a><br/>
Email: singhchy@gmail.com`;

const newContentP = `<p>Want this theme:</p>
<p><a href="tel:+9779860213414">Calla +977 9860213414</a></p>
<p>Email: singhchy@gmail.com</p>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Pattern 1: <a href="tel:+9779860213414">Call +977 9860213414</a>\s*<p>Email: singhchy@gmail.com</p>
    content = content.replace(/<a href="tel:\+9779860213414">Call \+977 9860213414<\/a>\s*<p>Email: singhchy@gmail\.com<\/p>/g, newContentP);

    // Pattern 2: <p><a href="tel:+9779860213414">Call +977 9860213414</a></p>\s*<p>Email: singhchy@gmail.com</p>
    content = content.replace(/<p>\s*<a href="tel:\+9779860213414">Call \+977 9860213414<\/a>\s*<\/p>\s*<p>Email: singhchy@gmail\.com<\/p>/g, newContentP);

    // Pattern 3: <p>Call +977 9860213414<br />Email: singhchy@gmail.com</p>
    content = content.replace(/<p>\s*Call \+977 9860213414\s*<br\s*\/>\s*Email: singhchy@gmail\.com\s*<\/p>/g, '<p>' + newContent + '</p>');

    // Pattern 4: <a href="tel:+9779860213414">Call +977 9860213414</a>\s*<br />Email: singhchy@gmail.com
    content = content.replace(/<a href="tel:\+9779860213414">Call \+977 9860213414<\/a>[\s\n\r]*<br\s*\/>\s*Email: singhchy@gmail\.com/g, newContent);

    // Pattern 5 (like in v4.html line 1415): <a href="tel:+9779860213414">Call +977 9860213414</a\s*><br />Email: singhchy@gmail.com
    content = content.replace(/<a href="tel:\+9779860213414">Call \+977 9860213414<\/a[\s\n\r]*>[\s\n\r]*<br\s*\/>\s*Email: singhchy@gmail\.com/g, newContent);

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated: ' + file);
    }
});
console.log('Done.');
