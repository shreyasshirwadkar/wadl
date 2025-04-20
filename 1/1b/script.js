const form = document.getElementById("registrationForm");
const userTable = document.getElementById("userTable");
const dataListDiv = document.getElementById("dataList");

let users = JSON.parse(localStorage.getItem("users")) || [];

function updateTable() {
  userTable.innerHTML = "";
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
    userTable.appendChild(row);
  });
  dataListDiv.classList.remove("d-none");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("All fields are required!");
    return;
  }

  const userData = { name, email, password };

  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));

  updateTable();

  try {
    const response = await fetch("https://example.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    console.log("Server Response:", result);
  } catch (error) {
    console.error("Error sending data:", error);
  }

  form.reset();
});

if (users.length) {
  updateTable();
}
