const app = {

    // VARIABLES STORAGES
    GRID_SIZE: 8,
    PIXEL_SIZE: 50,
    BRUSH_COLOR: "pixel--black", 

    styles: [
        'default',
        'black',
        'red',
        'yellow',
        'green',
        'blue',
    ] ,

    gridContainer: document.querySelector('#invader'),
    formElement: document.querySelector('.configuration'),
    palleteElement: document.querySelector('.palette'),
    gridElement: document.querySelector('.grid'),

    init: function() {
        app.generateGrid(app.GRID_SIZE, app.PIXEL_SIZE);
        app.generateForm();
        app.generatePalette();
    },

    // --------------------------------------
    // Petite usine à créé des éléments
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
        const grid = app.elementFactory('div', {"class": "grid"}, app.gridContainer);
    
        // Gère la taille de la grille
        app.GRID_SIZE = numberOfPixel * sizeOfPixel;
        grid.style.width = `${app.GRID_SIZE}px`;
    
        // Ajouter les pixels
        for (let i = 0; i < (numberOfPixel * numberOfPixel); i++) {
            const pixel = app.elementFactory('div', {"class": "pixel pixel--default"}, grid);
    
            pixel.style.width = `${sizeOfPixel}px`
        }
    
        grid.addEventListener('click', app.applyColor)
    },

    // --------------------------------------
    // GENERATION DU FORMULAIRE
    generateForm: function() {

        app.elementFactory('input', {
            "type" : "number",
            "class": "input-gridSize",
            "placeholder" : "Taille de la grille"
        }, app.formElement);
        
        app.elementFactory('input', {
            "type" : "number",
            "class": "input-pixelSize",
            "placeholder" : "Taille des pixels"
        }, app.formElement);
        
        app.elementFactory('input', {
            "type" : "submit",
            "class": "button-generateGrid",
            "value" : "Générer une nouvelle grille"
        }, app.formElement);

        app.formElement.addEventListener('submit', app.handleSubmit)
    },


    handleSubmit: function(event) {
        event.preventDefault();
        
        app.GRID_SIZE = Number(event.target[0].value);            // event.target.childNodes[0].value
        app.PIXEL_SIZE = Number(event.target[1].value);

        const areYouSure = confirm("Attention, votre grille va être supprimée. Êtes-vous sûr.e de vouloir une nouvelle grille?");

        if (areYouSure === true) {
            document.querySelector('.grid').remove();             // supprime la grille actuelle
            app.generateGrid(app.GRID_SIZE, app.PIXEL_SIZE);      // génère une nouvelle
        }
    },

    // --------------------------------------
    // GENERATION DE LA PALETTE
    generatePalette: function() {
                                                                  
        app.styles.forEach(style => {                             // Génère un bouton pour chaque item dans le tableau app.stleys
            app.elementFactory('button', {"class": `color pixel--${style}`}, app.palleteElement);
            
        });

        app.palleteElement.addEventListener('click', function(event){
            app.BRUSH_COLOR = event.target.classList[1];          // Fonction anonyme pour handleColor

            document.querySelectorAll('.color').forEach(color => {
                color.classList.remove('selected')                
            });
            event.target.classList.add('selected');               // On rajoute une class "selected" à la couleur choisi
            
        })
    },

    removeColor: function(targetEl){
        app.styles.forEach(style => {
            targetEl.classList.remove(`pixel--${style}`)
        })
    },
    
    // ---------------------------
    // Atelier des peintres
    applyColor: function(event) {
        let targetPixel = event.target;

        if (targetPixel.classList.contains(app.BRUSH_COLOR)) {
            app.removeColor(targetPixel);                          // On retire les couleurs déjà appliqué 
        } else {
            app.removeColor(targetPixel);                          // Dans le cas où on appliquerait une nouvelle couleur
            targetPixel.classList.add(app.BRUSH_COLOR);            // Application de la nouvelle couleur sélectionnée
        }
    
        
    } 

} 


app.init();




/* 


// VARIABLES STORAGES

let GRID_SIZE = 8;                                             // taille de la grille
let PIXEL_SIZE = 50;                                           // taille des pixels
let BRUSH_COLOR = "black";                                     // Couleur du pinceau

const gridContainer = document.querySelector('#invader');
const formElement = document.querySelector('.configuration');
const palleteElement = document.querySelector('.palette');


// --------------------------------------
// PROCESSUS
//

generateGrid(GRID_SIZE, PIXEL_SIZE);
generateForm();


// --------------------------------------
// GENERATION DE LA GRILLE
// 

function generateGrid(numberOfPixel, sizeOfPixel) {

    // Création de la grille
    const grid = elementFactory('div', {"class": "grid"}, gridContainer);

    // Gère la taille de la grille
    GRID_SIZE = numberOfPixel * sizeOfPixel;
    grid.style.width = `${GRID_SIZE}px`;

    // Ajouter les pixels
    for (let i = 0; i < (numberOfPixel * numberOfPixel); i++) {
        const pixel = elementFactory('div', {"class": "pixel"}, grid);

        pixel.style.width = `${sizeOfPixel}px`
    }

    grid.addEventListener('click', applyColor)
}


// --------------------------------------
// GENERATION DU FORMULAIRE
// 

function generateForm() {

    elementFactory('input', {
        "type" : "number",
        "class": "input-GRID_SIZE",
        "placeholder" : "Taille de la grille"
    }, formElement);
    
    elementFactory('input', {
        "type" : "number",
        "class": "input-PIXEL_SIZE",
        "placeholder" : "Taille des pixels"
    }, formElement);
    
    elementFactory('input', {
        "type" : "submit",
        "class": "button-generateGrid",
        "value" : "Générer une nouvelle grille"
    }, formElement);

    formElement.addEventListener('submit', handleSubmit)
}


function handleSubmit(event) {
    event.preventDefault();
    
    GRID_SIZE = Number(event.target[0].value);            // event.target.childNodes[0].value
    PIXEL_SIZE = Number(event.target[1].value);

    const areYouSure = confirm("Attention, votre grille va être supprimée. Êtes-vous sûr.e de vouloir une nouvelle grille?");

    if (areYouSure === true) {
        document.querySelector('.grid').remove();         // supprime la grille actuelle
        generateGrid(GRID_SIZE, PIXEL_SIZE);              // génère une nouvelle
    }
}

// ---------------------------
// Atelier des peintres
// 

// Colorier une case
function applyColor(event) {
    let targetPixel = event.target;

    if(targetPixel.classList.contains('pixel--selected')) {
        targetPixel.classList.remove('pixel--selected')
    } else {
        targetPixel.classList.add('pixel--selected')
    }

} 


// ------
// Petite usine à créé des éléments
// --
function elementFactory(type, attributes, parent) {
    let el = document.createElement(type);

    for (let key in attributes) {
        el.setAttribute(key, attributes[key]);
    } 

    parent.appendChild(el)

    return el;
}


// --------------------------

const colors = [
    {
        "class": "paint blueColor",
        "type": "button",
        "value" : "#1D1075"
    },
    {
        "class": "paint redColor",
        "type": "button",
        "value" : "#B00B1E"
    },
    {
        "class": "paint greenColor",
        "type": "button",
        "value":"#2A960D"
    }
];

for (let color of colors) {
    color = elementFactory('input', color, palleteElement);
}


palleteElement.addEventListener('click', getColor)

function getColor(event) {
    console.log(event);
    BRUSH_COLOR = event.target.value;
}







 */