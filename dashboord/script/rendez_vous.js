let appointments = [];
const tbody = document.getElementById('appointmentsTableBody');
const tableFooter = document.getElementById('table-footer');
const statusFilter = document.getElementById('filterStatus');
console.log('statusFilter:', statusFilter);



window.addEventListener('DOMContentLoaded', () => {
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

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("authentification.html");
}
const logout = document.getElementById("logout");

logout.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("authentification.html");
});