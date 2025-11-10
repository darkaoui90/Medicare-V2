if (localStorage.getItem("isLoggedIn") !== "true") {   
    window.location.replace("authentification.html");
}
const logout = document.getElementById("logout");

logout.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("authentification.html");
});