// declare game player objects

// sets data of player-one and player-two divs as new player objects
$('#player-one').data(new player("", 1, false, "#player-one", 0, 0, ""));
$('#player-two').data(new player("", 2, false, "#player-two", 0, 0, ""));

// declares variables playerOne and playerTwo as direct references to respective DOM data
var playerOne = $('#player-one').data();
var playerTwo = $('#player-two').data();

playerOne.printStatus('Click here to play as me!');
playerTwo.printStatus('Click here to play as me!');




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

$(document).ready(function(){

	// sets initial user access
	setUserAccess('observer_access');

	$('.player-div').on('click', function(){
		var activeStatus = $(this).data().isActive;
		var thisPlayerNum = $(this).data().playerNum;
		console.log(activeStatus, thisPlayerNum);
		
		// if the user is an observer, i.e. not a player
		if (getUserAccess() === 'observer_access') {
			// if the player has not already been selected
			if (activeStatus === false) {
				$(this).data('isActive', true);
				setUserAccess('player' + thisPlayerNum + '_access');
				var userName = prompt('Please enter a user name.');
				$(this).data('name', userName)
					   .data().printStatus('Player ' + thisPlayerNum + ':<br/>' + userName);

			} else {
				alert('This player is currently being played by another user.');
			}
		} else {alert('You have already selected a player.');}

		
	});
});