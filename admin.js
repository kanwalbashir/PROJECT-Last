// Navbar toggle
const menu = document.querySelector('#menu-bars');
const navbar = document.querySelector('.navbar');
if (menu && navbar) {
    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    };
}
//logout
document.getElementById("logoutBtn").onclick = async () => {
    await fetch("http://localhost:8080/api/auth/logout", { 
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    }).catch(()=>{});
    
    localStorage.clear();
    sessionStorage.clear();
    alert("Logged out!");
     window.location.href = "../templetes/login.html";
};
// Highlight current page in navbar
document.querySelectorAll('.navbar a').forEach(link => {
    if (link.href === location.href) link.classList.add('active');
});
//for checkig role 
 const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
        // Not logged in as admin → go back to login
        window.location.href = "../templetes/login.html";
    }