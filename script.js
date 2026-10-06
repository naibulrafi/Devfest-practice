console.log("Campus Complaint Manager started");

let complaints = [];

function addComplaint(title, category, location, description) {
    const complaint = {
        id: Date.now(),
        title: title,
        category: category,
        location: location,
        description: description,
        status: "Pending"
    };

    complaints.push(complaint);
    console.log("Complaint added:", complaint);
}

function deleteComplaint(id) {
    complaints = complaints.filter(function(complaint) {
        return complaint.id !== id;
    });
}

function resolveComplaint(id) {
    const complaint = complaints.find(function(complaint) {
        return complaint.id === id;
    });

    if (complaint) {
        complaint.status = "Resolved";
    }
}
