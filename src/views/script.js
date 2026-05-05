const API = window.location.origin;
let token = localStorage.getItem("token") || "";

document.addEventListener("DOMContentLoaded", () => {
  updateAuthUI();
  loadEvents();
});

function setToken(value) {
  token = value || "";
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  updateAuthUI();
}

function updateAuthUI() {
  const status = document.getElementById("userStatus");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const eventArea = document.getElementById("eventArea");

  if (token) {
    status.innerText = "Usuário autenticado.";
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    eventArea.style.display = "block";
  } else {
    status.innerText = "Faça login ou cadastre-se para criar eventos.";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    eventArea.style.display = "block";
  }
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

async function registerUser() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.erro || "Erro ao cadastrar usuário.");
    return;
  }

  alert("Cadastro realizado com sucesso. Faça login.");
  showLogin();
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.erro || "Erro ao fazer login.");
    return;
  }

  setToken(data.token);
  alert("Login realizado com sucesso.");
  loadEvents();
}

function logout() {
  setToken("");
  alert("Você saiu.");
}

function authHeader() {
  return token ? `Bearer ${token}` : "";
}

async function createEventRequest() {
  if (!token) {
    alert("Faça login antes de criar um evento.");
    return;
  }

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title) {
    alert("O título do evento é obrigatório.");
    return;
  }

  try {
    const res = await fetch(`${API}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader()
      },
      body: JSON.stringify({ title, description })
    });

    if (!res.ok) {
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = { erro: text }; }
      alert(data.erro || "Erro ao criar evento.");
      console.error("createEventRequest error:", text);
      return;
    }

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    loadEvents();
  } catch (error) {
    alert("Erro ao criar evento: " + error.message);
    console.error(error);
  }
}

async function loadEvents() {
  const res = await fetch(`${API}/events`);
  const data = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  if (!data || !data.length) {
    const empty = document.createElement("p");
    empty.className = "event-description";
    empty.innerText = "Nenhum evento cadastrado ainda.";
    lista.appendChild(empty);
    return;
  }

  data.forEach(event => {
    const li = document.createElement("li");

    const titleEl = document.createElement("div");
    titleEl.className = "event-title";
    titleEl.innerText = event.title;

    const descriptionEl = document.createElement("div");
    descriptionEl.className = "event-description";
    descriptionEl.innerText = event.description || "Sem descrição";

    li.appendChild(titleEl);
    li.appendChild(descriptionEl);

    if (token) {
      const actions = document.createElement("div");
      actions.className = "event-actions";

      const editButton = document.createElement("button");
      editButton.className = "muted";
      editButton.innerText = "Editar";
      editButton.onclick = () => editEvent(event._id, event.title, event.description);
      actions.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.className = "danger";
      deleteButton.innerText = "Excluir";
      deleteButton.onclick = () => deleteEvent(event._id);
      actions.appendChild(deleteButton);

      li.appendChild(actions);
    }

    lista.appendChild(li);
  });
}

async function deleteEvent(id) {
  if (!token) {
    alert("Faça login antes de excluir um evento.");
    return;
  }

  const res = await fetch(`${API}/events/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": authHeader()
    }
  });

  if (!res.ok) {
    const data = await res.json();
    alert(data.erro || "Erro ao excluir evento.");
    return;
  }

  loadEvents();
}

async function editEvent(id, title, description) {
  if (!token) {
    alert("Faça login antes de editar um evento.");
    return;
  }

  const newTitle = prompt("Novo título", title);
  const newDescription = prompt("Nova descrição", description || "");

  if (!newTitle) return;

  const res = await fetch(`${API}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader()
    },
    body: JSON.stringify({ title: newTitle, description: newDescription })
  });

  if (!res.ok) {
    const data = await res.json();
    alert(data.erro || "Erro ao atualizar evento.");
    return;
  }

  loadEvents();
}