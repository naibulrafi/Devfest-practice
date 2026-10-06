let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

let bangla = localStorage.getItem("language") === "bn";

function saveComplaints() {

localStorage.setItem(
"complaints",
JSON.stringify(complaints)
);

}

function addComplaint() {

const title =
document.getElementById("title").value.trim();

const category =
document.getElementById("category").value.trim();

const location =
document.getElementById("location").value.trim();

const description =
document.getElementById("description").value.trim();

if (
title === "" ||
category === "" ||
location === "" ||
description === ""
) {

alert(
bangla
? "সবগুলো ঘর পূরণ করুন"
: "Please fill all fields"
);

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

saveComplaints();

document.getElementById("title").value = "";

document.getElementById("category").value = "";

document.getElementById("location").value = "";

document.getElementById("description").value = "";

displayComplaints();

}

function displayComplaints() {

const list =
document.getElementById("complaintList");

const search =
document.getElementById("search").value.toLowerCase();

list.innerHTML = "";

const filtered = complaints.filter(function(complaint) {

return (
complaint.title.toLowerCase().includes(search) ||
complaint.category.toLowerCase().includes(search) ||
complaint.location.toLowerCase().includes(search)
);

});

filtered.forEach(function(complaint) {

const statusText =
complaint.status === "Pending"
? (bangla ? "অপেক্ষমাণ" : "Pending")
: (bangla ? "সমাধান হয়েছে" : "Resolved");

list.innerHTML += `

<div class="complaint">

<h3>${complaint.title}</h3>

<p>
<strong>${bangla ? "বিষয়" : "Category"}:</strong>
${complaint.category}
</p>

<p>
<strong>${bangla ? "স্থান" : "Location"}:</strong>
${complaint.location}
</p>

<p>
${complaint.description}
</p>

<p>
<strong>${bangla ? "অবস্থা" : "Status"}:</strong>
${statusText}
</p>

<button onclick="resolveComplaint(${complaint.id})">
${bangla ? "সমাধান করুন" : "Resolve"}
</button>

<button onclick="deleteComplaint(${complaint.id})">
${bangla ? "মুছুন" : "Delete"}
</button>

</div>

`;

});

updateStats();

}

function resolveComplaint(id) {

const complaint =
complaints.find(function(complaint) {

return complaint.id === id;

});

if (complaint) {

complaint.status = "Resolved";

saveComplaints();

displayComplaints();

}

}

function deleteComplaint(id) {

complaints =
complaints.filter(function(complaint) {

return complaint.id !== id;

});

saveComplaints();

displayComplaints();

}

function updateStats() {

document.getElementById("totalCount").textContent =
complaints.length;

const pending =
complaints.filter(function(complaint) {

return complaint.status === "Pending";

}).length;

const resolved =
complaints.filter(function(complaint) {

return complaint.status === "Resolved";

}).length;

document.getElementById("pendingCount").textContent =
pending;

document.getElementById("resolvedCount").textContent =
resolved;

}

function changeLanguage() {

bangla = !bangla;

localStorage.setItem(
"language",
bangla ? "bn" : "en"
);

updateLanguage();

displayComplaints();

}

function updateLanguage() {

document.getElementById("appTitle").textContent =
bangla
? "ক্যাম্পাস অভিযোগ ব্যবস্থাপনা"
: "Campus Complaint Manager";

document.getElementById("appSubtitle").textContent =
bangla
? "সহজে আপনার ক্যাম্পাসের অভিযোগ পরিচালনা করুন"
: "Manage your campus complaints easily";

document.getElementById("languageBtn").textContent =
bangla
? "English"
: "বাংলা";

document.getElementById("totalLabel").textContent =
bangla
? "মোট"
: "Total";

document.getElementById("pendingLabel").textContent =
bangla
? "অপেক্ষমাণ"
: "Pending";

document.getElementById("resolvedLabel").textContent =
bangla
? "সমাধান হয়েছে"
: "Resolved";

document.getElementById("addTitle").textContent =
bangla
? "অভিযোগ যোগ করুন"
: "Add Complaint";

document.getElementById("title").placeholder =
bangla
? "অভিযোগের শিরোনাম"
: "Complaint title";

document.getElementById("category").placeholder =
bangla
? "বিষয়"
: "Category";

document.getElementById("location").placeholder =
bangla
? "স্থান"
: "Location";

document.getElementById("description").placeholder =
bangla
? "বিস্তারিত লিখুন"
: "Description";

document.getElementById("addButton").textContent =
bangla
? "অভিযোগ যোগ করুন"
: "Add Complaint";

document.getElementById("complaintTitle").textContent =
bangla
? "অভিযোগসমূহ"
: "Complaints";

document.getElementById("search").placeholder =
bangla
? "অভিযোগ খুঁজুন..."
: "Search complaint...";

}

updateLanguage();

displayComplaints();
