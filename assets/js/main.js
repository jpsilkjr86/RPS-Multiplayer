// **************************************** MAIN APP FUNCTIONS *****************************************

$(document).ready(function(){

	// sets initial user access to observer
	setUserAccess('observer_access');

	// click event listener for choosing players
	$('.player-div').on('click', function(){
		var thisPlayer = $(this).data();
		console.log(thisPlayer);
		// if the user is an observer, i.e. not a player
		if (getUserAccess() === 'observer_access') {
			
			if (thisPlayer.isAvailable) {
				// sets user access in local storage 
				setUserAccess('player' + thisPlayer.playerNum + '_access');
				
				var nameInput = prompt('Please enter a user name.');

				// overwrites whatever is on the database for 'playerOne' key.
				// Lumped all the data together in one chunk because there were only two 
				// changes (name and isAvailable) and I didn't want to send them separately,
				// thus triggering two event listener functions to perform database queries.
				database.ref(thisPlayer.databaseKey).set({
					name: nameInput,
					isAvailable: false,
					playerNum: thisPlayer.playerNum,
					databaseKey: thisPlayer.databaseKey,
					divId: thisPlayer.divId,
					menuId: thisPlayer.menuId,
					btnId: thisPlayer.btnId,
					numWins: thisPlayer.numWins,
					numLosses: thisPlayer.numLosses,
					selectedWeapon: thisPlayer.selectedWeapon
				});
				
				// changes player div text
				// printPlayerStatus(thisPlayer);
				// adds button for leaving game, visibile only to the user who selected the player
				printLeaveGameBtn(thisPlayer);

				// overwrites whatever is on the database for 'playerOne' key as the selected player
				// database.ref(thisPlayer.databaseKey).set(thisPlayer);
				// database.ref(thisPlayer.databaseKey).child('isAvailable').set(false);

			} else {
				alert('This player is currently being played by another user.');
			}
		} else {alert('You have already selected a player.');}		
	});

	// click event listener for leave-game buttons
	$(document).on('click', '.leave-game', function(){
		// uses the player's database key to set .isAvailable to true. Event listeners 
		// in database-mng.js will take it from there.
		database.ref(getDatabaseKey()).child('isAvailable').set(true);

		// resets user access level to observer
		setUserAccess('observer_access');

		// removes button
		$(this).remove();
	});

	// click event listener for weapon-choice
	$(document).on('click', '.weapon-choice', function(){
		var choice = $(this).val();

		database.ref(getDatabaseKey()).child('selectedWeapon').set(choice);
	});

	// for error checking
	$(document).keypress(function(e){
		console.log(e.keyCode);

		if (e.key == '0') {database.ref('playerOne').set({});}

		if (e.key == 'q') {
			database.ref('/activeplayers/playerOne').once('value').then(function(snapshot){
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
			database.ref('/activeplayers/playerOne').set({});
			database.ref('/activeplayers/playerTwo').set({});
		}

		if (e.key == '/') {
			console.log('Your access level is:', getUserAccess());
		}

		if (e.key == '=') {
			database.ref('activeplayers/playerOne').child('isAvailable').set(false);
			console.log('set true');
		}

	});
}); // end of document ready