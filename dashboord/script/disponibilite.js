if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("authentification.html");
}

document.addEventListener("DOMContentLoaded", () => {
  chargerMedecinsDisponibilite();
  afficherFormulaire();
});

window.addEventListener("storage", (event) => {
  if (event.key === "doctors") {
    chargerMedecinsDisponibilite();
  }
});

const logout = document.getElementById("logout");

logout.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("authentification.html");
});

function chargerMedecinsDisponibilite() {
  const select = document.getElementById("selectMedecinDispo");
  if (!select) return;

  const currentValue = select.value;
  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

  select.innerHTML = '<option value="">-- Choisir un medecin --</option>';

  if (!doctors.length) {
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.disabled = true;
    emptyOption.textContent = "Ajoutez un medecin depuis l'onglet Medecins";
    select.appendChild(emptyOption);
    select.value = "";
    afficherFormulaire();
    return;
  }

  doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.name;
    option.textContent = doctor.speciality
      ? `${doctor.name} - ${doctor.speciality}`
      : doctor.name;
    select.appendChild(option);
  });

  if (currentValue && doctors.some((doctor) => doctor.name === currentValue)) {
    select.value = currentValue;
  } else {
    select.value = "";
  }

  afficherFormulaire();
}

function afficherFormulaire() {
  const select = document.getElementById("selectMedecinDispo");
  const form = document.getElementById("formulaireDispo");
  const msg = document.getElementById("messageContainer");
  msg.innerHTML = "";
  form.style.display = select.value ? "block" : "none";

  if (select.value) {
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const doctor = doctors.find((doc) => doc.name === select.value);
    const jours = Array.isArray(doctor?.disponibilites) ? doctor.disponibilites : [];
    document.querySelectorAll("#formulaireDispo input[type='checkbox']").forEach(c => {
      c.checked = jours.includes(c.value);
    });
  }
}

function sauvegarderDisponibilites() {
  const select = document.getElementById("selectMedecinDispo");
  const msg = document.getElementById("messageContainer");
  if (!select.value) return;

  const jours = [];
  document.querySelectorAll("#formulaireDispo input[type='checkbox']").forEach(c => {
    if (c.checked) jours.push(c.value);
  });

  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const doctorIndex = doctors.findIndex((doc) => doc.name === select.value);
  if (doctorIndex === -1) return;

  doctors[doctorIndex].disponibilites = jours;
  localStorage.setItem("doctors", JSON.stringify(doctors));
  localStorage.removeItem("disponibilites");
  
  msg.innerHTML = `<div class="p-3 mt-3 bg-green-100 text-green-700 rounded">Disponibilites enregistrees !</div>`;
}
