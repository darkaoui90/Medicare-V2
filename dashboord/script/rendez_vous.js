let appointments = [];
const tbody = document.getElementById('appointmentsTableBody');
const tableFooter = document.getElementById('table-footer');
const statusFilter = document.getElementById('filterStatus');
console.log('statusFilter:', statusFilter);

const logout = document.getElementById("logout");

logout.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("authentification.html");
});



window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.replace("authentification.html");
    } else {
        console.log("User is logged in.");
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments = storedAppointments;
        appointments.forEach(appointment => renderAppointment(appointment));
        updateAppointmentCount();
        console.log('Loaded appointments:', appointments);
        if (appointments.length === 0) {
            tableFooter.textContent = 'Aucun rendez-vous trouvé.';
        } else {
            tableFooter.textContent = '';
        }
    }
});

function renderAppointment(appointment) {

    const tr = document.createElement('tr');
    tr.classList.add('appointment-card', 'p-4', 'mb-4', 'bg-white', 'rounded-lg', 'shadow-md');
    tbody.appendChild(tr);

    // Patient
    const patientTd = document.createElement('td');
    patientTd.className = 'px-4 py-2';
    patientTd.textContent = appointment.name;
    tr.appendChild(patientTd);

    // Email
    const emailTd = document.createElement('td');
    emailTd.className = 'px-4 py-2';
    emailTd.textContent = appointment.email;
    tr.appendChild(emailTd);

    // Téléphone
    const phoneTd = document.createElement('td');
    phoneTd.className = 'px-4 py-2';
    phoneTd.textContent = appointment.phone;
    tr.appendChild(phoneTd);

    // Médecin
    const doctorTd = document.createElement('td');
    doctorTd.className = 'px-4 py-2';
    doctorTd.textContent = appointment.doctor;
    tr.appendChild(doctorTd);

    // Date
    const dateTd = document.createElement('td');
    dateTd.className = 'px-4 py-2';
    dateTd.textContent = appointment.date;
    tr.appendChild(dateTd);

    // Statut
    const statusTd = document.createElement('td');
    statusTd.className = 'px-4 py-2';
    statusTd.textContent = appointment.status;
    tr.appendChild(statusTd);

    // Actions
    const actionsTd = document.createElement('td');
    actionsTd.className = 'px-4 py-2';

    // approuver button
    const aprouverBtn = document.createElement('button');
    aprouverBtn.className = 'mr-2 px-3 py-1 bg-green-500 text-white rounded';
    aprouverBtn.textContent = 'Approuver';
    aprouverBtn.addEventListener('click', () => {
        appointment.status = 'confirmed';
        localStorage.setItem('appointments', JSON.stringify(appointments));
        updateAppointmentCount();
        statusTd.textContent = appointment.status;
        console.log('Approuver appointment', appointment);
    });
    actionsTd.appendChild(aprouverBtn);

    // refuser button
    const refuserBtn = document.createElement('button');
    refuserBtn.className = 'mr-2 px-3 py-1 bg-red-500 text-white rounded';
    refuserBtn.textContent = 'Refuser';
    refuserBtn.addEventListener('click', () => {
        appointment.status = 'refused';
        localStorage.setItem('appointments', JSON.stringify(appointments));
        updateAppointmentCount();
        statusTd.textContent = appointment.status;
        console.log('Refuser appointment', appointment);
    });
    actionsTd.appendChild(refuserBtn);
    tr.appendChild(actionsTd);
}

function updateAppointmentCount() {
    const totalCount = appointments.length;
    const confirmedCount = appointments.filter(app => app.status === 'confirmed').length;
    const refusedCount = appointments.filter(app => app.status === 'refused').length;
    const pendingCount = appointments.filter(app => app.status === 'pending').length;
}
document.getElementById("exportCSV").addEventListener("click", function () {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    if (appointments.length === 0) {
        alert("aucun rendez-vous trouvé");
        return;
    }
    const headers =["Nom du patient", "email", "telephone", "Medecin", "date", "statut"];
    const rows = appointments.map(a =>[
        a.name,
        a.email,
        a.phone,
        a.doctor,
        a.date,
        a.statut
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach(row =>{
        csvContent += row.map (field => `"${String(field).replace(/"/g, '""')}"`).join(",") +"\n";
    });

    const blob = new Blob([csvContent], { type : "text/csv;charset=utf-8;"});
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href",url);
    link.setAttribute("download","rendez_vous.csv");
    document.body.appendChild (link);
    link.click();
    document.body.removeChild(link);
}); 
document.getElementById("exportPDF").addEventListener("click", async function () {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    if (appointments.length === 0) {
        alert("aucun rendez-vous trouvé");
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const headers = [["Nom du patient", "email", "telephone", "Medecin", "date", "statut"]];
    
    const rows = appointments.map (a =>[
        a.name,
        a.email,
        a.phone,
        a.doctor,
        a.date,
        a.status
    ]);
    doc.autoTable({
    startY: 25,
    head: headers,
    body: rows,
    theme: "grid",
    styles: {  fontSize: 10 },
  });

    doc.save ("rendez_vous.pdf");
});

