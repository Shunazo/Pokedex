function confirmDelete(button) {
  const form = button.closest("form");

  const cardTitle = button.closest(".card").querySelector(".card-title");
  const entityName = cardTitle ? cardTitle.innerText : "";  

  let entityType = '';
  if (button.closest(".pokemones")) {
      entityType = 'Pokemon';
  } else if (button.closest(".tipos")) {
      entityType = 'Tipo';
  } else if (button.closest(".regiones")) {
      entityType = 'Region';
  }

  const confirmationMessage = `¿Estás seguro de que deseas borrar ${entityType}: "${entityName}"?`;

  Swal.fire({
      title: 'Confirmacion',
      text: confirmationMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
  }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire({
              title: '¡Eliminado!',
              text: `${entityType} "${entityName}" ha sido borrado exitosamente.`,
              icon: 'success',
              confirmButtonText: 'OK'
          }).then(() => {
              form.submit(); 
          });
      }
  });
}


function confirmCreateOrEdit(button, event) {
  const form = button.closest("form");

  if (!validarCampos(form)) {
      event.preventDefault(); 
      return;  
  }

  event.preventDefault();

  let entityType = '';
  let actionUrl = form.action;
  let entityName = form.querySelector("input[name='nombre']").value;  

  
  if (actionUrl.includes("/pokemones/edit") || actionUrl.includes("/tipos/edit") || actionUrl.includes("/regiones/edit")) {
      entityType = actionUrl.includes("/pokemones") ? 'Pokémon' : actionUrl.includes("/tipos") ? 'Tipo' : 'Región';
  } else if (actionUrl.includes("/pokemones/create") || actionUrl.includes("/tipos/create") || actionUrl.includes("/regiones/create")) {
      entityType = actionUrl.includes("/pokemones") ? 'Pokémon' : actionUrl.includes("/tipos") ? 'Tipo' : 'Región';
  }

  const isCreateAction = actionUrl.includes("/create");

  Swal.fire({
      title: isCreateAction ? '¿Confirmar creacion de ' + entityType + '?' : '¿Confirmar actualizacion de ' + entityType + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
  }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire({
              title: isCreateAction ? '¡Creacion exitosa!' : '¡Actualizacion exitosa!',
              icon: 'success',
              confirmButtonText: 'OK'
          }).then(() => {
              form.submit();  
          });
      }
  });
}


function validarCampos(form) {
  const inputs = form.querySelectorAll('input, select');
  let esValido = true;

  inputs.forEach(input => {
      if (input.value.trim() === '') {
          input.classList.add('input-error');
          input.classList.remove('input-success');
          esValido = false;
      } else {
          input.classList.add('input-success');
          input.classList.remove('input-error');
      }
  });

  if (!esValido) {
      Swal.fire({
          title: 'Campos incompletos',
          text: 'Por favor, complete todos los campos requeridos.',
          icon: 'error',
          confirmButtonText: 'OK'
      });
  }

  return esValido;
}
