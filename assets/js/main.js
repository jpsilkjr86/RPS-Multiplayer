// **************************************** MAIN APP FUNCTIONS *****************************************

$(document).ready(function(){

	// sets initial user access
	setUserAccess('observer_access');

	$('.player-div').on('click', function(){
		var thisPlayer = $(this).data();
		// console.log(thisPlayer.isActive, thisPlayer.playerNum);
		
		// if the user is an observer, i.e. not a player
		if (getUserAccess() === 'observer_access') {
			// if the player has not already been selected
			if (!thisPlayer.isActive) {
				// sets isActive to true
				thisPlayer.isActive = true;
				// sets user access in local storage 
				setUserAccess('player' + thisPlayer.playerNum + '_access');
				// gets user name
				thisPlayer.name = prompt('Please enter a user name.');
				// overwrites whatever is on the database for 'playerOne' key as the selected player
				database.ref(thisPlayer.databaseKey).set(thisPlayer);
				// changes player div text
				printPlayerStatus(thisPlayer);
			} else {
				alert('This player is currently being played by another user.');
			}
		} else {alert('You have already selected a player.');}

		
	});

	// for error checking
	$(document).keypress(function(e){
		console.log(e.keyCode);

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

		if (e.keyCode === 96) {
			database.ref('playerOne').set({});
			database.ref('playerTwo').set({});
		}
	});
}); // end of document ready