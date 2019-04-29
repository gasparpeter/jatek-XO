

var gameplayComponent = function () {

    var selfie = this;


    this.container           = document.getElementById("containerem");
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

    this.startGame = function () {


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


        if ( randomStart === 0)  {
            this.alcim.innerText = lobby.elsoJatekosInput.value + " " +  "jatekos lephet";
            this.currentPlayer = this.player1;
        }else {
            this.alcim.innerText = lobby.masodikJatekosInput.value + " " + "jatekos lephet";
            this.currentPlayer = this.player2;
        }

        this.nyertValaki = false;
    };

    this.valtoztatas = function (y, x, player) {
        this.tabla[y][x] = player;
    };

    this.jelenjmeg = function () {
        console.log(this.tabla)
        this.container.innerHTML = null;
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

            this.container.appendChild( this.playerNev);
            this.container.appendChild(ul);
        }
    };

    this.negyzetListener = function (e) {
console.log(this.currentPlayer)
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

        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
            this.alcim.innerText = lobby.elsoJatekosInput.value + " " +  "jatekos lephet..";
        }else {
            this.currentPlayer = this.player1;
            this.alcim.innerText = lobby.masodikJatekosInput.value + " " +  "jatekos lephet..";
        }


        if ( ! this.maradtakLepesek() ) {
            this.alcim.innerText = "Vege a jateknak.";
            this.reset.style.display = "block";
        }
        // ----------------------------------------------
        if (this.egyenloSor() === 0) {
            this.reset.style.display = "block";
            this.cim.innerText = lobby.elsoJatekosInput.value + " " + "jatekos nyert";
            this.alcim.innerText = null;

            this.nyertValaki = true;

        }else if (this.egyenloSor() === 1) {
            this.reset.style.display = "block";
            this.cim.innerText = lobby.masodikJatekosInput.value + " " + "jatekos nyert";
            this.alcim.innerText = null;

            this.nyertValaki = true;
        }

        this.reset.addEventListener("click", function () {
            // selfie.tabla = [
            //     [-1, -1, -1],
            //     [-1, -1, -1],
            //     [-1, -1, -1]
            // ];

            selfie.startGame();

            reset.style.display = "none";
        });


        this.egyenloSor();

    };

    this.egyenloSor = function () {
        if (this.tabla[0][0] !== -1 &&
            this.tabla[0][0] === this.tabla[0][1] &&
            this.tabla[0][0] === this.tabla[0][2]) {
            console.log("nyerunk elso sorban");

            return this.tabla[0][0];

        }else if (
            this.tabla[0][0] !== -1 &&
            this.tabla[0][0] === this.tabla[1][1] &&
            this.tabla[0][0] === this.tabla[2][2]

        ) {
            console.log("nyertunk atlosan")

            return this.tabla[0][0]
        }else if (
            this.tabla[0][0] !== -1 &&
            this.tabla[0][0] === this.tabla[1][0] &&
            this.tabla[0][0] === this.tabla[2][0]



        ) {
            console.log("nyerunk fuggolegesen vaze")
            return this.tabla[0][0];
        }else if (
            this.tabla[0][1] !== -1 &&
            this.tabla[0][1] === this.tabla[1][1] &&
            this.tabla[0][1] === this.tabla[2][1]
        ){
            console.log("nyerunkfuggolegesennnn masodik sorban")
            return this.tabla[0][1];
        }else if (
            this.tabla[0][2] !== -1 &&
            this.tabla[0][2] === this.tabla[1][2] &&
            this.tabla[0][2] === this.tabla[2][2]
        ) {
            console.log("3ik sor legyozve")
            return this.tabla[0][2];
        }else if (
            this.tabla[0][2] !== -1 &&
            this.tabla[0][2] === this.tabla[1][1] &&
            this.tabla[0][2] === this.tabla[2][0]
        ) {
            console.log("a masik keresztapa teso")
            return this.tabla[0][0];
        }else if (
            this.tabla[1][0] !== -1 &&
            this.tabla[1][0] === this.tabla[1][1] &&
            this.tabla[1][0] === this.tabla[1][2]
        ) {
            console.log("ezt is megnyertuk")
            return this.tabla[1][0];
        }else if (
            this.tabla[2][0] !== -1 &&
            this.tabla[2][0] === this.tabla[2][1] &&
            this.tabla[2][0] === this.tabla[2][2]
        ) {
            console.log("nesze neked ct map")
            return this.tabla[2][0];
        }
        else {
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