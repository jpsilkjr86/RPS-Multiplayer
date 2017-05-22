// ****************************************** GLOBAL OBJECTS ******************************************
function player(name, playerNum, isActive, playerDivId, 
	numWins, numLosses, selectedWeapon) {
	this.name = name;
	this.playerNum = playerNum;
	this.isActive = isActive;
	this.playerDivId = playerDivId;
	this.numWins = numWins;
	this.numLosses = numLosses;
	this.selectedWeapon = selectedWeapon;
}

// player.prototype.printStatus = function(msg) {
// 	$(this.playerDivId).html(msg);
// }


/* 

	I. 	User Data {
			name: name,
			isActive: isActive,
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
			isActive: isActive,
			playerDivId: playerDivId,
			numWins: numWins,
			numLosses: numLosses,
			selectedWeapon: selectedWeapon
		}
	II.	playerTwo {
			name: name,
			isActive: isActive,
			playerDivId: playerDivId,
			numWins: numWins,
			numLosses: numLosses,
			selectedWeapon: selectedWeapon
		}


*/  //END OF PSEUDOCODE
