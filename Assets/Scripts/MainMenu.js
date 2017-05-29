#pragma strict
import System.Collections.Generic;

function Start () {
	PlayerPrefs.SetInt("PlayerScore", 0);
	PlayerPrefs.SetInt("OpponentScore", 0);
	PlayerPrefs.SetInt("BounceCount", 0);
	PlayerPrefs.SetString("GameOver", "false");
}

function Classic () {
	Application.LoadLevel("Classic");
}

function Survival () {
	Application.LoadLevel("Survival");
}

function Speed () {
	Application.LoadLevel("Speed");
}

function COLOR () {
	Application.LoadLevel("Color");
}

function MultiBall () {
	Application.LoadLevel("MultiBall");
}

function Hard () {
	Application.LoadLevel("Hard");
}

function Tournament () {
	var Competitors = 8;
	var TournList = new List.<int>();
	while (Competitors > 0) { //CREATING THE BLOCKS
		var Rando = Random.Range(0,8);
		while(TournList.Contains(Rando)) {
			Rando = Random.Range(0,8);
		} 
    	PlayerPrefs.SetInt("LevelA" + Competitors, Rando);
    	TournList.Add (Rando);
    	Competitors--;
   	}
	TournList.Clear();
	PlayerPrefs.SetInt("Match#", 1);
	PlayerPrefs.SetString("MatchLevel", "A");
	PlayerPrefs.SetInt("Player1#", 1);
	PlayerPrefs.SetInt("Player2#", 2);
	PlayerPrefs.SetInt("LevelB1", 10);
	PlayerPrefs.SetInt("LevelB2", 10);
	PlayerPrefs.SetInt("LevelB3", 10);
	PlayerPrefs.SetInt("LevelB4", 10);
	PlayerPrefs.SetInt("LevelC1", 10);
	PlayerPrefs.SetInt("LevelC2", 10);
	Application.LoadLevel("TournamentBracket");
}

function AI () {
	PlayerPrefs.SetInt("Player", Random.Range(1, 8));
	PlayerPrefs.SetInt("Opponent", Random.Range(1, 8));
	Application.LoadLevel("AI");
}

function Variable () {
	Application.LoadLevel("Variable");
}

function Wall () {
	Application.LoadLevel("Wall");
}

function Endless () {
	Application.LoadLevel("Endless");
}

function Easy () {
	Application.LoadLevel("Easy");
}