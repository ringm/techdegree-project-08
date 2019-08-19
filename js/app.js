//------------------------------
//VARIABLES
//------------------------------

const directory = document.querySelector('.directory');
const employeeList = document.querySelectorAll('.employee-list');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('.icon-close');
const employees = [];
let employeeId = 0;
let currentEmployee = 0;
const input = document.getElementById("search");
const noResultMsg = document.getElementById("no-results");

//------------------------------
//FETCH REQUESTS
//------------------------------

fetch('https://randomuser.me/api/?results=12&&nat=us,ca,gb&inc=picture,name,email,location,phone,dob,login&noinfo')
    .then(checkStatus)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => results.forEach(result => generateEmployee(result)))
    .catch(error => console.log('Looks like there was an error with your request :(', error));

//------------------------------
//HELPER FUNCTIONS
//------------------------------

function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(response);
  } else { 
    Promise.reject(new Error(response.statusText));  
  }
}

function generateEmployee(data) {

    const li = document.createElement("li");
    li.className = "directory__item";
    li.setAttribute('id', employeeId);
    employeeId ++;

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
    let arrows = "";
    if(employees.length > 1) {
    arrows = `
        <img class='icon-back' src="icons/icon-back.svg" alt="back-icon">
        <img class='icon-next' src="icons/icon-next.svg" alt="next-icon">
      `;
    }
    const html = `
      ${arrows}
      <img class='icon-close' src="icons/icon-close.svg" alt="close-icon">
      <img class='avatar' src="${employee[index].picture.large}" alt="${employee[index].name.first} ${employee[index].name.last}">
      <div class='employee-detail-info'>
        <p class='employee-name capitalize'>${employee[index].name.first} ${employee[index].name.last}</p>
        <p class='employee-data'>${employee[index].email}</p>
        <p class='employee-data capitalize'>${employee[index].location.city}</p>
      </div>
      <div class='employee-additional-info'>
        <p class='employee-data'>${employee[index].phone}</p>
        <p class='employee-data capitalize'>${employee[index].location.street}, ${employee[index].location.state} ${employee[index].location.postcode}</p>
        <p class='employee-data'>Birthday: ${bday.getDate()}/${bday.getMonth()+1}/${bday.getFullYear()}</p>
      </div>
    `;

    div.innerHTML = html;
    overlay.appendChild(div);
}

function nextEmployee(index) {
  const bday = new Date(employees[index].dob.date);
  const avatar = document.querySelector('.window .avatar');
  const employeeName = document.querySelector('.employee-detail-info').childNodes[1];
  const employeeEmail = document.querySelector('.employee-detail-info').childNodes[3];
  const employeeCity = document.querySelector('.employee-detail-info').childNodes[5];
  const employeePhone = document.querySelector('.employee-additional-info').childNodes[1];
  const employeeStreet = document.querySelector('.employee-additional-info').childNodes[3];
  const employeeBday = document.querySelector('.employee-additional-info').childNodes[5];

  avatar.src = `${employees[index].picture.large}`;
  employeeName.textContent = `${employees[index].name.first} ${employees[index].name.last}`;
  employeeEmail.textContent = `${employees[index].email}`;
  employeeCity.textContent = `${employees[index].location.city}`;
  employeePhone.textContent = `${employees[index].phone}`;
  employeeStreet.textContent = `${employees[index].location.street}, ${employees[index].location.state} ${employees[index].location.postcode}`;
  employeeBday.textContent = `Birthday: ${bday.getDate()}/${bday.getMonth()+1}/${bday.getFullYear()}`;
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
});

overlay.addEventListener('click', e => {
  if(e.target.className == 'icon-close') {
    overlay.classList.add('hidden');
    const div = document.querySelector('.window');
    overlay.removeChild(div);
  } else if(e.target.className == 'icon-next') {
      if(currentEmployee < employees.length -1) {
        currentEmployee ++;
        nextEmployee(currentEmployee);
      }
  } else if(e.target.className == 'icon-back'){
      if(currentEmployee > 0) {
        currentEmployee --;
        nextEmployee(currentEmployee);
      }
  }
});

input.addEventListener("input", () => {
  //stores search input
  const inputValue = input.value.toLowerCase();
  //stores all 'li' elements in the employee directory
  const searchList = document.querySelectorAll(".directory li");
  //counts how many elements are being hidden
  let k = 0;
  //create array of employee names
  const firstName = employees.map(data => data.name.first);
  //create array of employee last name
  const lastName = employees.map(data => data.name.last);
  //create array of employee username
  const username =  employees.map(data => data.login.username);

  for(let i=0; i < searchList.length; i++) {
    //compares name and username against user input
    if(firstName[i].indexOf(inputValue) && lastName[i].indexOf(inputValue) && username[i].indexOf(inputValue) == -1) {
      //if there's no match, hides the element
      searchList[i].classList.add("hidden");
      k++;
    } else {
      //removes the 'hide' class so the element shows
      searchList[i].classList.remove("hidden");
    }
  }

  //if all the elements are hidden, the 'no results' msg shows
  if(k == searchList.length) {
    noResultMsg.classList.remove("hidden");
  } else { noResultMsg.classList.add("hidden"); }

});
