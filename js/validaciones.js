export function valida(input){
    const tipoDeInput = input.dataset.tipo; //dataset es para acceder a la lista de modificadores
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }


    console.log(input.parentElement);
    const emptyCamp = input.validity.valid;
    if(emptyCamp){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = showErrorMessage(tipoDeInput,input)
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = showErrorMessage(tipoDeInput,input)
    }
}
//asi se declara lista o arrays
const listaErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

//Asi se declara objetos
const errorMessages = {
    name: {
        valueMissing: "Este campo no puede quedar vacio"
    },
    email: {
        valueMissing: "Este campo no puede quedar vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "Este campo no puede quedar vacio",
        patternMismatch: "Minimum eight characters, at least one letter and one number",
    },
    nacimiento:{
        valueMissing: "Por favor indique su fecha de nacimiento",
        customError: "Debes tener al menos 18 años"
    },
    numero:{
        valueMissing: "Este campo no puede quedar vacio",
        patternMismatch: "Este campo solo acepta este formato XXX-XXX-XXXX",
    },
    direccion:{
        valueMissing: "Este campo no puede quedar vacio",
    },
    ciudad:{
        valueMissing: "Este campo no puede quedar vacio",
    },
    estado:{
        valueMissing: "Este campo no puede quedar vacio",
    },
}


function showErrorMessage(tipoDeInput,input){
    let mensaje = "";
    listaErrores.forEach((error) =>{
        if(input.validity[error]){
            console.log(tipoDeInput,error);
            console.log(input.validity[error]);
            console.log(errorMessages[tipoDeInput][error]);
            mensaje= errorMessages[tipoDeInput][error];
        }   
        
    })

    return mensaje;
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};




function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Necesitas tener 18 años de edad";
    }
    input.setCustomValidity(mensaje); //setCustom sirve para dar mensaje personalizado a nuestra sugerencia
}

function mayorDeEdad(fecha){
    const fechaAct = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaAct;
}

