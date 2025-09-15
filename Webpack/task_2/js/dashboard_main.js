require('../css/main.css');

const app = document.createElement('div');
app.innerHTML = `
  <div id="logo"></div>
  <button id="btn">Click me</button>
  <span id="counter">0</span>
`;
document.body.appendChild(app);

let counter = 0;
document.getElementById('btn').addEventListener('click', () => {
  counter += 1;
  document.getElementById('counter').textContent = counter;
});
