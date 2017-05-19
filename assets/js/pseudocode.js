// ********************************************** PSEUDO-CODE **********************************************
/* 

Pseudo-Code: First Draft of Pseudo-Code

TITLE: Rock Paper Scissors Multi-player

	DOM
	I. Player 1 (left) and Player 2 (right)
		each has:
		A) Name div
		B) Choice box div
		C) Choice input menu div
	II. Chat box
		A) set width and height
		B) overflow auto 
		C) chat input field
	III. Result text div (in middle?)

	Database Object Data
	I. 	User Data {
			name: name,
			isAvailable: isAvailable,
			playerDivId: playerDivId,
			numWins: numWins,
			numLosses: numLosses,
			selectedWeapon: selectedWeapon
		}
	II.	Chat Data {
			inputText: inputText
		}

	Local Object Data
	I. 	playerOne {
			name: name,
			isAvailable: isAvailable,
			playerDivId: playerDivId,
			numWins: numWins,
			numLosses: numLosses,
			selectedWeapon: selectedWeapon
		}
	II.	playerTwo {
			name: name,
			isAvailable: isAvailable,
			playerDivId: playerDivId,
			numWins: numWins,
			numLosses: numLosses,
			selectedWeapon: selectedWeapon
		}


	Game Functionality
	I. Document loads
		A. Game doesn't start automatically
		B. Can essentially watch other players play if a game is already in progress
		C. Checks some database values and, if there's initial values, sets them accordingly;
			otherwise, sets initial values if this is the first time the page has been loaded
	II. User chooses a player
		A. Only two slots open
		B. Click event listener on available slot
			1) Clicked changes DOM data (key "playerExists") from false to true
			2) Text field: Enter a name (prompt() first, can change to other get-method later)
				i) name stored as a variable
				ii) variable sent to database and stored in user data
			3) Change text in user div to the user's chosen name
			4) Append "Exit Game" button
	III. Each player use chooses rock, paper or scissors
		A. When two players exist, then game starts
		B. Append menu of Rock, Paper and Scissors to each player
			1) Each has DOM value equal to itself
		C. Click 
		Wait for other player to choose
	IV. Determine winner
		A. Fairly straightforward
	V. Chat function
		A. Disabled for non-players
		B. Input variable stored from value of chat input field
		C. Displays user name to the left of the text
		D. Stores on database
		E. Value event handler appends any changes into the text box. 
			Old text gets pushed up.
	
*/  //END OF PSEUDOCODE