let array = [];

const storedData = JSON.parse(localStorage.getItem("doctors")) || [];
const container = document.getElementById("doctor");

array = storedData;

// array.forEach(doctor => {
//   const option = document.createElement("option");
//   option.className = "option";
//   option.textContent = "-> " + doctor.name + " : \"" + doctor.speciality + "\"";
//   container.appendChild(option);
// });

const appointmentForm = document.getElementById('appointmentForm');
const appointmentsList = document.getElementById('appointmentsList');
const appointmentCount = document.getElementById('appointmentCount');
const appointmentFooter = document.getElementById('appointmentFooter');

let ariaInvalid = false;
let appointments = [];

const formFields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  doctor: document.getElementById('doctor'),
  day: document.getElementById('day'),
  reason: document.getElementById('reason'),
};

window.addEventListener('load', () => {
  const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments = storedAppointments;
  appointments.forEach(appointment => renderAppointment(appointment));
  updateAppointmentCount();
  appointmentFooter.textContent = appointments.length === 0 ? 'Aucun rendez-vous trouvé.' : '';
});

// Object.keys(formFields).forEach((key) => {
//   const field = formFields[key];
//   field.addEventListener('blur', () => validateField(field));
// });

function realTimeValidation() {
  return (
    formFields.name.value.trim() === '' ||
    formFields.email.value.trim() === '' ||
    formFields.phone.value.trim() === '' ||
    !document.querySelector('input[name="day"]:checked') ||

    formFields.doctor.value.trim() === '' ||
    formFields.reason.value.trim() === ''
  );
}

function validateField(field) {
  if (field.value.trim() === '') {
    field.classList.add('border-red-500');
    field.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    field.classList.remove('border-red-500');
    field.removeAttribute('aria-invalid');
    return true;
  }
}

const doctorSelect = document.getElementById("doctor");
const disponibility = document.querySelectorAll('input[name="day"]');

disponibility.forEach(day => {
  day.addEventListener("click", () => {

    const selectedDay = day.value;
    console.log("selectedDay",  day.value);
    doctorSelect.innerHTML=""
    const newarray = array.filter((doctor)=>doctor.disponibilites.includes(selectedDay))
    
    console.log("newarray", newarray);
    newarray.forEach(doctor => {
  const option = document.createElement("option");
  
  option.className = "option";
  option.textContent = "-> " + doctor.name + " : \"" + doctor.speciality + "\"";
  container.appendChild(option);
});
return
    
    // const daySearch = document.querySelector('.form-input')

    // const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    // const storedDisponibilities = JSON.parse(localStorage.getItem("disponibilites")) || {};
    // const filterDispo = storedDisponibilities.filter(item => {
    //   const dispodays = storedDisponibilities[item.day] || [];
    //   return storedDoctors.filter(doctor => {
    //     const doctorDays = storedDisponibilities[doctor.name] || [];
    //     console.log("doctorDays", doctorDays);
    //     return doctorDays.includes(selectedDay);;

    //   });
    });
    

    // const filteredDoctors = storedDoctors.filter(doctor => {
    //   const doctorDays = storedDisponibilities[doctor.name] || [];
    //   return doctorDays.includes(selectedDay);
    // });
    // doctorSelect.innerHTML = "";


    // filteredDoctors.forEach(doctor => {
    //   const option = document.createElement("option");
    //   option.textContent = `${doctor.name} - ${doctor.speciality}`;
    //   option.value = doctor.name;
    //   doctorSelect.appendChild(option);
    // }
    // )
    // console.log("day", selectedDay);
  });
// });
 
appointmentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  ariaInvalid = realTimeValidation();
  if (ariaInvalid) {
    alert('Veuillez corriger les erreurs dans le formulaire avant de soumettre.');
    return;
  }

  const selectedDay = document.querySelector('input[name="day"]:checked');

  const appointmentData = {
    name: formFields.name.value,
    email: formFields.email.value,
    phone: formFields.phone.value,
    date: selectedDay ? selectedDay.value : '',
    doctor: formFields.doctor.value,
    reason: formFields.reason.value,
    status: 'En attente',
  };

  appointments.push(appointmentData);
  localStorage.setItem('appointments', JSON.stringify(appointments));
  renderAppointment(appointmentData);
  appointmentForm.reset();
});

function renderAppointment(appointment) {
  const appointmentItem = document.createElement('div');
  appointmentItem.className = 'appointment-item p-4 mb-4 bg-white rounded-lg shadow';

  const title = document.createElement('h3');
  title.className = 'text-xl font-bold text-blue-900 mb-2';
  title.textContent = `${appointment.name} - ${appointment.doctor}`;
  appointmentItem.appendChild(title);

  const dateP = document.createElement('p');
  dateP.className = 'text-blue-800 mb-1';
  dateP.innerHTML = `<strong>Jour:</strong> ${appointment.date || ''}`;
  appointmentItem.appendChild(dateP);

  const reasonP = document.createElement('p');
  reasonP.className = 'text-blue-800 mb-1';
  reasonP.innerHTML = `<strong>Raison:</strong> ${appointment.reason || ''}`;
  appointmentItem.appendChild(reasonP);

  const emailP = document.createElement('p');
  emailP.className = 'text-blue-800 mb-1';
  emailP.innerHTML = `<strong>Email:</strong> ${appointment.email || ''}`;
  appointmentItem.appendChild(emailP);

  const phoneP = document.createElement('p');
  phoneP.className = 'text-blue-800 mb-1';
  phoneP.innerHTML = `<strong>Téléphone:</strong> ${appointment.phone || ''}`;
  appointmentItem.appendChild(phoneP);

  appointmentsList.appendChild(appointmentItem);
  appointmentFooter.textContent = appointments.length === 0 ? 'Aucun rendez-vous trouvé.' : '';
  updateAppointmentCount();
}

function updateAppointmentCount() {
  appointmentCount.textContent = appointmentsList.children.length;
}
