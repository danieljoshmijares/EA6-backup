// Base API URL - Matched with server port number
const API_URL = 'mongodb://127.0.0.1:27017/employeeDB';

// DOM Elements
const addForm = document.getElementById('addForm');
const searchForm = document.getElementById('searchForm');
const updateForm = document.getElementById('updateForm');
const deleteForm = document.getElementById('deleteForm');

// Handle Add Record
addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resultDiv = document.getElementById('addResult');
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                empid: addForm.empid.value,
                empname: addForm.empname.value,
                position: addForm.position.value,
                department: addForm.department.value,
                salary: parseFloat(addForm.salary.value)
            })
        });

        const data = await response.json();
        if (response.ok) {
            resultDiv.innerHTML = `<p style="color:green">Success: ${data.message}</p>`;
            addForm.reset();
        } else {
            throw new Error(data.error || 'Failed to add record');
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
    }
});

// Handle Search Record
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resultDiv = document.getElementById('searchResult');
    const empid = searchForm.empid.value;
    
    try {
        const response = await fetch(`${API_URL}/${empid}`);
        const data = await response.json();
        
        if (response.ok) {
            resultDiv.innerHTML = `
                <p><strong>Employee Found:</strong></p>
                <p>ID: ${data.empid}</p>
                <p>Name: ${data.empname}</p>
                <p>Position: ${data.position}</p>
                <p>Department: ${data.department}</p>
                <p>Salary: $${data.salary}</p>
            `;
        } else {
            throw new Error(data.error || 'Employee not found');
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
    }
});

// Handle Update Record
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resultDiv = document.getElementById('updateResult');
    const empid = updateForm.empid.value;
    
    // Prepare update data (only include provided fields)
    const updateData = {};
    if (updateForm.empname.value) updateData.empname = updateForm.empname.value;
    if (updateForm.position.value) updateData.position = updateForm.position.value;
    if (updateForm.department.value) updateData.department = updateForm.department.value;
    if (updateForm.salary.value) updateData.salary = parseFloat(updateForm.salary.value);
    
    try {
        const response = await fetch(`${API_URL}/${empid}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });

        const data = await response.json();
        if (response.ok) {
            resultDiv.innerHTML = `<p style="color:green">${data.message}</p>`;
            updateForm.reset();
        } else {
            throw new Error(data.error || 'Update failed');
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
    }
});

// Handle Delete Record
deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resultDiv = document.getElementById('deleteResult');
    const empid = deleteForm.empid.value;
    
    try {
        const response = await fetch(`${API_URL}/${empid}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        if (response.ok) {
            resultDiv.innerHTML = `<p style="color:green">${data.message}</p>`;
            deleteForm.reset();
        } else {
            throw new Error(data.error || 'Delete failed');
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
    }
});