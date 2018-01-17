#pragma strict
var xlocation : int; //For variable level
var Ball : GameObject;

function Start () {
	Ball = GameObject.Find("Ball");
	while (1 > 0) {
		if (Application.loadedLevelName == "Variable") {
			xlocation = Random.Range(7, 10);
			yield WaitForSeconds (2);
		}else {
			yield WaitForSeconds (100); //So the app wont crash
		}
	}
}

function Update () {
	//Random X SHIFTING
	if (Application.loadedLevelName == "Variable") {
		GetComponent.<Rigidbody>().velocity.x = (xlocation - transform.position.x) * 2; 
	}
	//CONTROLS AND STOPPING CONDITIONS
	if (PlayerPrefs.GetInt(transform.name) != 0 && Application.loadedLevelName == "TournamentGame") {
	
	}else if (PlayerPrefs.GetString("GameOver") == "false") {
		if (Input.GetKey (KeyCode.UpArrow)) {
			GetComponent.<Rigidbody>().velocity.y = 8;
		}else if (Input.GetKey (KeyCode.DownArrow)) {
			GetComponent.<Rigidbody>().velocity.y = -8;
		}else if (Input.GetMouseButton(0)) {
			if ((Input.mousePosition.y / (Screen.height/22.4) - 2) == (transform.transform.position.y + 8.75)) {
				GetComponent.<Rigidbody>().velocity.y = 0;
			}else if ((Input.mousePosition.y / (Screen.height/22.4) - 2) - (transform.transform.position.y + 8.75) > 0) {
				GetComponent.<Rigidbody>().velocity.y = 8;
			}else if ((Input.mousePosition.y / (Screen.height/22.4) - 2) - (transform.transform.position.y + 8.75) < 0) {
				GetComponent.<Rigidbody>().velocity.y = -8;
			}else {
				GetComponent.<Rigidbody>().velocity.y = 0;
			}
		}else {
			GetComponent.<Rigidbody>().velocity.y = 0;
		}
	}
	//POSITION STUFF
	if (Application.loadedLevelName == "Hard") {
		if(transform.position.y < -9.25) {
			GetComponent.<Rigidbody>().velocity.y = 0;
			transform.position.y = -9.25;
		}else if(transform.position.y > 9.25) {
			GetComponent.<Rigidbody>().velocity.y = 0;
			transform.position.y = 9.25;
		}
	}else if (Application.loadedLevelName == "Easy") {
		if(transform.position.y < -7.75) {
			GetComponent.<Rigidbody>().velocity.y = 0;
			transform.position.y = -7.75;
		}else if(transform.position.y > 7.75) {
			GetComponent.<Rigidbody>().velocity.y = 0;
			transform.position.y = 7.75;
		}
	}else {
		if(transform.position.y < -8.75) {
			GetComponent.<Rigidbody>().velocity.y = 0;
			transform.position.y = -8.75;
		}else if(transform.position.y > 8.75) {
			GetComponent.<Rigidbody>().velocity.y = 0;
			transform.position.y = 8.75;
		}
	}
}