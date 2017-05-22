// Initialize Firebase
var config = {
	apiKey: "AIzaSyBsCJnfk8kdb0YPh8E3vX-PkC431PBXYHE",
	authDomain: "rps-multiplayer-30b08.firebaseapp.com",
	databaseURL: "https://rps-multiplayer-30b08.firebaseio.com",
	projectId: "rps-multiplayer-30b08",
	storageBucket: "rps-multiplayer-30b08.appspot.com",
	messagingSenderId: "354898222826"
};
firebase.initializeApp(config);

// declares a global database variable
var database = firebase.database();

// declares global player variables as empty objects
var playerOne = {};
var playerTwo = {};


// checks database for playerOne
database.ref('playerOne').once('value').then(function(snapshot){
	// if .isActive property does not exist OR if .isActive is false
	if (!snapshot.child('isActive').exists() || !snapshot.val().isActive) {
		// sets initial player values
		playerOne = new player("", 1, "playerOne", false, "#player-one", 0, 0, "");

		// syncs database with local playerOne object values
		database.ref('playerOne').set(playerOne);
	}
	// i.e. if .isActive is true
	else {
		// sets playerOne equal to the snapshot
		playerOne = snapshot.val();
	}

	// assigns data to player-one div equal to playerOne
	$('#player-one').data(playerOne);

	// reassigns playerOne as a direct reference to the DOM data
	playerOne = $('#player-one').data();

	// displays player status in their divId
	printPlayerStatus(playerOne);
});

// checks database for playerTwo
database.ref('playerTwo').once('value').then(function(snapshot){
	// if .isActive property does not exist OR if .isActive is false
	if (!snapshot.child('isActive').exists() || !snapshot.val().isActive) {
		// sets initial player values
		playerTwo = new player("", 2, "playerTwo", false, "#player-two", 0, 0, "");

		// syncs database with local playerTwo object values
		database.ref('playerTwo').set(playerTwo);
	}
	// i.e. if .isActive is true
	else {
		// sets playerTwo equal to the snapshot
		playerTwo = snapshot.val();
	}

	// assigns data to player-two div equal to playerTwo
	$('#player-two').data(playerTwo);

	// reassigns playerTwo as a direct reference to the DOM data
	playerTwo = $('#player-two').data();

	// displays player status in their divId
	printPlayerStatus(playerTwo);
});



// // checks database for playerTwo
// database.ref('playerTwo').once('value').then(function(snapshot){	
// 	// if playerTwo has a name, i.e. is active
// 	if (snapshot.val() != null) {
// 		// sets playerTwo equal to the snapshot
// 		playerTwo = snapshot.val();
// 	} 
// 	// if the player is not active
// 	else { 
// 		// sets initial player values
// 		playerTwo = new player("", 2, false, "#player-two", 0, 0, "");

// 		// syncs database with local playerTwo object values
// 		database.ref('playerTwo').set(playerTwo);

// 		// displays divId text
// 		$(playerTwo.divId).html('Click here to play as me!');
// 	}
// 	// assigns data to player-two div equal to playerTwo
// 	$('#player-two').data(playerTwo);

// 	// reassigns playerTwo as a direct reverence to the DOM data
// 	playerTwo = $('#player-two').data();
// });