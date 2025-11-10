
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