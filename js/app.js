const directory = document.querySelector('.directory');

//------------------------------
//FETCH REQUESTS
//------------------------------

fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateEmployee(data.results[0]))

//------------------------------
//HELPER FUNCTIONS
//------------------------------

function generateEmployee(data) {
    const html = `
        <li class='directory__item'>
            <img class='avatar' src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
            <div class='employee-data'>
                <p class='name'>${data.name.first} ${data.name.last}</p>
                <p class='email'>${data.email}</p>
                <p class='location'>${data.location.city}</p>
            </div>
        </li>
    `;
    directory.innerHTML = html;
}