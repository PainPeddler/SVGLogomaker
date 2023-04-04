const fs = require(`fs`);
const inquirer = require(`inquirer`);
const questions = [{
    type:'input',
    name:'logoName',
    message: 'Enter logo initials (3 characters maximum)',
    validate: (input)=> {
        if (input.length > 3) {
            return 'Logo name must not exceed 3 characters';

        }
        return true;
    },
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
    class Circle {
        constructor(params,textCentering){
            this.params = `<circle cx="50" cy="50" r="40" fill="${data.shapeColor}" />`;
            this.textCentering = `x="50" y="60"`;
        }
    }
    class Triangle{
        constructor(params,textCentering){
            this.params = `<polygon points="50 15, 100 100, 0 100" fill="${data.shapeColor}" />`;
            this.textCentering = `x="50" y="80"`;
        }
    }
    class Square {
        constructor(params,textCentering){
            this.params = `<rect width ="100" height="100" fill="${data.shapeColor}" />`;
            this.textCentering =`x="50" y="60"`;
    }
    }

var shape = data.shape;

    switch(shape){
        case 'Circle':
            var drawnShape = new Circle;
            break;
        case 'Triangle':
            var drawnShape = new Triangle;
            break;
        case 'Square':
            var drawnShape = new Square;
            break;
    }

    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

${drawnShape.params}
<text ${drawnShape.textCentering} text-anchor="middle" fill="${data.textColor}" font-size="30">${data.logoName}</text>
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