

function getEmploye() {
	fetch("http://192.168.1.42:3000/getAll", {
		method: "GET",
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			// show all user to the html page
			const html = json.map((user) => {
				return `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.salary}</td>
            <td>${user.email}</td>
            </tr>`;
			});
			document.getElementById("div1").innerHTML = html;
		});
}
getEmploye();
