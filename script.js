//Caracteres con las que se pueden trabajar
var LETRAS_MINUSCULAS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var LETRAS_MAYUSCULAS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var NUMEROS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var SIMBOLOS = ["#", "$", "%"];
//Texto De Resultados Posibles
var RESULTADO_IDENTIFICADOR = "Identificador";
var RESULTADO_NUMERO = "Numero";
var RESULTADO_SIMBOLO = "Simbolo";
var RESULTADO_ERROR = "Error";
//Texto de Descripciones Posibles
var DESCRIPCION_CORRECTO = "Correcto";
var DESCRIPCION_NO_EXISTE = " no es un caracter valido";
var DESCRIPCION_SIMBOLOS_COMBINADOS = "Simbolos con Letras y/o Numeros";
var DESCRIPCION_LETRAS_CON_NUMERO_PRIMERO = "Letra con un Numero de primero";

var codigo = document.getElementById("codigo");
var historialCodigo = document.getElementById("historialCodigo");
var resultado = document.getElementById("historialResultado");
var descripcion = document.getElementById("historialDescripcion");
//Funcion para Recorrer el codigo ingresado 
function identificar() {
    var codigoEsError = true;
    var codigoEsIdentificador = false;
    var codigoEsNumero = false;
    var codigoEsSimbolo = false;
    for (i = 0; i < codigo.value.length; i++) {
        var esLetra = false;
        var esNumero = false;
        var esSimbolo = false;
        for (j = 0; j < LETRAS_MINUSCULAS.length; j++) {    //Verificacion con el arreglo letras Minusculas        
            if (codigo.value[i] == LETRAS_MINUSCULAS[j]) {
                esLetra = true;
                break;
            } else if (codigo.value[i] == LETRAS_MAYUSCULAS[j]) { //Verificacion con el arreglo letras Mayusculas        
                esLetra = true;
                break;
            }
        }
        if (esLetra == false) {
            for (j = 0; j < NUMEROS.length; j++) { //Verificacion con el arreglo Numeros           
                if (codigo.value[i] == NUMEROS[j]) {
                    esNumero = true;
                    break;
                }
            }
            if (esNumero == false) {
                for (j = 0; j < SIMBOLOS.length; j++) {    //Verificacion con el arreglo simbolos                
                    if (codigo.value[i] == SIMBOLOS[j]) {
                        esSimbolo = true;
                        break;
                    }
                }
            }

        }
        //En caso de que no exista el caracter en los arreglos        
        if (esLetra == false && esNumero == false && esSimbolo == false) {
            registrarResultado(RESULTADO_ERROR, codigo.value[i] + DESCRIPCION_NO_EXISTE);
            break;

        }
        //Verificacion de que no se mezcle simbolos con letras o numeros
        if ((codigoEsSimbolo && (esLetra || esNumero)) || ((codigoEsNumero || codigoEsIdentificador) && esSimbolo)) {
            registrarResultado(RESULTADO_ERROR, DESCRIPCION_SIMBOLOS_COMBINADOS);
            break;
        }
        //Verificacion de que no existan letras con un numero de primero
        if (i >= 1) {
            if (codigoEsNumero && esLetra) {
                registrarResultado(RESULTADO_ERROR, DESCRIPCION_LETRAS_CON_NUMERO_PRIMERO);
                break;
            }
        }
        // Asignacion de identificador al codigo
        if (esLetra) {
            codigoEsIdentificador = true;
        } else if (esNumero) {
            if (codigoEsIdentificador == false) {
                codigoEsNumero = true;
            }
        } else {
            codigoEsSimbolo = true;
        }

        if (i == codigo.value.length - 1) { //En caso de que se haya recorrido todo el codigo se deja de ser un error
            codigoEsError = false;
            break;
        }
    }
    //Despues de recorrer todo el codigo sin errores, se muestran resultados positivos
    if (codigoEsError == false) {
        if (codigoEsIdentificador) {
            registrarResultado(RESULTADO_IDENTIFICADOR, DESCRIPCION_CORRECTO);
        } else if (codigoEsNumero) {
            registrarResultado(RESULTADO_NUMERO, DESCRIPCION_CORRECTO);
        } else {
            registrarResultado(RESULTADO_SIMBOLO, DESCRIPCION_CORRECTO);
        }
    }
    codigo.value = "";
}

function registrarResultado(textoResultado, textoDescripcion) {
    alert(textoResultado);
    var colorText = "";
    if (textoResultado == RESULTADO_ERROR) {
        colorText = " style='background-color:red'";
    }
    historialCodigo.innerHTML = historialCodigo.innerHTML + "<div" + colorText + ">" + codigo.value + "</div>";
    resultado.innerHTML = resultado.innerHTML + "<div" + colorText + ">" + textoResultado + "</div>";
    descripcion.innerHTML = descripcion.innerHTML + "<div" + colorText + ">" + textoDescripcion + "</div>";




}
/*
function mostrarAutoCompletado(){
    autoC.style.display="inline-block";
    autoC.innerHTML="sdw";
}
*/