
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