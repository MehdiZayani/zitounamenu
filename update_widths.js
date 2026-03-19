const fs = require('fs');

const file = 'app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.split("w-[85%]").join("w-[80%]");

fs.writeFileSync(file, content);
console.log("Done");
