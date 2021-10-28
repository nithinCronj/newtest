

function login() {
	const userName = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	fetch("http://192.168.1.42:3000/login", {
		method: "POST",
		body: JSON.stringify({
			name: userName,
			password: password,
		}),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}
