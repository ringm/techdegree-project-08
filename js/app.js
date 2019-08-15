//------------------------------
//VARIABLES
//------------------------------

const directory = document.querySelector('.directory');
const employee = document.querySelector('.directory__item');

//------------------------------
//FETCH REQUESTS
//------------------------------

fetch('https://randomuser.me/api/?results=12&&nat=us,ca,gb')
    .then(response => response.json())
    .then(data => data.results)
    .then(results => results.forEach(result => generateEmployee(result)))

//------------------------------
//HELPER FUNCTIONS
//------------------------------

function generateEmployee(data) {
    const li = document.createElement("li");
    li.className = "directory__item";
    const html = `
      <img class='avatar' src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
      <div class='employee-data'>
          <p class='name'>${data.name.first} ${data.name.last}</p>
          <p class='email'>${data.email}</p>
          <p class='location'>${data.location.city}</p>
      </div>
    `;
    li.innerHTML = html;
    directory.appendChild(li);
}

//------------------------------
//EVENT LISTENERS
//------------------------------

