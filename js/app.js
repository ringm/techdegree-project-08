//------------------------------
//VARIABLES
//------------------------------

const directory = document.querySelector('.directory');
const employeeList = document.querySelectorAll('.employee-list');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('.icon-close')
const employees = [];
let employeeId = 0;
let currentEmployee = 0;

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
    li.setAttribute('id', employeeId);
    employeeId += 1;

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

function generateEmployeeDetails(employee, index) {

    const div = document.createElement('div');
    div.className = 'window';
    const bday = new Date(employee[index].dob.date);

    const html = `
      <img class='icon-close' src="icons/icon-close.svg" alt="close-icon">
      <img class='icon-back' src="icons/icon-back.svg" alt="back-icon">
      <img class='icon-next' src="icons/icon-next.svg" alt="next-icon">
      <img class='avatar' src="${employee[index].picture.large}" alt="${employee[index].name.first} ${employee[index].name.last}">
      <div class='employee-detail-info'>
        <p class='employee-name capitalize'>${employee[index].name.first} ${employee[index].name.last}</p>
        <p class='employee-data'>${employee[index].email}</p>
        <p class='employee-data capitalize'>${employee[index].location.city}</p>
      </div>
      <div class='employee-additional-info'>
        <p class='employee-data'>${employee[index].phone}</p>
        <p class='employee-data capitalize'>${employee[index].location.street}, ${employee[index].location.postcode}</p>
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
  if(e.target.tagName == 'LI') {
    overlay.classList.remove('hidden');
    generateEmployeeDetails(employees, e.target.id);
    currentEmployee = e.target.id;
  }
})

overlay.addEventListener('click', e => {
  if(e.target.className == 'icon-close') {
    overlay.classList.add('hidden');
    const div = document.querySelector('.window');
    overlay.removeChild(div);
  } else if(e.target.className == 'icon-next') {
      employeeId += 1;
      const bday = new Date(employees[1].dob.date);
      const avatar = document.querySelector('.window .avatar');
      const employeeName = document.querySelector('.employee-detail-info').childNodes[1];
      const employeeEmail = document.querySelector('.employee-detail-info').childNodes[3];
      const employeeCity = document.querySelector('.employee-detail-info').childNodes[5];
      const employeePhone = document.querySelector('.employee-additional-info').childNodes[1];
      const employeeStreet = document.querySelector('.employee-additional-info').childNodes[3];
      const employeeBday = document.querySelector('.employee-additional-info').childNodes[5];
      avatar.src = `${employees[1].picture.large}`;
      employeeName.textContent = `${employees[1].name.first} ${employees[1].name.last}`;
      employeeEmail.textContent = `${employees[1].email}`;
      employeeCity.textContent = `${employees[1].location.city}`;
      employeePhone.textContent = `${employees[1].phone}`;
      employeeStreet.textContent = `${employees[1].location.street}, ${employees[1].location.postcode}`;
      employeeStreet.Bday = `${bday.getDate()}/${bday.getMonth()+1}/${bday.getFullYear()}`;
  }


})