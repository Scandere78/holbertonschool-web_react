import $ from 'jquery';
import _ from 'lodash';
import '../css/main.css';   // Import du CSS pour que Webpack l’intègre

let count = 0;

// Fonction de mise à jour du compteur
function updateCounter() {
  count++;
  $('#count').text(`${count} clicks on the button`);
}

$(document).ready(() => {
  // Ajout des éléments dans le DOM
  $('body').append(`
    <div id="logo"></div>
    <p>Holberton Dashboard</p>
    <p>Dashboard data for the students</p>
    <button>Click here to get started</button>
    <p id='count'></p>
    <p>Copyright - Holberton School</p>
  `);

  // Débounce pour éviter le spam de clics trop rapides
  const debouncedUpdateCounter = _.debounce(updateCounter, 500);
  $('button').click(debouncedUpdateCounter);
});
