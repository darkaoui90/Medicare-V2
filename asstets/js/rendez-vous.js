const appointmentForm = document.getElementById('appointmentForm');
const appointmentsList = document.getElementById('appointmentsList');
const appointmentCount = document.getElementById('appointmentCount');
const appointmentFooter = document.getElementById('appointmentFooter');
let ariaInvalid = false;

const formFields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  date: document.getElementById('date'),
  doctor: document.getElementById('doctor'),
  reason: document.getElementById('reason'),
}

let appointments = [];

console.log('Form fields:', formFields);

window.addEventListener('load', () => {
  const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments = storedAppointments;
  appointments.forEach(appointment => renderAppointment(appointment));
  updateAppointmentCount();
  if (appointments.length === 0) {
    appointmentFooter.textContent = 'Aucun rendez-vous trouvé.';
  }else {
    appointmentFooter.textContent = '';
  }

  console.log('Loaded appointments:', appointments);
});

Object.keys(formFields).forEach((key) => {
  const field = formFields[key];
  field.addEventListener('blur', () => {
    validateField(field);
  });
});

function realTimeValidation() {
  let hasInvalid = false;
  if (formFields.name.value.trim() === '' || formFields.email.value.trim() === '' || formFields.phone.value.trim() === '' || formFields.date.value.trim() === '' || formFields.doctor.value.trim() === '' || formFields.reason.value.trim() === '') {
    hasInvalid = true;
  }
  return hasInvalid;
}

function validateField(field) {
  if (field.value.trim() === '') {
    field.className += ' border-red-500';
    field.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    field.classList.remove('border-red-500');
    field.removeAttribute('aria-invalid');
    return true;
  }
}

appointmentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  ariaInvalid = realTimeValidation();
  if (ariaInvalid) {
    alert('Veuillez corriger les erreurs dans le formulaire avant de soumettre.');
    return;
  }
  
  const appointmentData = {
    name: formFields.name.value,
    email: formFields.email.value,
    phone: formFields.phone.value,
    date: formFields.date.value,
    doctor: formFields.doctor.value,
    reason: formFields.reason.value,
    status: 'En attente',
  };
  
  appointments.push(appointmentData);
  console.log('Updated appointments list:', appointments);
  
  localStorage.setItem('appointments', JSON.stringify(appointments));
  console.log('Appointment data:', appointmentData);
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
  const dateStrong = document.createElement('strong');
  dateStrong.textContent = 'Date:';
  dateP.appendChild(dateStrong);
  dateP.appendChild(document.createTextNode(' ' + (appointment.date ? new Date(appointment.date).toLocaleString() : '')));
  appointmentItem.appendChild(dateP);

  const reasonP = document.createElement('p');
  reasonP.className = 'text-blue-800 mb-1';
  const reasonStrong = document.createElement('strong');
  reasonStrong.textContent = 'Reason:';
  reasonP.appendChild(reasonStrong);
  reasonP.appendChild(document.createTextNode(' ' + (appointment.reason || '')));
  appointmentItem.appendChild(reasonP);

  appointmentsList.appendChild(appointmentItem);

  updateAppointmentCount();
}

function updateAppointmentCount() {
  const count = appointmentsList.children.length;
  console.log('Updating appointment count to:', count);
  appointmentCount.textContent = count;
}