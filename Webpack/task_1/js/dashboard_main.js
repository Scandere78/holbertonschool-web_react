const $ = require('jquery');
const _ = require('lodash');


// Ajouter les éléments à la page
$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');
$('body').append('<button id="start">Click here to get started</button>');
$('body').append("<p id='count'></p>");
$('body').append('<p>Copyright - Holberton School</p>');

// Initialiser le compteur
let count = 0;

// Fonction pour mettre à jour le compteur
function updateCounter() {
    count ++;
    $('#count').text(`${count} cliks on the button`);
}

;// Lier le bouton avec debounce
$('#start').on('click', _.debounce(updateCounter, 500));