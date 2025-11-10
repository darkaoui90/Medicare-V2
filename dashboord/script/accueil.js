
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("authentification.html");
}

function loadStats() {
    const showDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const totalMedecins = showDoctors.length;
    
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const totalRendezVous = appointments.length;

    const specialites = JSON.parse(localStorage.getItem("specialite")) || [];
    const totalSpecialites = specialites.length;
    const disponibilites = JSON.parse(localStorage.getItem("disponibilites")) || [];

    document.getElementById("statMedecins").textContent = totalMedecins;
    document.getElementById("statRendezVous").textContent = totalRendezVous;
    document.getElementById("statSpecialites").textContent = totalSpecialites;
    document.getElementById("statDisponibilites").textContent = totalDisponibilites;
}

window.addEventListener("load", () => {
    loadStats();
});


const logout = document.getElementById("logout");

logout.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("authentification.html");
});
