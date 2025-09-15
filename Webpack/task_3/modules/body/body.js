import $ from 'jquery';
import _ from 'lodash';
import './body.css';

let count = 0;
function updateCounter() {
  count++;
  $('#count').text(`${count} clicks on the button`);
}

$(document).ready(() => {
  $('body').append(`
    <button id="btn">Click me</button>
    <p id="count">0</p>
  `);

  const debouncedUpdateCounter = _.debounce(updateCounter, 500);
  $('#btn').click(debouncedUpdateCounter);
});
