const baseUrl = window.location.origin;
let token = null;

function clearForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
}

function toggleOutput() {

    const output = document.getElementById("output");

    if (output.style.display === "block") {
        output.style.display = "none";
    } else {
        output.style.display = "block";
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);

    if (data.token) {
        token = data.token;
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("status").innerHTML = "<h2>Registrado</h2>";
    } else {
        document.getElementById("status").innerHTML = "<p>Error en login</p>";
    }
}

async function getAll() {
    const res = await fetch(`${baseUrl}/api/products`);
    document.getElementById("output").textContent = JSON.stringify(await res.json(), null, 2);
}

async function getById() {
    const id = document.getElementById("searchId").value || undefined;
    const res = await fetch(`${baseUrl}/api/products/${id}`);
    document.getElementById("output").textContent = JSON.stringify(await res.json(), null, 2);
}

async function createProduct() {
    if (!token) return alert("Debes iniciar sesión como admin");

    const body = {
        id: document.getElementById("createId").value || undefined,
        name: document.getElementById("createName").value,
        price: Number(document.getElementById("createPrice").value),
        stock: Number(document.getElementById("createStock").value),
        description: document.getElementById("createDescription").value || ""
    };

    const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

async function updateProduct() {
    if (!token) return alert("Debes iniciar sesión como admin");

    const id = document.getElementById("updateId").value || undefined;
    const body = {
        name: document.getElementById("updateName").value,
        price: Number(document.getElementById("updatePrice").value),
        stock: Number(document.getElementById("updateStock").value),
        description: document.getElementById("updateDescription").value || ""
    };

    const res = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

async function deleteProduct() {
    if (!token) return alert("Debes iniciar sesión como admin");

    const id = document.getElementById("deleteId").value;

    const res = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });

    document.getElementById("output").textContent = JSON.stringify(await res.json(), null, 2);
}