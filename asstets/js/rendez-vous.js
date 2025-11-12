
let array = [];

const storedData = JSON.parse(localStorage.getItem("doctors")) || [];
const container = document.getElementById("doctor");

array = storedData;

array.forEach(doctor => {
  const option = document.createElement("option");
  option.className = "option";
  // option.textContent =`  ${doctor.name} ${doctor.speciality} ` ;
  option.textContent = "-> " + doctor.name +" : \""+doctor.speciality + "\"" ;
  container.appendChild(option);
});








const appointmentForm = document.getElementById('appointmentForm');
const appointmentsList = document.getElementById('appointmentsList');
const appointmentCount = document.getElementById('appointmentCount');
const appointmentFooter = document.getElementById('appointmentFooter');
let ariaInvalid = false;

const formFields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  day: document.querySelector('input[name="day"]'),
  doctor: document.getElementById('doctor'),
  reason: document.getElementById('reason'),
}

let appointments = [];

console.log('Form fields:', formFields);

// Populate doctors dropdown from localStorage
function populateDoctors() {
  const doctorSelect = document.getElementById('doctor');
  
  // Get doctors from localStorage (added by admin in dashboard)
  const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
  
  // Clear existing options except the first one
  doctorSelect.innerHTML = '<option value="">Choisir un médecin...</option>';
  
  if (doctors.length === 0) {
    const option = document.createElement('option');
    option.value = "";
    option.textContent = "Aucun médecin disponible";
    option.disabled = true;
    doctorSelect.appendChild(option);
    return;
  }
  
  // Add doctors to dropdown
  doctors.forEach(doctor => {
    const option = document.createElement('option');
    const specialty = doctor.specialty || doctor.specialite || '';
    const displayName = `${doctor.name} (${specialty.charAt(0).toUpperCase() + specialty.slice(1)})`;
    
    option.value = displayName;
    option.textContent = `${doctor.photo || '👨‍⚕️'} ${doctor.name} - ${specialty.charAt(0).toUpperCase() + specialty.slice(1)} ${doctor.available ? '✓' : '✗'}`;
    option.disabled = !doctor.available;
    if (!doctor.available) {
      option.classList.add('text-gray-400');
    }
    doctorSelect.appendChild(option);
  });
}

window.addEventListener('load', () => {
  // Populate doctors dropdown
  populateDoctors();
  
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
  const selectedDay = document.querySelector('input[name="day"]:checked');
  
  if (formFields.name.value.trim() === '' || 
      formFields.email.value.trim() === '' || 
      formFields.phone.value.trim() === '' || 
      !selectedDay || 
      formFields.doctor.value.trim() === '' || 
      formFields.reason.value.trim() === '') {
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
  
  const selectedDay = document.querySelector('input[name="day"]:checked');
  
  const appointmentData = {
    name: formFields.name.value,
    email: formFields.email.value,
    phone: formFields.phone.value,
    day: selectedDay ? selectedDay.value : '',
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

  const dayP = document.createElement('p');
  dayP.className = 'text-blue-800 mb-1';
  const dayStrong = document.createElement('strong');
  dayStrong.textContent = 'Jour:';
  dayP.appendChild(dayStrong);
  dayP.appendChild(document.createTextNode(' ' + (appointment.day ? appointment.day.charAt(0).toUpperCase() + appointment.day.slice(1) : '')));
  appointmentItem.appendChild(dayP);

  const statusP = document.createElement('p');
  statusP.className = 'text-blue-800 mb-1';
  const statusStrong = document.createElement('strong');
  statusStrong.textContent = 'Statut:';
  statusP.appendChild(statusStrong);
  statusP.appendChild(document.createTextNode(' ' + (appointment.status || 'En attente')));
  appointmentItem.appendChild(statusP);

  const reasonP = document.createElement('p');
  reasonP.className = 'text-blue-800 mb-1';
  reasonP.className = 'text-blue-600 italic mt-2';
  reasonP.textContent = appointment.reason || '';
  appointmentItem.appendChild(reasonP);

  appointmentsList.appendChild(appointmentItem);

  updateAppointmentCount();
}

function updateAppointmentCount() {
  const count = appointmentsList.children.length;
  console.log('Updating appointment count to:', count);
  appointmentCount.textContent = count;
}


