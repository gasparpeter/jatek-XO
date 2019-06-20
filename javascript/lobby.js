var lobbyComponent = function () {

    var self = this;

    this.startContainer = document.getElementById("lobby-container");
    this.elsoJatekosInput = document.getElementById("name-input-player1");
    this.masodikJatekosInput = document.getElementById("name-input-player2");
    this.button = document.getElementById("letsplay-gomb");
    this.back = document.getElementById("back-btn");

    this.backListener = function () {
        self.startContainer.style.display = "none";
        home.homeContainer.style.display = "block";
    };



    this.startGameListener = function () {
        gameplay.container.style.display = "block";
        self.startContainer.style.display = "none";
        // var player1Name = player1Input.value;
        // var player2Name = player2Input.value;

        gameplay.cim.style.display = "block";
        gameplay.alcim.style.display = "block";

        gameplay.playerNev.style.display = "block";
        gameplay.alcim.innerText = this.masodikJatekosInput.value + " " + "jatekos kezdhet";
        console.log("Player 1 name:", gameplay.player1Name);
        console.log("Player 2 name:", gameplay.player2Name);

        // ELINDITJUK A JATEKOT..
        gameplay.startGame();

        // reset.style.display = "block";
    };

    this.startGameListener = this.startGameListener.bind( this );


    this.button.addEventListener("click", this.startGameListener);

    this.back.addEventListener("click", this.backListener);
};

var lobby = new lobbyComponent();