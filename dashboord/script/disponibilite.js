if (localStorage.getItem("isLoggedIn") !== "true") {   
    window.location.replace("authentification.html");
}

function afficherFormulaire() {
      const select = document.getElementById('selectMedecinDispo');
      const formulaire = document.getElementById('formulaireDispo');
      
      if (select.value) {
        formulaire.style.display = 'block';
      } else {
        formulaire.style.display = 'none';
      }
    }



const logout = document.getElementById("logout");

logout.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("authentification.html");
});