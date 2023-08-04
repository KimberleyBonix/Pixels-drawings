const app = {

    // VARIABLES STORAGES
    GRID_SIZE: 20,
    PIXEL_SIZE: 20,
    BRUSH_COLOR: "", 

    styles: [
        'rgb(0,0,0)',
        'rgb(153, 0, 0)', // rouge
        'rgb(255, 204, 0)',// jaune
        'rgb(51, 204, 51)', // vert
        'rgb(0, 89, 179)', // bleu
    ] ,

    formElement: document.querySelector('.configuration'),

    gridContainer: document.querySelector('.window--main'),
    gridElement: document.querySelector('.grid'),

    palleteElement: document.querySelector('.palette'),
    pickerElement: document.querySelector('.pickerContainer'),

    eraseElement: document.querySelector('.window--erase'),

    init: function() {
        app.generateGrid(app.GRID_SIZE, app.PIXEL_SIZE);
        app.generateForm();
        app.generatePalette();
        app.handleColor();

        app.BRUSH_COLOR = document.querySelector('.color').style.backgroundColor;

        app.eraseAll();
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
        grid.style.backgroundSize = app.PIXEL_SIZE * 2 + 'px';
    
        // Ajouter les pixels
        for (let i = 0; i < (numberOfPixel * numberOfPixel); i++) {
            const pixel = app.elementFactory('div', {"class": "pixel"}, grid);
    
            pixel.style.width = `${sizeOfPixel}px`
        }
    
        grid.addEventListener('click', app.applyColor)
    },

    // --------------------------------------
    // GENERATION DU FORMULAIRE
    generateForm: function() {

        app.elementFactory('input', {
            "type" : "number",
            "class": "input-configuration",
            "placeholder" : "Taille de la grille"
        }, app.formElement);
        
        app.elementFactory('input', {
            "type" : "number",
            "class": "input-configuration",
            "placeholder" : "Taille des pixels"
        }, app.formElement);
        
        app.elementFactory('input', {
            "type" : "submit",
            "class": "btn btn-generateGrid",
            "value" : "Générer"
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
        event.target.classList.add('selected');               // On rajoute une class "selected" à la couleur choisi
        
    },

    // --------------------------------------
    // AJOUT DE COULEUR A LA PALETTE
    handleColor: function () {
        app.elementFactory('input', {"type": "color", "class": "colorPicker"}, app.pickerElement);
        app.elementFactory('input', {"type": "button", "class": "colorPicker-add btn", "value": "+"}, app.pickerElement);

        let newColor; 

        document.querySelector('.colorPicker').addEventListener('input', function(event){
            newColor = event.target.value;
            app.styles.push(newColor);
            
        });

        document.querySelector('.colorPicker-add').addEventListener('click', function(e){
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
            "class": "erase-grid btn",
            "type": "button", 
            "value": "Tout effacer"
        },
        app.eraseElement);

        document.querySelector('.erase-grid').addEventListener('click', function(event){
            document.querySelectorAll('.pixel').forEach(pixel => {
                app.removeColor(pixel);
            })
        })
    }

} 


app.init();
