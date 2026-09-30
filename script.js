const form = document.getElementById('contact-form');
const nombreInput = document.getElementById('nombre');
const telefonoInput = document.getElementById('telefono');
const listaContactos = document.getElementById('lista-contactos');

let contactos = [];

function renderizarContactos(items) {
  listaContactos.innerHTML = '';

  if (items.length === 0) {
    listaContactos.innerHTML = '<li class="empty-msg">Todavía no agregaste contactos.</li>';
    return;
  }

  items.forEach((c) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${c.nombre}</strong> - ${c.telefono}</span>
      <button class="btn-eliminar" data-id="${c.id}">Eliminar</button>
    `;
    listaContactos.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = nombreInput.value.trim();
  const telefono = telefonoInput.value.trim();

  if (!nombre || !telefono) return;

  const nuevoContacto = {
    id: Date.now(),
    nombre,
    telefono
  };

  contactos.push(nuevoContacto);
  renderizarContactos(contactos);

  nombreInput.value = '';
  telefonoInput.value = '';
});
listaContactos.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-eliminar')) {
    const id = Number(e.target.getAttribute('data-id'));
    contactos = contactos.filter(c => c.id !== id);
    renderizarContactos(contactos);
  }
});