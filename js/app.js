// ton code ici

// Valeur de la grille
let gridSize = 8;

// Fonction qui génère la grille, sa taille et le nombre de case
function gridGenerator(numberOfUnit) {

    // Génère la grille
    const grid = document.createElement('div');
    grid.classList.add('grid');
    document.querySelector('.main').appendChild(grid);

    // Génère la taille de la grille
    let gridSize = numberOfUnit * 50;
    grid.style.width = `${gridSize}px`;

    // Boucle qui permet de remplir la grille de case
    for (let i = 0; i < numberOfUnit * numberOfUnit; i++) {
        const gridUnit = document.createElement('div');
        gridUnit.classList.add('grid-unit');

        grid.appendChild(gridUnit);
    }
}


gridGenerator(gridSize);


// ---------------------------

const gridUnits = document.querySelectorAll('.grid-unit');


function applyColor(event) {
    document.querySelector('.grid-unit').style.backgroundColor = "BADA55";
} 

for (let i = 0; i < gridUnits.length; i++) {
    gridUnits[i].addEventListener('toggle', applyColor);
}




