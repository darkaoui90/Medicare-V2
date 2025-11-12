
// Default doctors data (used if no doctors in localStorage)
const defaultDoctors = [
  { id: 1, name: 'Dr. Sarah Alami', speciality: 'cardiologie', specialty: 'cardiologie', photo: '👩‍⚕️', available: true, experience: '15 ans', rating: 4.8, description: 'Expert en cardiologie avec 15 ans d\'expérience' },
  { id: 2, name: 'Dr. Ahmed Benali', speciality: 'dermatologie', specialty: 'dermatologie', photo: '👨‍⚕️', available: true, experience: '10 ans', rating: 4.6, description: 'Spécialiste en dermatologie' },
  { id: 3, name: 'Dr. Fatima Idrissi', speciality: 'pédiatrie', specialty: 'pédiatrie', photo: '👩‍⚕️', available: false, experience: '12 ans', rating: 4.9, description: 'Pédiatre expérimentée' },
  { id: 4, name: 'Dr. Karim Tazi', speciality: 'cardiologie', specialty: 'cardiologie', photo: '👨‍⚕️', available: true, experience: '20 ans', rating: 4.7, description: 'Cardiologue senior' },
  { id: 5, name: 'Dr. Nadia Bennis', speciality: 'orthopédie', specialty: 'orthopédie', photo: '👩‍⚕️', available: true, experience: '8 ans', rating: 4.5, description: 'Spécialiste en orthopédie' },
  { id: 6, name: 'Dr. Youssef Ziani', speciality: 'dermatologie', specialty: 'dermatologie', photo: '👨‍⚕️', available: false, experience: '18 ans', rating: 4.8, description: 'Expert en dermatologie' },
  { id: 7, name: 'Dr. Amina Slaoui', speciality: 'pédiatrie', specialty: 'pédiatrie', photo: '👩‍⚕️', available: true, experience: '14 ans', rating: 4.9, description: 'Pédiatre avec grande expérience' },
  { id: 8, name: 'Dr. Omar Fassi', speciality: 'orthopédie', specialty: 'orthopédie', photo: '👨‍⚕️', available: true, experience: '11 ans', rating: 4.4, description: 'Chirurgien orthopédiste' }
];

// Initialize doctors in localStorage if not exists
if (!localStorage.getItem('doctors')) {
  localStorage.setItem('doctors', JSON.stringify(defaultDoctors));
}

const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
const container = document.getElementById("doctorList");

    doctors.forEach(d => {
      const card = document.createElement("div");
      card.className = "formation-card";
      card.innerHTML = `
        <div class="image">
          <img src="${d.image}" alt="${d.name}">
        </div>
        <div class="content">
          <h3>${d.name}</h3>
          <h4>${d.speciality}</h4>
          <p>${d.description}</p>
        </div>
      `;
      container.appendChild(card);
    });



    

let array = [];


    const storedData = JSON.parse(localStorage.getItem("specialite")) || [];
    const container2 = document.getElementById("specialiteList");

    array = storedData;
  // array.forEach(name => addRow(name));

    array.forEach(name => {
      const btn = document.createElement("button");
      btn.className = "filter-btn px-6 py-3 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-md font-medium";
      // btn.innerHTML = `
      //   <button data-specialty="cardiologie"> ${name}</button>
      // `;
btn.textContent = name;
console.log('test');
      container2.appendChild(btn);
    });