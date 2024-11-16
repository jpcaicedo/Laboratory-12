document.addEventListener('DOMContentLoaded', loadContacts);

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    renderContacts(contacts);
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Validación básica
    if (!name || !phone) {
        alert('El nombre y el teléfono son obligatorios.');
        return;
    }

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const newContact = { id: Date.now(), name, phone, email, address };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    renderContacts(contacts);
    this.reset(); // Resetea el formulario
});

function renderContacts(contacts) {
    const container = document.getElementById('contacts-container');
    container.innerHTML = '';
    contacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-card';
        contactElement.innerHTML = `
            <h2>${contact.name}</h2>
            <p>Teléfono: ${contact.phone}</p>
            <p>Email: ${contact.email || 'No especificado'}</p>
            <p>Dirección: ${contact.address || 'No especificada'}</p>
            <button onclick="editContact(${contact.id})">Editar</button>
            <button onclick="deleteContact(${contact.id})">Eliminar</button>
        `;
        container.appendChild(contactElement);
    });
}

function editContact(id) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;
        document.getElementById('address').value = contact.address;
        
        // Remueve el contacto actual para reemplazarlo al guardar
        contacts = contacts.filter(contact => contact.id !== id);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

function deleteContact(id) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts(contacts);
}
