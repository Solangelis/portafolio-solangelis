const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

// expresiones regulares

const expresiones = {

	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	mensaje:/^[a-zA-ZÀ-ÿ\s]{1,70}$/,
}

const campos = {
	nombre:false,	
	correo:false,
	mensaje:false
}

const validarFormulario = (e) => {
	switch (e.target.name){		
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;			
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;

		case 'mensaje':	
		    validarCampo(expresiones.mensaje, e.target, 'mensaje');
		
	}
}
 // validacion de grupos de input para que cuando de un clip aparesca en error que tiene que terminar el formulario , es importante de crear un valued de campo que encierre todos los input

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
	campos[campo] = true;	
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] =false;
	}
}



//validando boton 

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if( campos.nombre && campos.correo && campos.mensaje){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});