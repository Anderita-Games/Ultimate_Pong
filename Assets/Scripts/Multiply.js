#pragma strict
var Last : int;
var Ball : GameObject;

function Start () {
	Last = PlayerPrefs.GetInt("BounceCount");
}

function Update () {
	if (PlayerPrefs.GetInt("BounceCount") > Last && PlayerPrefs.GetString("GameOver") != "Opponent" && PlayerPrefs.GetString("GameOver") != "Player") {
		Instantiate(Ball, transform.position, Quaternion.Euler(0, 0, 0));
	}
	Last = PlayerPrefs.GetInt("BounceCount");
}

function OnCollisionEnter (col : Collision) {
	if (col.collider.name == "OpponentL") {
		PlayerPrefs.SetString("GameOver", "Opponent");
	}else if (col.collider.name == "PlayerL") {
		PlayerPrefs.SetString("GameOver", "Player");
	}
}