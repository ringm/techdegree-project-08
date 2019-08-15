//------------------------------
//VARIABLES
//------------------------------

const directory = document.querySelector('.directory');
const employeeList = document.querySelectorAll('.employee-list');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('.icon-close')

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
    const bday = new Date(data.dob.date);
    const basicInfoLi = document.createElement("li");
    const aditionalInfoLi = document.createElement("li");
    basicInfoLi.className = "directory__item";
    aditionalInfoLi.setAttribute("id", `"${data.email}"`);
    aditionalInfoLi.className = "window hidden";

    const basicInfo = `
      <img class='avatar' src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
      <div class='employee-basic-info'>
          <p class='employee-name capitalize'>${data.name.first} ${data.name.last}</p>
          <p class='employee-data'>${data.email}</p>
          <p class='employee-data capitalize'>${data.location.city}</p>
      </div>
    `;
    basicInfoLi.innerHTML = basicInfo;
    directory.appendChild(basicInfoLi);

    const aditionalInfo = `
      ${basicInfo}
      <div class='employee-additional-info'>
        <p class='employee-data'>${data.phone}</p>
        <p class='employee-data capitalize'>${data.location.street}, ${data.location.postcode}</p>
        <p class='employee-data'>Birthday: ${bday.getDate()}/${bday.getMonth()+1}/${bday.getFullYear()}</p>
      </div>
    `;
    aditionalInfoLi.innerHTML = aditionalInfo;
    employeeList.appendChild(aditionalInfoLi);
}

//------------------------------
//EVENT LISTENERS
//------------------------------

directory.addEventListener('click', e => {
  if(e.target.tagName != 'UL') {
    overlay.classList.remove('hidden');
  }
})

//closeIcon.addEventListener('click', e => overlay.classList.add('hidden'))
