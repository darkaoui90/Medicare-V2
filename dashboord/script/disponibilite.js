if (localStorage.getItem("isLoggedIn") !== "true") {   
    window.location.replace("authentification.html");
}
const logout = document.getElementById("logout");

logout.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("authentification.html");
});
// disponibilite javascript 


function afficherFormulaire() {
  const select = document.getElementById("selectMedecinDispo");
  const form = document.getElementById("formulaireDispo");
  const msg = document.getElementById("messageContainer");
  msg.innerHTML = "";
  form.style.display = select.value ? "block" : "none";

  if (select.value) {
    const saved = JSON.parse(localStorage.getItem("disponibilites") || "{}");
    const jours = saved[select.value] || [];
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

  const all = JSON.parse(localStorage.getItem("disponibilites") || "{}");
  all[select.value] = jours;
  localStorage.setItem("disponibilites", JSON.stringify(all));

  msg.innerHTML = `<div class="p-3 mt-3 bg-green-100 text-green-700 rounded">✅ Disponibilités enregistrées !</div>`;
}