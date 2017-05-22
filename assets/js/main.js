// **************************************** MAIN APP FUNCTIONS *****************************************
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

// declare a database variable
var database = firebase.database();

// declare global player variables as empty objects
var playerOne = {};
var playerTwo = {};


// checks database for playerOne
database.ref('playerOne').once('value').then(function(snapshot){
	// if playerOne has a name, i.e. is active
	if (snapshot.val().name != '') {
		// set playerOne equal to the snapshot
		playerOne = snapshot.val();
	} else { // if the player is not active
		// set empty player data and database key equal to the same
		playerOne = new player("", 1, false, "#player-one", 0, 0, "");
		database.ref('playerOne').set(playerOne);
		$(playerOne.playerDivId).html('Click here to play as me!');
	}
	$('#player-one').data(playerOne);
	playerOne = $('#player-one').data();
	console.log($('#player-one').data());
	// playerOne = snapshot.val();
	// $('#player-one').data(snapshot.val());
	console.log(snapshot.val());
	console.log(playerOne.playerNum);
});

// checks database for playerTwo
database.ref('playerTwo').once('value').then(function(snapshot){
	// if playerTwo has a name, i.e. is active
	if (snapshot.val().name != '') {
		// set playerTwo equal to the snapshot
		playerTwo = snapshot.val();
	} else { // if the player is not active
		// set empty player data and database key equal to the same
		playerTwo = new player("", 2, false, "#player-two", 0, 0, "");
		database.ref('playerTwo').set(playerTwo);
		$(playerTwo.playerDivId).html('Click here to play as me!');
	}
	$('#player-two').data(playerTwo);
	playerTwo = $('#player-two').data();
	console.log($('#player-two').data());
	// playerTwo = snapshot.val();
	// $('#player-two').data(snapshot.val());
	console.log(snapshot.val());
	console.log(playerTwo.playerNum);
});


$(document).ready(function(){

	// sets initial user access
	setUserAccess('observer_access');

	$('.player-div').on('click', function(){
		var thisPlayer = $(this).data();
		console.log(thisPlayer.isActive, thisPlayer.playerNum);
		
		// if the user is an observer, i.e. not a player
		if (getUserAccess() === 'observer_access') {
			// if the player has not already been selected
			if (!thisPlayer.isActive) {
				// sets isActive to true
				thisPlayer.isActive = true;
				// sets user access in local storage 
				setUserAccess('player' + thisPlayer.playerNum + '_access');
				thisPlayer.name = prompt('Please enter a user name.');
				$(thisPlayer.playerDivId).html('Player ' + thisPlayer.playerNum + ':<br/>' + thisPlayer.name);
			} else {
				alert('This player is currently being played by another user.');
			}
		} else {alert('You have already selected a player.');}

		
	});

	// for error checking
	$(document).keypress(function(e){
		if (e.key == '0') {database.ref('playerOne').set({});}

		if (e.key == 'q') {
			database.ref('playerOne').once('value').then(function(snapshot){
				console.log('database:', snapshot.val());
			});
			console.log('local vars:', playerOne, playerTwo);
			console.log('DOM data:', $('#player-one').data());
		}	

		if (e.key == 'z') {
			$('#player-one').data('test', 'testtest');
			console.log($('#player-one').data());
		}	
	});
}); // end of document ready