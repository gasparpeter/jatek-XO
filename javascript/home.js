var homeContainer = document.getElementById("home-container");
var welcome = document.getElementById("welcome");
var btn = document.getElementById("home-btn");

btn.addEventListener("click", function () {
    homeContainer.style.display = "none";
    lobby.startContainer.style.display = "block";
});