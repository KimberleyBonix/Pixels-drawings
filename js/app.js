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
