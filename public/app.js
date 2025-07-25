// RELATIVE API PATH 
const API_URL = '/api/employees';

// Forms
const addForm = document.getElementById('addForm');
const searchForm = document.getElementById('searchForm');
const updateForm = document.getElementById('updateForm');
const deleteForm = document.getElementById('deleteForm');

// Clear buttons
document.getElementById('clearAdd').onclick = () => { addForm.reset(); document.getElementById('addResult').innerHTML = ''; };
document.getElementById('clearSearch').onclick = () => { searchForm.reset(); document.getElementById('searchResult').innerHTML = ''; };
document.getElementById('clearUpdate').onclick = () => { updateForm.reset(); document.getElementById('updateResult').innerHTML = ''; };
document.getElementById('clearDelete').onclick = () => { deleteForm.reset(); document.getElementById('deleteResult').innerHTML = ''; };

// Add
addForm.addEventListener('submit', async e => {
  e.preventDefault();
  const resDiv = document.getElementById('addResult');
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        empid: addForm.empid.value,
        firstname: addForm.firstname.value,
        middlename: addForm.middlename.value,
        lastname: addForm.lastname.value,
        position: addForm.position.value,
        department: addForm.department.value,
        salary: parseFloat(addForm.salary.value)
      })
    });
    const data = await response.json();
    resDiv.innerHTML = response.ok ? `<p style="color:green">${data.message}</p>` : `<p style="color:red">${data.error}</p>`;
    if (response.ok) addForm.reset();
  } catch (err) {
    resDiv.innerHTML = `<p style="color:red">${err}</p>`;
  }
});

// Search
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const resDiv = document.getElementById('searchResult');
  const empid = searchForm.empid.value;
  try {
    const response = await fetch(`${API_URL}/${empid}`);
    const data = await response.json();
    resDiv.innerHTML = response.ok
      ? `<p>ID: ${data.empid}</p>
         <p>First: ${data.firstname}</p>
         <p>Middle: ${data.middlename || ''}</p>
         <p>Last: ${data.lastname}</p>
         <p>Position: ${data.position}</p>
         <p>Department: ${data.department}</p>
         <p>Salary: ${data.salary}</p>`
      : `<p style="color:red">${data.error}</p>`;
  } catch (err) {
    resDiv.innerHTML = `<p style="color:red">${err}</p>`;
  }
});

// Update
updateForm.addEventListener('submit', async e => {
  e.preventDefault();
  const resDiv = document.getElementById('updateResult');
  const empid = updateForm.empid.value;
  const body = {};
  if (updateForm.firstname.value) body.firstname = updateForm.firstname.value;
  if (updateForm.middlename.value) body.middlename = updateForm.middlename.value;
  if (updateForm.lastname.value) body.lastname = updateForm.lastname.value;
  if (updateForm.position.value) body.position = updateForm.position.value;
  if (updateForm.department.value) body.department = updateForm.department.value;
  if (updateForm.salary.value) body.salary = parseFloat(updateForm.salary.value);

  try {
    const response = await fetch(`${API_URL}/${empid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    resDiv.innerHTML = response.ok ? `<p style="color:green">${data.message}</p>` : `<p style="color:red">${data.error}</p>`;
    if (response.ok) updateForm.reset();
  } catch (err) {
    resDiv.innerHTML = `<p style="color:red">${err}</p>`;
  }
});

// Delete
deleteForm.addEventListener('submit', async e => {
  e.preventDefault();
  const resDiv = document.getElementById('deleteResult');
  const empid = deleteForm.empid.value;
  try {
    const response = await fetch(`${API_URL}/${empid}`, { method: 'DELETE' });
    const data = await response.json();
    resDiv.innerHTML = response.ok ? `<p style="color:green">${data.message}</p>` : `<p style="color:red">${data.error}</p>`;
    if (response.ok) deleteForm.reset();
  } catch (err) {
    resDiv.innerHTML = `<p style="color:red">${err}</p>`;
  }
});
