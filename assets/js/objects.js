// ****************************************** GLOBAL OBJECTS ******************************************
function player(name, playerNum, databaseKey, isAvailable, 
	divId, menuId, btnId, numWins, numLosses, selectedWeapon) {
	this.name = name;
	this.playerNum = playerNum;
	this.databaseKey = databaseKey;
	this.isAvailable = isAvailable;
	this.divId = divId;
	this.menuId = menuId;
	this.btnId = btnId;
	this.numWins = numWins;
	this.numLosses = numLosses;
	this.selectedWeapon = selectedWeapon;
}

// declares global player variables as empty objects
var playerOne = {};
var playerTwo = {};

/* 

	I. 	User Data {
			name: name,
			isAvailable: isAvailable,
			divId: divId,
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
			divId: divId,
			numWins: numWins,
			numLosses: numLosses,
			selectedWeapon: selectedWeapon
		}
	II.	playerTwo {
			name: name,
			isAvailable: isAvailable,
			divId: divId,
			numWins: numWins,
			numLosses: numLosses,
			selectedWeapon: selectedWeapon
		}


*/  //END OF PSEUDOCODE
