#pragma strict
var Title : UnityEngine.UI.Text;
var OpponentScore : UnityEngine.UI.Text;
var PlayerScore : UnityEngine.UI.Text;
var HighScore : UnityEngine.UI.Text;
var Final : UnityEngine.UI.Text;
var End : GameObject;

function Start () {
	if (End) {
		End.SetActive(false);
	}
	PlayerPrefs.SetString("GameOver", "false");
	PlayerPrefs.SetInt("BounceCount", 0);
	if (Application.loadedLevelName == "Speed") {
		Time.timeScale = 2.5;
	}else if (Application.loadedLevelName == "Variable") {
		Time.timeScale = Random.Range(1.0f, 2.5f);
	}else if (Application.loadedLevelName == "TournamentGame") {
		Title.text = "M A T C H      " + PlayerPrefs.GetString("MatchLevel") + " - " + PlayerPrefs.GetInt("Match#");
		PlayerPrefs.SetInt("Player1", PlayerPrefs.GetInt("Level" + PlayerPrefs.GetString("MatchLevel") + PlayerPrefs.GetInt("Player1#"))); //Mother of god this is to long
		PlayerPrefs.SetInt("Player2", PlayerPrefs.GetInt("Level" + PlayerPrefs.GetString("MatchLevel") + PlayerPrefs.GetInt("Player2#"))); //Fuck grammar
		if (PlayerPrefs.GetInt("Player1") == 0 || PlayerPrefs.GetInt("Player2") == 0) {
			Time.timeScale = 1.5;
		}else {
			Time.timeScale = 4.5;
			//while (1 > 0) {                                     keep
			//	Time.timeScale += .2;                             or
			//	yield WaitForSeconds (Time.timeScale * 1);        naw?
			//}                                                   ;)
		}
	}else {
		Time.timeScale = 1.5;
	}
	
}

function Update () {
	if (Input.GetKey (KeyCode.Escape)) {
		PlayerPrefKilla();
		Application.LoadLevel("MainMenu");
	}
		
	if (Application.loadedLevelName == "Survival" || Application.loadedLevelName == "Wall" || Application.loadedLevelName == "MainMenu") {
		OpponentScore.text = PlayerPrefs.GetInt("BounceCount").ToString();
		PlayerScore.text = PlayerPrefs.GetInt("BounceCount").ToString();
		if (HighScore) {
			HighScore.text = "h i g h s c o r e :     " + PlayerPrefs.GetInt(Application.loadedLevelName + "Highscore").ToString();
		}
		if (PlayerPrefs.GetInt("BounceCount") > PlayerPrefs.GetInt(Application.loadedLevelName + "Highscore")) {
			PlayerPrefs.SetInt(Application.loadedLevelName + "Highscore", PlayerPrefs.GetInt("BounceCount"));
		}
		if (PlayerPrefs.GetString("GameOver") == "true") {
			Final.text = "Game Over"; //Add custom messages based off of score
			End.SetActive(true);
		}
	}else {
		if (OpponentScore) {
			OpponentScore.text = PlayerPrefs.GetInt("OpponentScore").ToString();
		}
		if (PlayerScore) {
			PlayerScore.text = PlayerPrefs.GetInt("PlayerScore").ToString();
		}
		if (Application.loadedLevelName == "AI") {
			if (PlayerPrefs.GetInt("PlayerScore") == 10) {
				PlayerPrefs.SetString("GameOver", "true");
				Final.text = "A.I. WINS";
				End.SetActive(true);
				
			}else if (PlayerPrefs.GetInt("OpponentScore") == 10) {
				PlayerPrefs.SetString("GameOver", "true");
				Final.text = "A.I. WINS";
				End.SetActive(true);
			}
		}else if (Application.loadedLevelName == "TournamentGame") {
			if (PlayerPrefs.GetInt("PlayerScore") == 10) {
				PlayerPrefs.SetString("GameOver", "true");
				Final.text = "PLAYER 2 WINS";
				End.SetActive(true); 
				PlayerPrefs.SetInt("Victor", PlayerPrefs.GetInt("Level" + PlayerPrefs.GetString("MatchLevel") + PlayerPrefs.GetInt("Player2#")));
			}else if (PlayerPrefs.GetInt("OpponentScore") == 10) {
				PlayerPrefs.SetString("GameOver", "true");
				Final.text = "PLAYER 1 WINS";
				End.SetActive(true);
				PlayerPrefs.SetInt("Victor", PlayerPrefs.GetInt("Level" + PlayerPrefs.GetString("MatchLevel") + PlayerPrefs.GetInt("Player1#")));
			}
		}else if (Application.loadedLevelName != "Endless") {
			if (PlayerPrefs.GetString("GameOver") == "Opponent" || PlayerPrefs.GetInt("PlayerScore") == 10) {
				PlayerPrefs.SetString("GameOver", "true");
				Final.text = "Victory";
				End.SetActive(true);
			}else if (PlayerPrefs.GetString("GameOver") == "Player" || PlayerPrefs.GetInt("OpponentScore") == 10) {
				PlayerPrefs.SetString("GameOver", "true");
				Final.text = "You Lose";
				End.SetActive(true);
			}
		}
	}
}

