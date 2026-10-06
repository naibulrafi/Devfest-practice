let complaints = [];

function addComplaint() {
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    if (title === "" || category === "" || location === "" || description === "") {
        alert("Please fill all fields");
        return;
    }

    const complaint = {
        id: Date.now(),
        title: title,
        category: category,
        location: location,
        description: description,
        status: "Pending"
    };

    complaints.push(complaint);

    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("location").value = "";
    document.getElementById("description").value = "";

    displayComplaints();
}

function displayComplaints() {
    const list = document.getElementById("complaintList");
    const search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    const filtered = complaints.filter(function(complaint) {
        return complaint.title.toLowerCase().includes(search) ||
               complaint.category.toLowerCase().includes(search);
    });

    filtered.forEach(function(complaint) {
        list.innerHTML += `
            <div class="complaint">
                <h3>${complaint.title}</h3>
                <p>Category: ${complaint.category}</p>
                <p>Location: ${complaint.location}</p>
                <p>${complaint.description}</p>
                <p>Status: ${complaint.status}</p>

                <button onclick="resolveComplaint(${complaint.id})">
                    Resolve
                </button>

                <button onclick="deleteComplaint(${complaint.id})">
                    Delete
                </button>
            </div>
        `;
    });

    updateStats();
}

function resolveComplaint(id) {
    const complaint = complaints.find(function(complaint) {
        return complaint.id === id;
    });

    if (complaint) {
        complaint.status = "Resolved";
        displayComplaints();
    }
}

function deleteComplaint(id) {
    complaints = complaints.filter(function(complaint) {
        return complaint.id !== id;
    });

    displayComplaints();
}

function updateStats() {
    document.getElementById("totalCount").textContent = complaints.length;

    const pending = complaints.filter(function(complaint) {
        return complaint.status === "Pending";
    }).length;

    const resolved = complaints.filter(function(complaint) {
        return complaint.status === "Resolved";
    }).length;

    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("resolvedCount").textContent = resolved;
}

displayComplaints();
