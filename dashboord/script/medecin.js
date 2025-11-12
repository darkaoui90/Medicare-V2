



// This part is for specialities 


let array = [];

const storedData = JSON.parse(localStorage.getItem("specialite")) || [];
const container = document.getElementById("speciality");

array = storedData;
// array.forEach(name => addRow(name));

array.forEach(name => {
  const option = document.createElement("option");
  option.className = "option";
  option.textContent = name;
  container.appendChild(option);
});







if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.replace("authentification.html");
}
const form = document.getElementById("form");
const tableBody = document.getElementById("tableBody");
let editIndex = null;

//show all docs from LS
function showDoctors() {
  tableBody.innerHTML = "";
  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

  doctors.forEach((d, i) => {
    const row = `
          <tr>
            <td><img src="${d.image}" alt="" style="margin-left : 30%"></td>
            <td>${d.name}</td>
            <td>${d.speciality}</td>
            <td>${d.description}</td>
            <td>
              <button class="edit" onclick="editDoctor(${i})">Modifier</button>
              <button class="delete" onclick="deleteDoctor(${i})">Supprimer</button>
            </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
}





//add & modify
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const speciality = document.getElementById("speciality").value;
  const description = document.getElementById("description").value;
  const imageFile = document.getElementById("image").files[0];

  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

  //save docs even new or modified
  function saveDoctor(imageData) {
    const doctor = { 
      name, 
      speciality, 
      specialty: speciality, // Add both for compatibility
      description, 
      image: imageData,
      photo: '👨‍⚕️', // Default emoji
      available: true, // Default to available
      id: editIndex !== null ? doctors[editIndex].id : Date.now()
    };

    if (editIndex !== null) {
      doctors[editIndex] = doctor; // Modification
      editIndex = null;
    } else {
      doctors.push(doctor); // Ajout
    }

    localStorage.setItem("doctors", JSON.stringify(doctors));
    showDoctors();
    form.reset();
  }

  //if image modified
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = (e) => saveDoctor(e.target.result);
    reader.readAsDataURL(imageFile);
  } else {
    const oldImage = (editIndex !== null) ? doctors[editIndex].image : "";
    saveDoctor(oldImage);
  }
});






//modify
function editDoctor(i) {
  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const d = doctors[i];
  document.getElementById("name").value = d.name;
  document.getElementById("speciality").value = d.speciality;
  document.getElementById("description").value = d.description;
  editIndex = i;
  alert("Modifiez les informations et aprés cliquez sur Enregistrer ✅");
}


//remove
function deleteDoctor(i) {
  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  if (confirm("Voulez-vous vraiment supprimer ce médecin ?")) {
    doctors.splice(i, 1);
    localStorage.setItem("doctors", JSON.stringify(doctors));
    showDoctors();
  }
}


window.onload = showDoctors; // without this doctors do not show in first, u need to add some doctor 3ad ibano
const logout = document.getElementById("logout");

logout.addEventListener('"click"', function (e) {
  e.preventDefault();
  localStorage.setItem("isLoggedIn", "false");
  window.location.replace("authentification.html");
});
