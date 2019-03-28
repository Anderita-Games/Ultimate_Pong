#pragma strict
var Ball : GameObject;
var Last : float;
var switcher : int;
var angle : float; 

function Start () {
	Ball = GameObject.Find("Ball");
	if (Ball) {
		Last = Ball.transform.position.x * switcher;
	}
	if (transform.name == "Opponent" || transform.name == "Player1") {
		switcher = 1;
	}else if (transform.name == "Player" || transform.name == "Player2") {
		switcher = -1;
	}
	if (Application.loadedLevelName != "AI" && Application.loadedLevelName != "Variable") {
		PlayerPrefs.SetInt("Opponent", 1); //Set common games to basic AI
	}
}

function Update () { 
	if (PlayerPrefs.GetInt(transform.name) == 1) {
		if (Application.loadedLevelName == "AI" || Application.loadedLevelName == "TournamentBracket" || Application.loadedLevelName == "TournamentGame" || Application.loadedLevelName == "TournamentWinner") {
				transform.GetComponent.<Renderer>().material.color = Color(0, 0, 1);
		}
	}else if (PlayerPrefs.GetInt(transform.name) == 2) { 
		transform.GetComponent.<Renderer>().material.color = Color(.9, .6, .3);
	}else if (PlayerPrefs.GetInt(transform.name) == 3) { 
		transform.GetComponent.<Renderer>().material.color = Color(1, 1, 0);
	}else if (PlayerPrefs.GetInt(transform.name) == 4) { 
		transform.GetComponent.<Renderer>().material.color = Color(0, 1, 1);
	}else if (PlayerPrefs.GetInt(transform.name) == 5) { 
		transform.GetComponent.<Renderer>().material.color = Color(1, 0, 1);
	}else if (PlayerPrefs.GetInt(transform.name) == 6) { 
		transform.GetComponent.<Renderer>().material.color = Color(0, 1, 0);
	}else if (PlayerPrefs.GetInt(transform.name) == 7) {
		transform.GetComponent.<Renderer>().material.color = Color(1, 0, 0);
	}
	//THE AI STUFF
	if (PlayerPrefs.GetString("GameOver") == "false" && Ball) {
		if (PlayerPrefs.GetInt(transform.name) == 1) { //THE NORMAL ONE
			GetComponent.<Rigidbody>().velocity.y = (Ball.transform.position.y - transform.position.y) * 8;
		}else if (PlayerPrefs.GetInt(transform.name) == 2) { 
			GetComponent.<Rigidbody>().velocity.y = (Ball.transform.position.y - transform.position.y) * 8;
			GetComponent.<Rigidbody>().velocity.x = (Ball.transform.position.x - (2 * switcher)) * 20;
		}else if (PlayerPrefs.GetInt(transform.name) == 3) { 
			if ((Ball.transform.position.x * switcher) > Last) { //Ball is going away
				GetComponent.<Rigidbody>().velocity.y = (0 - transform.position.y);
				GetComponent.<Rigidbody>().velocity.x = (Ball.transform.position.x * 2) * switcher;
			}else if ((Ball.transform.position.x * switcher) < Last) { //Ball is incoming
				GetComponent.<Rigidbody>().velocity.y = (Ball.transform.position.y - transform.position.y) * 20;
				GetComponent.<Rigidbody>().velocity.x = (-10 - (transform.position.x * switcher));
			}
		}else if (PlayerPrefs.GetInt(transform.name) == 4) { 
			if ((Ball.transform.position.x * switcher) > Last) {
				GetComponent.<Rigidbody>().velocity.y = 0 - transform.position.y;
				GetComponent.<Rigidbody>().velocity.x = (-5 - transform.position.x) * switcher;
			}else if ((Ball.transform.position.x * switcher) < Last) {
				GetComponent.<Rigidbody>().velocity.y = (Ball.transform.position.y - transform.position.y) * 20;
				GetComponent.<Rigidbody>().velocity.x = (-5 + (Ball.transform.position.x * switcher));
			}
		}else if (PlayerPrefs.GetInt(transform.name) == 5) {
			if ((Ball.transform.position.x * switcher) > Last) {
				GetComponent.<Rigidbody>().velocity.y = 0 - transform.position.y;
				angle = Random.Range(-1.0f, 1.0f); 
			}else if ((Ball.transform.position.x * switcher) < Last) {
				GetComponent.<Rigidbody>().velocity.y = (Ball.transform.position.y - transform.position.y + angle) * 20;
			}
		}else if (PlayerPrefs.GetInt(transform.name) == 6) {
			transform.GetComponent.<Renderer>().material.color = Color(0, 1, 0);
			if (Ball) {
				if ((Ball.transform.position.x * switcher) > Last) {
					GetComponent.<Rigidbody>().velocity.y = 0 - transform.position.y;
					GetComponent.<Rigidbody>().velocity.x = (-5 - transform.position.x) * switcher;
					angle = Random.Range(-1.0f, 1.0f); 
				}else if ((Ball.transform.position.x * switcher) < Last) {
					GetComponent.<Rigidbody>().velocity.y = (Ball.transform.position.y - transform.position.y + angle) * 20;
					GetComponent.<Rigidbody>().velocity.x = (-5 + (Ball.transform.position.x * switcher));
				}
			}
		}else if (PlayerPrefs.GetInt(transform.name) == 7) {
			if ((Ball.transform.position.x * switcher) > Last) {
				GetComponent.<Rigidbody>().velocity.y = (Ball.transform.position.y - transform.position.y) * -.5;
				GetComponent.<Rigidbody>().velocity.x = -5 - transform.position.x;
				angle = Random.Range(-1.0f, 1.0f); 
			}else if ((Ball.transform.position.x * switcher) < Last) {
				GetComponent.<Rigidbody>().velocity.y = (Ball.transform.position.y - transform.position.y + angle) * 20;
				GetComponent.<Rigidbody>().velocity.x = (-5 + (Ball.transform.position.x * switcher));
			}
		}
		Last = Ball.transform.position.x * switcher;
	}

	if (GetComponent.<Rigidbody>()) {
		//SPEED CONTROL STUFF
		if (GetComponent.<Rigidbody>().velocity.y > 8) {
			GetComponent.<Rigidbody>().velocity.y = 8;
		}else if (GetComponent.<Rigidbody>().velocity.y < -8) {
			GetComponent.<Rigidbody>().velocity.y = -8;
		}
		if (GetComponent.<Rigidbody>().velocity.x > 8) {
			GetComponent.<Rigidbody>().velocity.x = 8;
		}else if (GetComponent.<Rigidbody>().velocity.x < -8) {
			GetComponent.<Rigidbody>().velocity.x = -8;
		}
		//POSITION STUFF 
		if(transform.position.y < -8.75) {
			GetComponent.<Rigidbody>().velocity.y = 0;
			transform.position.y = -8.75;
		}else if(transform.position.y > 8.75) {
			GetComponent.<Rigidbody>().velocity.y = 0;
			transform.position.y = 8.75;
		}
		if (switcher == 1) { //X is dependent on side
			if(transform.position.x < -10) {
				GetComponent.<Rigidbody>().velocity.x = 0;
				transform.position.x = -10;
			}else if(transform.position.x > -2) {
				GetComponent.<Rigidbody>().velocity.y = 0;
				transform.position.x = -2;
			}
		}else if (switcher == -1) {
			if(transform.position.x > 10) {
				GetComponent.<Rigidbody>().velocity.x = 0;
				transform.position.x = 10;
			}else if(transform.position.x < 2) {
				GetComponent.<Rigidbody>().velocity.y = 0;
				transform.position.x = 2;
			}
		}
	}
}