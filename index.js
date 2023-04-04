const fs = require(`fs`);
const inquirer = require(`inquirer`);

const questions = [{
    type:'input',
    name:'logoName',
    message: 'Enter logo initials (3 characters maximum)',
    maxLength:3
},
{
    type: 'input',
    name: 'textColor',
    message:'What color would you like the text on the logo to be? (hexadecimals accepted as well)'
},
{
    type: 'list',
    name: 'shape',
    message:'Choose a shape',
    choices: [
        'Circle',
        'Triangle',
        'Square'
    ]
},{
    type: 'input',
    name:'shapeColor',
    message:'Choose a shape color'
}];
function GenerateSVG(data) {
let shapeParam = data.shape;
    switch(shapeParam){
        case 'Circle':
            shapeParam = `<circle cx="50" cy="50" r="40" fill="${data.shapeColor}" />`;
            break;
        case 'Triangle':
            shapeParam = `<polygon points="50 15, 100 100, 0 100" fill="${data.shapeColor}" />`;
            break;
        case 'Square':
            shapeParam = `<rect width ="100" height="100" fill="${data.shapeColor}" />`;
            break;
    }

    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="391" height="391" viewBox="-70.5 -70.5 391 391" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect fill="#fff" stroke="#000" x="-70" y="-70" width="390" height="390"/>
<g opacity="0.8">
    ${shapeParam}
    <text x="32" y="50" text-anchor="middle" fill="white" font-size="30">Ayo?</text>
</g>
</svg>`;
}


function init() {
    inquirer.prompt(questions)

    .then(SVG =>{ fs.writeFile('logo.svg',GenerateSVG(SVG), err => {
        if(err) {
        console.error(err);
      }
      console.log("Generated logo.svg");
    })
    })
}

init();