
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
    const totalDisponibilites = Object.keys(disponibilites).length;

    document.getElementById("statMedecins").textContent = totalMedecins;
    document.getElementById("statRendezVous").textContent = totalRendezVous;
    document.getElementById("statSpecialites").textContent = totalSpecialites;
    document.getElementById("statDisponibilites").textContent = totalDisponibilites;
    loadRecentAppointments();
}
function loadRecentAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const recentAppointmentsContainer = document.getElementById("recentAppointments");
    recentAppointmentsContainer.innerHTML = "";

    const recentAppointments = appointments.slice(-3).reverse();
    recentAppointments.forEach(appointment => {
        const appointmentDiv = document.createElement("div");
        appointmentDiv.classList.add("appointment-card", "p-4", "mb-4", "bg-white", "rounded-lg", "shadow-md"); 
        
        // Patient Name
        const nameP = document.createElement("p");
        nameP.classList.add("font-semibold", "text-lg");
        nameP.textContent = `Patient: ${appointment.name}`;
        appointmentDiv.appendChild(nameP);

        // Doctor Name
        const doctorP = document.createElement("p");
        doctorP.classList.add("text-gray-600");
        doctorP.textContent = `Médecin: ${appointment.doctor}`;
        appointmentDiv.appendChild(doctorP);

        // Date
        const dateP = document.createElement("p");
        dateP.classList.add("text-gray-600");
        dateP.textContent = `Date: ${appointment.date}`;
        appointmentDiv.appendChild(dateP);

        recentAppointmentsContainer.appendChild(appointmentDiv);

        
    });
}
window.addEventListener("load", () => {
    loadStats();
    loadRecentAppointments();
});


const logout = document.getElementById("logout");

logout.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("authentification.html");
});

