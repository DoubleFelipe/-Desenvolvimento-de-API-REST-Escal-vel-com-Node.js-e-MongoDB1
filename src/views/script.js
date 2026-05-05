const API = "http://localhost:3000";

async function createEvent() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch(`${API}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, description })
  });

  loadEvents();
}

async function loadEvents() {
  const res = await fetch(`${API}/events`);
  const data = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(e => {
    const li = document.createElement("li");
    li.innerText = e.title;
    lista.appendChild(li);
  });
}

loadEvents();