function EXIT () {
	PlayerPrefKilla();
	Application.LoadLevel("MainMenu");
}

function RELOAD () {
	PlayerPrefKilla();
	End.SetActive(false);
	Final.text = "";
	Application.LoadLevel(Application.loadedLevelName);
}

function PlayerPrefKilla () { //For when leaving a game
	PlayerPrefs.SetInt("PlayerScore", 0);
	PlayerPrefs.SetInt("OpponentScore", 0);
	PlayerPrefs.SetInt("BounceCount", 0);
	PlayerPrefs.SetInt("Player", Random.Range(1, 8));
	PlayerPrefs.SetInt("Opponent", Random.Range(1, 8));
	PlayerPrefs.SetString("GameOver", "false");
}

function STARTTOURNAMENT () {
	Application.LoadLevel("TournamentGame");
}

function NEXTMATCH () {
	if (PlayerPrefs.GetString("MatchLevel") == "A") {
		PlayerPrefs.SetInt("LevelB" + (PlayerPrefs.GetInt("Player2#") / 2), PlayerPrefs.GetInt("Victor"));
		if (PlayerPrefs.GetInt("Player2#") == 8) {
			PlayerPrefs.SetString("MatchLevel", "B");
			PlayerPrefs.SetInt("Player1#", -1); //The bottom part will add to it
			PlayerPrefs.SetInt("Player2#", 0);
			PlayerPrefs.SetInt("Match#", 0);
		}
	}else if (PlayerPrefs.GetString("MatchLevel") == "B") {
		PlayerPrefs.SetInt("LevelC" + (PlayerPrefs.GetInt("Player2#") / 2), PlayerPrefs.GetInt("Victor"));
		if (PlayerPrefs.GetInt("Player2#") == 4) {
			PlayerPrefs.SetString("MatchLevel", "C");
			PlayerPrefs.SetInt("Player1#", -1);
			PlayerPrefs.SetInt("Player2#", 0);
			PlayerPrefs.SetInt("Match#", 0);
		}
	}else if (PlayerPrefs.GetString("MatchLevel") == "C") {
		PlayerPrefs.SetInt("LevelD1", PlayerPrefs.GetInt("Victor"));
		PlayerPrefs.SetString("MatchLevel", "D");
		PlayerPrefs.SetInt("Player1#", -1);
		PlayerPrefs.SetInt("Player2#", 0);
		PlayerPrefs.SetInt("Match#", 0);
		Application.LoadLevel("TournamentWinner");
	}
	PlayerPrefs.SetInt("Player1#", PlayerPrefs.GetInt("Player1#") + 2);
	PlayerPrefs.SetInt("Player2#", PlayerPrefs.GetInt("Player2#") + 2);
	PlayerPrefs.SetInt("Match#", PlayerPrefs.GetInt("Match#") + 1);
	PlayerPrefs.SetInt("PlayerScore", 0);
	PlayerPrefs.SetInt("OpponentScore", 0);
	if (PlayerPrefs.GetString("MatchLevel") != "D") {
		Application.LoadLevel("TournamentBracket");
	}
}