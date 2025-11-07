 const form = document.getElementById('addForm');
const nameInput = form.elements.specialite;
const tableBody = document.getElementById('specialiteTableBody');

let rowBeingEdited = null;

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  if (name === '') return;

  if (rowBeingEdited) {
    
    rowBeingEdited.querySelector('.specialite-name').textContent = name;
    rowBeingEdited = null;
    form.querySelector('button[type="submit"]').textContent = 'Submit';
  } else {
    
    addRow(name);
  }

  nameInput.value = '';
  nameInput.focus();
});

 





function addRow(name) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td class="px-6 py-4 text-gray-900 specialite-name">${name}</td>
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <button class="btn-edit inline-grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
          <svg class="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L19.3 4.22a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.9-1.76z" />
          </svg>
        </button>
        <button class="btn-delete inline-grid h-9 w-9 place-items-center rounded-lg bg-rose-600 text-white hover:bg-rose-500">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm-1 6h2v9H8V9zm4 0h2v9h-2V9z" />
          </svg>
        </button>
      </div>
    </td>
    `
  ;

  const editButton = row.querySelector('.btn-edit');
  const deleteButton = row.querySelector('.btn-delete');

  editButton.addEventListener('click', function () {
    rowBeingEdited = row;
    nameInput.value = row.querySelector('.specialite-name').textContent;
    form.querySelector('button[type="submit"]').textContent = 'Update';
    nameInput.focus();
  });

  deleteButton.addEventListener('click', function () {
    if (rowBeingEdited === row) {
      rowBeingEdited = null;
      form.querySelector('button[type="submit"]').textContent = 'delete';
      nameInput.value = '';
    }
    row.remove();
  });

  tableBody.appendChild(row);
}



