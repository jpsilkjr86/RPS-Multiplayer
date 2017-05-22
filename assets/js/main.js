// **************************************** MAIN APP FUNCTIONS *****************************************

$(document).ready(function(){

	// sets initial user access to observer
	setUserAccess('observer_access');

	// click event listener for choosing players
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
				// adds button for leaving game, visibile only to the user who selected the player
				printLeaveGameBtn(thisPlayer, getUserAccess());
			} else {
				alert('This player is currently being played by another user.');
			}
		} else {alert('You have already selected a player.');}		
	});

	// click event listener for leave-game buttons
	$(document).on('click', '.leave-game', function(){
		// uses data from the button to get the player's database key
		var playerDatabaseKey = $(this).attr('data-databaseKey');

		// uses the database key to set .isActive to false. Event listener in database-mng.js 
		// will take it from here.
		database.ref(playerDatabaseKey).child('isActive').set(false);

		// removes anything that may or may not be in menu divs for both players
		$(playerOne.menuId).empty();
		$(playerTwo.menuId).empty();

		// resets user access level to observer
		setUserAccess('observer_access');

		// removes button
		$(this).remove();
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

		if (e.key == '/') {
			console.log('Your access level is:', getUserAccess());
		}
	});
}); // end of document ready