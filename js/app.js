const app = {

    // VARIABLES STORAGES
    CANVAS_SIZE: 20,
    PIXEL_SIZE: 20,
    BRUSH_COLOR: "", 

    styles: [
        'rgb(0,0,0)',
        'rgb(153, 0, 0)', // red
        'rgb(255, 204, 0)',// yellow
        'rgb(51, 204, 51)', // green
        'rgb(0, 89, 179)', // blue
    ] ,

    formElement: document.querySelector('.configuration__form'),

    canvasContainer: document.querySelector('.main'),
    canvasElement: document.querySelector('.canvas'),

    palleteElement: document.querySelector('.brushes'),
    pickerElement: document.querySelector('.colorpicker'),

    eraseElement: document.querySelector('.erase'),

    init: function() {
        app.generateGrid(app.CANVAS_SIZE, app.PIXEL_SIZE);
        app.generateForm();
        app.generatePalette();
        app.handleColor();

        app.BRUSH_COLOR = document.querySelector('.color').style.backgroundColor;

        app.eraseAll();
    },

    // --------------------------------------
    // Element factory
    elementFactory: function(type, attributes, parent) {
        let el = document.createElement(type);

        for (let key in attributes) {
            el.setAttribute(key, attributes[key]);
        } 

        parent.appendChild(el)

        return el;
    },

    // --------------------------------------
    // GENERATION DE LA GRILLE
    generateGrid: function(numberOfPixel, sizeOfPixel) {

        // Création de la grille
        const canvas = app.elementFactory('div', {"class": "canvas"}, app.canvasContainer);
    
        // Gère la taille de la grille
        app.CANVAS_SIZE = numberOfPixel * sizeOfPixel;
        canvas.style.width = `${app.CANVAS_SIZE}px`;
        canvas.style.backgroundSize = app.PIXEL_SIZE * 2 + 'px';
    
        // Ajouter les pixels
        for (let i = 0; i < (numberOfPixel * numberOfPixel); i++) {
            const pixel = app.elementFactory('div', {"class": "pixel"}, canvas);
    
            pixel.style.width = `${sizeOfPixel}px`
        }
    
        canvas.addEventListener('click', app.applyColor)
    },

    // --------------------------------------
    // Generate form for the canvas customization
    generateForm: function() {

        app.elementFactory('input', {
            "type" : "number",
            "class": "configuration__form--input",
            "placeholder" : "Canvas size"
        }, app.formElement);
        
        app.elementFactory('input', {
            "type" : "number",
            "class": "configuration__form--input",
            "placeholder" : "Pixels size"
        }, app.formElement);
        
        app.elementFactory('input', {
            "type" : "submit",
            "class": "btn configuration__form--btn",
            "value" : "Generate"
        }, app.formElement);

        app.formElement.addEventListener('submit', app.handleSubmit)
    },

    handleSubmit: function(event) {
        event.preventDefault();
        
        app.CANVAS_SIZE = Number(event.target[0].value);            // event.target.childNodes[0].value
        app.PIXEL_SIZE = Number(event.target[1].value);

        const areYouSure = confirm("Wait! Your canvas is about to be erase. Do you want a new canvas?");

        if (areYouSure === true) {
            document.querySelector('.canvas').remove();             // delete the active canvas
            app.generateGrid(app.CANVAS_SIZE, app.PIXEL_SIZE);      // generate a new one
        }
    },

    // --------------------------------------
    // Generate palette
    generatePalette: function() {                        
        app.styles.forEach(style => {                             // Generate a button for each style
            app.elementFactory('button', {
                "class": "color",
                "style": "background-color: " + style
            }, app.palleteElement);
        });

        document.querySelector('.color').classList.add('selected');

        app.palleteElement.addEventListener('click', app.selectColor)
    },

    selectColor: function (event){
        app.BRUSH_COLOR = event.target.style.backgroundColor;

        document.querySelectorAll('.color').forEach(color => {
            color.classList.remove('selected')                
        });
        event.target.classList.add('selected');               // Add "selected" to the clicked element
        
    },

    // --------------------------------------
    // Add a new color to the palette
    handleColor: function () {
        app.elementFactory('input', {"type": "color", "class": "colorpicker__input"}, app.pickerElement);
        app.elementFactory('input', {"type": "button", "class": "colorpicker__btn btn", "value": "+"}, app.pickerElement);

        let newColor; 

        document.querySelector('.colorpicker').addEventListener('input', function(event){
            newColor = event.target.value;
            app.styles.push(newColor);
            
        });

        document.querySelector('.colorpicker__btn').addEventListener('click', function(e){
            app.addNewColor(newColor);
        })
    },

    addNewColor: function(color) {
        app.elementFactory('button', {
            "class": "color",
            "style": "background-color: " + color
        }, 
        app.palleteElement);
    },
    
    
    // ---------------------------
    // Atelier des peintres
    applyColor: function(event) {
        let targetPixel = event.target;
    
        // Check if the pixel has the background color set
        if (targetPixel.style.backgroundColor === app.BRUSH_COLOR) {
            app.removeColor(targetPixel);
        } 
        else {
            // Apply the brush color to the background of the target pixel
            targetPixel.style.backgroundColor = app.BRUSH_COLOR;
        }
    },

    removeColor(targetElement) {
        targetElement.style.backgroundColor = "";
    },

    // ---------------------------
    // RETRY
    eraseAll: function() {
        app.elementFactory('input', {
            "class": "erase__btn btn",
            "type": "button", 
            "value": "Erase all"
        },
        app.eraseElement);

        document.querySelector('.erase__btn').addEventListener('click', function(event){
            document.querySelectorAll('.pixel').forEach(pixel => {
                app.removeColor(pixel);
            })
        })
    }

} 


app.init();
