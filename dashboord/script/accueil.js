
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("authentification.html");
}

function loadStats() {
    const totalMedecins = localStorage.getItem("medecins") || 0;
    
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const totalRendezVous = appointments.length;

    const totalSpecialites = localStorage.getItem("specialites") || 0;
    const totalDisponibilites = localStorage.getItem("disponibilites") || 0;

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
