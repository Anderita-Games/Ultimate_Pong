#pragma strict
var RandomVar : int; //Starting Angle
var NewAngle : float; //New Angle
var Last : String; //Most Recent Bounce

function Start () {
	RandomVar = Random.Range(1, 3);
	PlayerPrefs.SetString("GameOver", "false");
	if (RandomVar == 1) {
		RandomVar = Random.Range(-10, 10);
	}else if (RandomVar == 2) {
		RandomVar = Random.Range(170, 190);
	}
	transform.Rotate(Vector3.forward * RandomVar);
	if (RandomVar <= 90 || RandomVar >= 270) {
		Last = "Opponent";
	}else {
		Last = "Player";
	}
}

function Update () {
	if (PlayerPrefs.GetString("GameOver") == "true" || PlayerPrefs.GetString("GameOver") == "Player" || PlayerPrefs.GetString("GameOver") == "Opponent") {
		Destroy (gameObject); //ELIMINATE EXCESS
	}else {
		transform.Translate(Vector3.right * 12 * Time.deltaTime);
	}
	if(transform.position.y < -9.5) {
		transform.position.y = -9.5;
	}else if(transform.position.y > 9.5) {
		transform.position.y = 9.5;
	}
	NewAngle += .02;
}

function OnCollisionEnter (col : Collision) {
	if (col.collider.name == "Opponent" || col.collider.name == "Player1") {
		if (Application.loadedLevelName == "Survival" || Application.loadedLevelName == "MainMenu") {
			PlayerPrefs.SetInt("BounceCount", PlayerPrefs.GetInt("BounceCount") + 1); //So it doesnt add to Wall Mode
		}
		Last = "Opponent";
		NewAngle = (transform.position.y - col.transform.position.y) / col.transform.localScale.y; //The bounce angle effect for paddles
		if (NewAngle > 0) {
			NewAngle = (NewAngle * 90) + 360;
		}else if (NewAngle < 0) {
			NewAngle = (NewAngle * 90) + 360;
		}else {
			NewAngle = 180;
		}
		transform.rotation = Quaternion.Euler(0, 0, NewAngle);
	}else if (col.collider.name == "Player" || col.collider.name == "Player2") {
		PlayerPrefs.SetInt("BounceCount", PlayerPrefs.GetInt("BounceCount") + 1);
		Last = "Player";
		NewAngle = (transform.position.y - col.transform.position.y) / col.transform.localScale.y; //The bounce angle effect for paddles
		if (NewAngle > 0) {
			NewAngle = (NewAngle * -90) + 180;
		}else if (NewAngle < 0) {
			NewAngle = (NewAngle * -90) + 180;
		}else {
			NewAngle = 180;
		}
		transform.rotation = Quaternion.Euler(0, 0, NewAngle);
	}else if (col.collider.name == "OpponentL") {
		if (Application.loadedLevelName == "Survival" || Application.loadedLevelName == "Wall") {
			PlayerPrefs.SetString("GameOver", "true");
		}else if (Application.loadedLevelName == "MultiBall") {
			PlayerPrefs.SetInt("PlayerScore", PlayerPrefs.GetInt("PlayerScore") + 1);
		}else {
			PlayerPrefs.SetInt("PlayerScore", PlayerPrefs.GetInt("PlayerScore") + 1);
			Application.LoadLevel(Application.loadedLevelName);
		}
		Destroy (gameObject);
	}else if (col.collider.name == "PlayerL") {
		if (Application.loadedLevelName == "Survival" || Application.loadedLevelName == "Wall") {
			PlayerPrefs.SetString("GameOver", "true");
		}else if (Application.loadedLevelName == "MultiBall") {
			PlayerPrefs.SetInt("OpponentScore", PlayerPrefs.GetInt("OpponentScore") + 1);
		}else { // All the other levels
			PlayerPrefs.SetInt("OpponentScore", PlayerPrefs.GetInt("OpponentScore") + 1);
			Application.LoadLevel(Application.loadedLevelName);
		}
		Destroy (gameObject);
	}else if (col.collider.name == "Ball(Clone)" || col.collider.name == "Ball") { // For multibal game
	
	}else { //The  top and bottom walls
		Bounce();
		transform.rotation = Quaternion.Euler(0, 0, NewAngle);
	}
}

function Bounce () { //The literal cancer of PONG
	if (Last == "Opponent") {
		if (transform.rotation.eulerAngles.z >= 270 && transform.rotation.eulerAngles.z <= 360) {
			NewAngle = 360 - transform.rotation.eulerAngles.z;
		}else if (transform.rotation.eulerAngles.z >= 0 && transform.rotation.eulerAngles.z <= 90) {
			NewAngle = (90 - transform.rotation.eulerAngles.z) + 270;
		}
	}else if (Last == "Player") {
		if (transform.rotation.eulerAngles.z >= 90 && transform.rotation.eulerAngles.z <= 180) {
			NewAngle = (180 - transform.rotation.eulerAngles.z) + 180;
		}else if (transform.rotation.eulerAngles.z >= 180 && transform.rotation.eulerAngles.z <= 270) {
			NewAngle = (270 - transform.rotation.eulerAngles.z) + 90;
		}
	}
}