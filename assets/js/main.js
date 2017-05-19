// declare game player objects
var playerOne = new player("", 1, false, "#playerone-menu", 0, 0, "");
var playerTwo = new player("", 2, false, "#playertwo-menu", 0, 0, "");




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

	$('#playerone-status').data('isActive', false)
						.data('playerNum', 1)
						.text('Player 1 is available.');
	$('#playertwo-status').data('isActive', false)
						.data('playerNum', 2)
						.text('Player 2 is available.');

	$('.status-div').on('click', function(){
		var thisStatus = $(this).data('isActive');
		var thisPlayerNum = $(this).data('playerNum');
		
		if (thisStatus === false) {
			var userName = prompt('Player ' + thisPlayerNum 
						+ ' is available! Please enter a user name.');
			$(this).data('name', userName)
				   .data('isActive', true)
				   .text('Player ' + thisPlayerNum + ' is ' + userName);

		} else {
			alert('This player has been taken.');
		}
	});


});