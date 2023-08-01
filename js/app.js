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

        gridUnit.style.backgroundColor = "white";

        grid.appendChild(gridUnit);
    }
}


gridGenerator(gridSize);


// ---------------------------

/* const gridUnits = document.querySelectorAll('.grid-unit');

    for (let i = 0; i < gridUnits.length; i++) {
    gridUnits[i].addEventListener('click', applyColor);
} */

function applyColor(event) {
    console.log(event.target);

    if (event.target.style.backgroundColor === "white") {
        event.target.style.backgroundColor = "black"
    } else {
        event.target.style.backgroundColor = "white"
    }
} 

// Un seul évènement pour tous les carrés. On identifie l'enfant à travers le parent
document.querySelector('.main').addEventListener('click', applyColor);



