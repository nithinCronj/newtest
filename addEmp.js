
function addEmp(){
    const id=document.getElementById("id").value;
const name=document.getElementById("name").value;
const age=document.getElementById("age").value;
const salary=document.getElementById("salary").value;
const email=document.getElementById("email").value;
fetch("http://192.168.1.42:3000/addEmp", {
		method: "POST",
		body: JSON.stringify({
            id:id,
			name: name,
			age: age,
            salary:salary,
            email:email,
		}),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}