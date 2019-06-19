
var homeComponent = function () {

    var selff = this;

    this.homeContainer = document.getElementById("home-container");
    this.welcome = document.getElementById("welcome");
    this.btn = document.getElementById("home-btn");

    this.homeListener = function () {

            selff.homeContainer.style.display = "none";
            lobby.startContainer.style.display = "block";
    };

    this.btn.addEventListener("click", this.homeListener)

};

var home = new homeComponent();

