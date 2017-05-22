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


// database listener for all changes in playerOne, syncing and initializing in real time
database.ref('playerOne').on('value', function(snapshot){
	// if .isActive property does not exist OR if .isActive is false
	if (!snapshot.child('isActive').exists() || !snapshot.val().isActive) {
		// resets to initial player values
		playerOne = resetPlayerValues(1);

		// syncs database with local playerOne object values
		database.ref('playerOne').set(playerOne);
	}
	// i.e. if .isActive is true
	else {
		// sets playerOne equal to the snapshot
		playerOne = snapshot.val();
	}

	// syncs updated player data with player-one div
	$('#player-one').data(playerOne);

	// reassigns playerOne to ensure it is always a direct reference to the DOM data
	playerOne = $('#player-one').data();

	// displays player status in its divId
	printPlayerStatus(playerOne);
});

// database listener for all changes in playerTwo, syncing and 
// initializing in real time (same logic as above)
database.ref('playerTwo').on('value', function(snapshot){
	// if .isActive property does not exist OR if .isActive is false
	if (!snapshot.child('isActive').exists() || !snapshot.val().isActive) {
		// resets to initial player values
		playerTwo = resetPlayerValues(2);

		// syncs database with local playerTwo object values
		database.ref('playerTwo').set(playerTwo);
	}
	// i.e. if .isActive is true
	else {
		// sets playerTwo equal to the snapshot
		playerTwo = snapshot.val();
	}

	// syncs updated player data with player-two div
	$('#player-two').data(playerTwo);

	// reassigns playerTwo to ensure it is always a direct reference to the DOM data
	playerTwo = $('#player-two').data();

	// displays player status in its divId
	printPlayerStatus(playerTwo);
});

// database value event listener for various game events, syncing data in real time
	database.ref().on('value', function(snapshot){
		// if both players are active, displays weapons menu to players with visibility 
		// dependent on their user access (i.e. other player or observer-lever users 
		// cannot see their menu)
		if (playerOne.isActive && playerTwo.isActive && getUserAccess()==='player1_access') {
			showWeaponsMenu(playerOne);
		}
		if (playerOne.isActive && playerTwo.isActive && getUserAccess()==='player2_access') {
			showWeaponsMenu(playerTwo);
		}
	});