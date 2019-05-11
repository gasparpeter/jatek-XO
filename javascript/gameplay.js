

var gameplayComponent = function () {

    var selfie = this;


    this.container           = document.getElementById("gameplay-container");
    this.board               = document.getElementById("board");
    this.playerNev           = document.createElement("h2");
    this.reset               = document.getElementById("reset");
    this.cim                 = document.getElementById("valamiid1");
    this.alcim               = document.getElementById("valamiid2");

    this.player1             = 0;
    this.player2             = 1;

    this.player1Name         = "1es szamu jatekos";
    this.player2Name         = "2es szamu jatekos";

    this.currentPlayer       = null;

    this.nyertValaki         = null;

    this.tabla               = null;

    this.backToLobbyContainer   = document.getElementById( "back-to-lobby-container" );
    this.backToLobby            = document.getElementById("back-lobby");
    this.igenBtn                = document.getElementById("back-lobby1");
    this.nemBtn                 = document.getElementById("back-lobby2");



    this.startGame = function () {

        this.reset.style.display                = "none";
        this.backToLobbyContainer.style.display = "none";

        if ( lobby.elsoJatekosInput.value !== "" ) {
            this.player1Name = lobby.elsoJatekosInput.value;
        }

        if ( lobby.masodikJatekosInput.value !== "" ) {
            this.player2Name = lobby.masodikJatekosInput.value;
        }

        this.tabla = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ];

        console.log("A jatek elindult..");
        this.cim.innerText = "Jatek folyamatban..";
        this.jelenjmeg();


        console.log( "GLOBAL Player 1: ", PLAYER_ONE_USERNAME );
        console.log( "GLOBAL Player 2: ", PLAYER_TWO_USERNAME );

        this.currentPlayer = this.player1;


        var randomStart = Math.round( Math.random() );



        if ( randomStart === 0 )  {
            this.alcim.innerText = this.player1Name + " " +  "jatekos lephet";
            this.currentPlayer = this.player1;
        }else {
            this.alcim.innerText = this.player2Name + " " + "jatekos lephet";
            this.currentPlayer = this.player2;
        }

        this.nyertValaki = false;


        this.igenBtn.addEventListener("click", function () {
            selfie.container.style.display = "none";
            lobby.startContainer.style.display = "block";
            selfie.backToLobbyContainer.style.display = "none";
        });


        this.nemBtn.addEventListener("click", function () {
            selfie.startGame();
            selfie.backToLobbyContainer.style.display = "none";
        });


        this.reset.addEventListener("click", function () {
            selfie.startGame();
        });

    };


    this.valtoztatas = function (y, x, player) {
        this.tabla[y][x] = player;
    };

    this.jelenjmeg = function () {
        console.log(this.tabla);
        this.board.innerHTML = null;
        for (var i = 0; i < this.tabla.length; i++) {

            var ul = document.createElement("ul");

            for (var j = 0; j < this.tabla[i].length; j++) {

                var li = document.createElement("li");

                li.setAttribute( 'data-Y', i.toString() );
                li.setAttribute( 'data-X', j.toString() );

                li.classList.add("negyzet");


                if (this.tabla[i][j] === 1) {
                    li.classList.add("X");
                }

                if (this.tabla[i][j] === 0) {
                    li.classList.add("O");
                }

                ul.appendChild(li);

                li.addEventListener( "click",  this.negyzetListener.bind(this));

            }

            this.board.appendChild(ul);
        }
    };

    this.negyzetListener = function (e) {

        if (this.nyertValaki) {
            this.alcim.innerText = "ne meg klikkelj a faszamba";
            return;
        }

        var negyzet = e.target;
        var Y = parseInt( negyzet.getAttribute( "data-Y" ) );
        var X = parseInt( negyzet.getAttribute( "data-X" ) );
        console.log(this.tabla);
        if (this.tabla[Y][X] !== -1) {
            alert("Ne csalj");
            return;
        }

        console.log( "Vannak meg lepesek? :", this.maradtakLepesek() );



        this.valtoztatas(Y, X, this.currentPlayer);

        this.jelenjmeg();

        if ( this.currentPlayer === this.player1 ) {
            this.currentPlayer = this.player2;
            this.alcim.innerText = this.player2Name + " " +  "jatekos lephet..";
        }else {
            this.currentPlayer = this.player1;
            this.alcim.innerText = this.player1Name + " " +  "jatekos lephet..";
        }


        if ( ! this.maradtakLepesek() ) {
            this.alcim.innerText = "Vege a jateknak.";
            this.reset.style.display = "block";
        }
        // ----------------------------------------------
        if ( this.egyenloSor() === this.player1 ) {
            this.reset.style.display = "block";
            this.cim.innerText = this.player1Name + " " + "jatekos nyert";
            this.alcim.innerText = null;

            this.nyertValaki = true;

        } else if ( this.egyenloSor() === this.player2 ) {
            this.reset.style.display = "block";
            this.cim.innerText = this.player2Name + " " + "jatekos nyert";
            this.alcim.innerText = null;

            this.nyertValaki = true;
        }


        /** Back to lobby check... */

        if ( ! this.maradtakLepesek() || selfie.nyertValaki ) {

            selfie.backToLobbyContainer.style.display = "block";

            // selfie.backToLobby.style.display = "block";
            // selfie.igenBtn.style.display = "block";
            // selfie.nemBtn.style.display = "block";
        }

    };

    this.egyenloSor = function () {
        if ( this.tabla[0][0] !== -1 &&
            this.tabla[0][0] === this.tabla[0][1] &&
            this.tabla[0][0] === this.tabla[0][2]) {

            console.log("nyerunk elso sorban");
            return this.tabla[0][0];
        } else if (
            this.tabla[0][0] !== -1 &&
            this.tabla[0][0] === this.tabla[1][1] &&
            this.tabla[0][0] === this.tabla[2][2] ) {

            console.log("nyertunk atlosan");
            return this.tabla[0][0]

        } else if (
            this.tabla[0][0] !== -1 &&
            this.tabla[0][0] === this.tabla[1][0] &&
            this.tabla[0][0] === this.tabla[2][0] ) {

            console.log("nyerunk fuggolegesen vaze");
            return this.tabla[0][0];

        } else if (
            this.tabla[0][1] !== -1 &&
            this.tabla[0][1] === this.tabla[1][1] &&
            this.tabla[0][1] === this.tabla[2][1] ){

            console.log("nyerunkfuggolegesennnn masodik sorban");
            return this.tabla[0][1];

        } else if (
            this.tabla[0][2] !== -1 &&
            this.tabla[0][2] === this.tabla[1][2] &&
            this.tabla[0][2] === this.tabla[2][2] ) {

            console.log("3ik sor legyozve");
            return this.tabla[0][2];

        } else if (
            this.tabla[0][2] !== -1 &&
            this.tabla[0][2] === this.tabla[1][1] &&
            this.tabla[0][2] === this.tabla[2][0] ) {

            console.log("a masik keresztapa teso");
            return this.tabla[0][2];

        } else if (
            this.tabla[1][0] !== -1 &&
            this.tabla[1][0] === this.tabla[1][1] &&
            this.tabla[1][0] === this.tabla[1][2]) {

            console.log("ezt is megnyertuk");
            return this.tabla[1][0];

        } else if (
            this.tabla[2][0] !== -1 &&
            this.tabla[2][0] === this.tabla[2][1] &&
            this.tabla[2][0] === this.tabla[2][2] ) {

            console.log("nesze neked ct map");
            return this.tabla[2][0];

        } else {
            return -1;
        }

    };

    this.maradtakLepesek = function () {
        if (this.tabla[0].indexOf( -1 ) === -1 && this.tabla[1].indexOf( -1 ) === -1 && this.tabla[2].indexOf( -1 ) === -1 ) {
            return false;
        }else {
            return true;
        }

    }



};

var gameplay = new gameplayComponent();

gameplay.startGame();