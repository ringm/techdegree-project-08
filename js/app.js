//------------------------------
//VARIABLES
//------------------------------

const directory = document.querySelector('.directory');
const employeeList = document.querySelectorAll('.employee-list');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('.icon-close')
const employees = [];
//------------------------------
//FETCH REQUESTS
//------------------------------

fetch('https://randomuser.me/api/?results=12&&nat=us,ca,gb&inc=picture,name,email,location,phone,dob&noinfo')
    .then(response => response.json())
    .then(data => data.results)
    .then(results => results.forEach(result => generateEmployee(result)))
//------------------------------
//HELPER FUNCTIONS
//------------------------------

function generateEmployee(data) {
    
    const li = document.createElement("li");
    li.className = "directory__item";

    const basicInfo = `
      <img class='avatar' src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
      <div class='employee-basic-info'>
          <p class='employee-name capitalize'>${data.name.first} ${data.name.last}</p>
          <p class='employee-data'>${data.email}</p>
          <p class='employee-data capitalize'>${data.location.city}</p>
      </div>
    `;

    li.innerHTML = basicInfo;
    directory.appendChild(li);

    employees.push(data);
}

function generateEmployeeDetails(employee) {

    const div = document.createElement('div');
    div.className = 'window';
    const bday = new Date(employee[0].dob.date);

    const html = `
      <img class='icon-close' src="icons/icon-close.svg" alt="close-icon">
      <img class='avatar' src="${employee[0].picture.large}" alt="${employee[0].name.first} ${employee[0].name.last}">
      <div class='employee-basic-info'>
        <p class='employee-name capitalize'>${employee[0].name.first} ${employee[0].name.last}</p>
        <p class='employee-data'>${employee[0].email}</p>
        <p class='employee-data capitalize'>${employee[0].location.city}</p>
        <p class='employee-data'>${employee[0].phone}</p>
        <p class='employee-data capitalize'>${employee[0].location.street}, ${employee[0].location.postcode}</p>
        <p class='employee-data'>Birthday: ${bday.getDate()}/${bday.getMonth()+1}/${bday.getFullYear()}</p>
      </div>
    `;

    div.innerHTML = html;
    overlay.appendChild(div);
}

//------------------------------
//EVENT LISTENERS
//------------------------------

directory.addEventListener('click', e => {
  if(e.target.tagName != 'UL') {
    overlay.classList.remove('hidden');
    generateEmployeeDetails(employees);
  }
})

overlay.addEventListener('click', e => {
  if(e.target.className == 'icon-close') {
    overlay.classList.add('hidden');
    const div = document.querySelector('.window');
    overlay.removeChild(div);
  }
})