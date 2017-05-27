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

// database listener for each child added to 'chats'
database.ref('chats').on('child_added', function(snapshot){
	var entry = snapshot.val();
	appendChatEntry(entry.name, entry.msg);
});

// declares timeout variable for when setTimeout occurs later 
// (happens between matches when results are being displayed)
var waitForNext;

// database listener for all changes in activeplayers index
// in database, syncing and initializing in real time
database.ref('/activeplayers/').on('value', function(snapshot){
	console.log('value event triggered');
	// declare p1s and p2s as shorthands for "Player 1 Snapshot" & "Player 2 Snapshot"
	var p1s = snapshot.child('playerOne');
	var p2s = snapshot.child('playerTwo');

	// declare p1sv and p2sv as shorthands for "Player 1 Snapshot .val()" & "Player 2 Snapshot .val()"
	var p1sv = p1s.val();
	var p2sv = p2s.val();

	// if either playerOne or playerTwo doesn't exist in the database
	if (!p1s.exists() || !p2s.exists()) {
		// resets DOM to its initial state by emptying out various divs
		resetDOM(['all']);
		// resets data to initial values
		playerOne = resetPlayer(1);
		playerTwo = resetPlayer(2);
		updatePlayersOnFirebase([playerOne, playerTwo]);
		syncDOMData([playerOne, playerTwo]);
		console.log('playerOne, playerTwo not found. reseting players...');
		setUserAccess('observer_access');
		toggleChatState();
	}	
	else { // wraps below code in an 'else' to avoid redundancy with above code
		
		// if snapshot of p1 has changed its availability status (compared to original local value)
		if (p1sv.isAvailable !== playerOne.isAvailable) {
			
			// if p1 has become available, reset the values.
			if (p1sv.isAvailable) {
				clearTimeout(waitForNext); // clears timeout var waitForNext in case it exists
				resetDOM(['p1main', 'p1menu', 'p1btn', 'p1sb']);
				displayTextOnMenu(1, 'Click player box to join!');
				displayResult('Waiting for players to join...');
				playerOne = resetPlayer(1);
				updatePlayersOnFirebase([playerOne]);
				syncDOMData([playerOne]);
				console.log('reset p1');
				timer.clearTimer();
				if (!p2sv.isAvailable) {
					displayTextOnMenu(2, 'Player 2 is ready!');
				}
			} 
			else { // if playerOne has become unavailable, i.e. has been selected
				// sets playerOne equal to the snapshot value
				playerOne = p1sv;
				syncDOMData([playerOne]);
				displayTextOnMenu(1, 'Player 1 is ready!');
				console.log('p1 value updated');

				// adds button for leaving game, visibile only to the user who selected the player
				printLeaveGameBtn();
				// updates player status in its divId
				printPlayerStatus(playerOne);

				// if playerTwo has also been selected, display scoreboard and weapons
				if (!p2sv.isAvailable) {
					console.log('displayWeaponsMenu p1');					
					displayResult('Game is on!');
					displayScoreboard();
					displayWeaponsMenu();
					timer.startTimer();
				}
			}	
		}
		
		// if snapshot of p2 has changed its availability status (compared to original local value)
		if (p2sv.isAvailable !== playerTwo.isAvailable) {
			
			// if p2 has become available, reset the values.
			if (p2sv.isAvailable) {
				clearTimeout(waitForNext); // clears timeout var waitForNext in case it exists
				resetDOM(['p2main', 'p2menu', 'p2btn', 'p2sb']);
				displayTextOnMenu(2, 'Click player box to join!');
				displayResult('Waiting for players to join...');
				playerTwo = resetPlayer(2);
				updatePlayersOnFirebase([playerTwo]);
				syncDOMData([playerTwo]);
				console.log('reset p2');
				timer.clearTimer();
				if (!p1sv.isAvailable) {
					displayTextOnMenu(1, 'Player 1 is ready!');
				}
			} 
			else { // if playerTwo has become unavailable, i.e. has been selected
				// sets playerTwo equal to the snapshot value
				playerTwo = p2sv;
				syncDOMData([playerTwo]);
				displayTextOnMenu(2, 'Player 2 is ready!');
				console.log('p2 value updated');

				// adds button for leaving game, visibile only to the user who selected the player
				printLeaveGameBtn();
				// updates player status in its divId
				printPlayerStatus(playerTwo);

				// if playerOne has also been selected, display scoreboard and weapons
				if (!p1sv.isAvailable) {
					console.log('displayWeaponsMenu p2');					
					displayResult('Game is on!');
					displayScoreboard();
					displayWeaponsMenu();
					timer.startTimer();
				}
			}	
		}
		
		// conditions for determing game result after both players have selected weapons
		if (p1sv.doesHaveWeapon && p2sv.doesHaveWeapon)	{
			// clears timer right away
			timer.clearTimer();
			// declares result as an empty string
			var result = '';

			// saves these snapshot values as more manageable variables
			var p1choice = p1sv.selectedWeapon;	var p2choice = p2sv.selectedWeapon;			
			var p1wins = p1sv.numWins;			var p2wins = p2sv.numWins;
			var p1losses = p1sv.numLosses;		var p2losses = p2sv.numLosses;

			// saves choices to global variables to avoid the condition code being performed 
			// twice. (will update to DOM and firebase after checking win/lose results)
			playerOne.doesHaveWeapon = false;	playerTwo.doesHaveWeapon = false;
			playerOne.selectedWeapon = '';		playerTwo.selectedWeapon = '';
			
			// checks for tie first
			if (p1choice == p2choice) {
				result = "It's a tie!";
			} else {
				// if player 1 wins, player 2 loses
				if (doesXWinYLose(p1choice, p2choice)) {
					p1wins++;
					p2losses++;
					result = (playerOne.name + ' wins!');
				} 
				else { // if player 2 wins, player 1 loses
					p2wins++;
					p1losses++;
					result = (playerTwo.name + ' wins!');
				}
			} // end of else
			// always perform these functions after checking and displaying game results
			// saves updated values to local variables
			playerOne.numWins = p1wins;
			playerOne.numLosses = p1losses;
			playerTwo.numWins = p2wins;
			playerTwo.numLosses = p2losses;
			// syncs DOM data and firebase data
			syncDOMData([playerOne, playerTwo]);
			updatePlayersOnFirebase([playerOne, playerTwo]);
			// displays scoreboard and result
			displayTextOnMenu(1, p1choice);
			displayTextOnMenu(2, p2choice);
			displayScoreboard();
			displayResult(result);
			// wait 4 seconds before displaying the next weapons menu
			waitForNext = setTimeout(function(){
				displayResult('Game is on!');
				displayWeaponsMenu();				
				timer.startTimer();
			}, 4000);
		} // end of 'if' condition checking results
		else if (p1sv.doesHaveWeapon && !playerTwo.doesHaveWeapon) {
			displayTextOnMenu(1, 'Weapon selected!');
			displayResult('Awaiting Player Two input...');
			console.log('p1:', p1sv.selectedWeapon);
		} else if (p2sv.doesHaveWeapon && !playerOne.doesHaveWeapon) {
			displayTextOnMenu(2, 'Weapon selected!');
			displayResult('Awaiting Player One input...');
			console.log('p2:', p2sv.selectedWeapon);
		}	
	} // end of else wrap
	// ***END OF INITIAL CHECK
}); // end of activeplayers database value event listener