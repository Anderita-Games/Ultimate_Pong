#pragma strict

function Start () {
	while (1 > 0) {
		transform.GetComponent.<Renderer>().material.color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f));
		yield WaitForSeconds (1);
	}
}
