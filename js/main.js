/* pedir el nombre */
let nombre = prompt("Ingrese su nombre:");

while (Number(nombre) || nombre === "" ) {
  if (Number(nombre)) {
    alert("Introducir un nombre válido.");
    nombre = prompt("Ingrese su nombre:");
  } else {
    alert("Error! Introduce tu nombre nuevamente!");
    nombre = prompt("Ingrese su nombre:");
  }
};

/* pedir la edad */
let edad;

do {
    edad = prompt("ingrese su edad:")
    if (isNaN(edad) || edad === "") {
        alert("Ingresa tu edad en números");
    } else if (edad >= 18) {
        alert("Bienvenido al simulador de compras " + nombre + "!");
    } else {
        alert("Tenes que ser mayor de edad para usar el simulador de compras!");
        salir();
    }
} while (isNaN(edad) || edad === "");

/* lista de productos */
let productos = [
    {
        producto: "Iphone 12",
        opciones: [
            {modelo: "Iphone 12", almacenamiento: "64 GB", precio: 600},
            {modelo: "Iphone 12 PRO", almacenamiento: "128 GB", precio: 630},
            {modelo: "Iphone 12 PRO MAX", almacenamiento: "256 GB", precio: 650},
        ]
    },
    {
        producto: "Iphone 13",
        opciones: [
            {modelo: "Iphone 13", almacenamiento: "64 GB", precio: 640},
            {modelo: "Iphone 13 PRO", almacenamiento: "128 GB", precio: 660},
            {modelo: "Iphone 13 PRO MAX", almacenamiento: "256 GB", precio: 700},
        ]
    },
    {
        producto: "Iphone 14",
        opciones: [
            {modelo: "Iphone 14", almacenamiento: "128 GB", precio: 780},
            {modelo: "Iphone 14 PRO", almacenamiento: "256 GB", precio: 820},
            {modelo: "Iphone 14 PRO MAX", almacenamiento: "512 GB", precio: 860},
        ]
    },
    {
        producto: "Iphone 15",
        opciones: [
            {modelo: "Iphone 15", almacenamiento: "128 GB", precio: 950},
            {modelo: "Iphone 15 PRO", almacenamiento: "256 GB", precio: 1050},
            {modelo: "Iphone 15 PRO MAX", almacenamiento: "512 GB", precio: 1150},
        ]
    },
];

/* funciones */
let carrito = [];

if (edad >= 18) {
    menu();
} 

function menu() { //el usuario elige que accion quiere realziar
    let opcion;
    do {
        opcion = prompt(`Bienvenido al Simulador de Compras, ${nombre}!\n\nMenú:\n1. Comprar Productos Apple\n2. Consultar precios y garantía\n3. Filtrar precios\n4. Salir`);
        
        switch (opcion) {
            case "1":
                elegirCelular();
                break;
            case "2":
                consultarPreciosYGarantia();
                break;
            case "3":
                filtrarPrecios();
                break;
            case "4":
                salir();
                break;
            default:
                alert("Opción inválida.");
        }
    } while (opcion !== "4");
}

//eligen el producto que quiere comprar, con la opcion de volver a cargar otro producto al carrito o no, y al final se suman los precios de los prod. elegidos 
function elegirCelular() { 
    let opciones = "";
    for (let i = 0; i < productos.length; i++) {
        opciones += `${i + 1}. ${productos[i].producto}\n`;
    }

    let eleccion = prompt(`¿Qué Celular desea comprar?\n${opciones}`);
    let indiceEleccion = parseInt(eleccion);

    if (!isNaN(indiceEleccion) && indiceEleccion > 0 && indiceEleccion <= productos.length) {
        let productoElegido = productos[indiceEleccion - 1];

        if (productoElegido.opciones) {
            let subopciones = "";
            for (let i = 0; i < productoElegido.opciones.length; i++) {
                subopciones += `${i + 1}. ${productoElegido.opciones[i].modelo} - ${productoElegido.opciones[i].almacenamiento} - $${productoElegido.opciones[i].precio}\n`;
            }

            let eleccionSubopcion = prompt(`¿Qué modelo desea para ${productoElegido.producto}?\n${subopciones}`);
            let indiceSubopcion = parseInt(eleccionSubopcion);

            if (!isNaN(indiceSubopcion) && indiceSubopcion > 0 && indiceSubopcion <= productoElegido.opciones.length) {
                let subopcionElegida = productoElegido.opciones[indiceSubopcion - 1];
                agregarAlCarrito(subopcionElegida);
            } else {
                alert("Opción incorrecta");
            }
        } else {
            agregarAlCarrito(productoElegido);
        }

        let respuesta = prompt("¿Desea comprar otro celular?\n1. Sí, deseo agregar otro producto.\n2. No, gracias.");
        if (respuesta === "1") {
            elegirCelular();
        } else if (respuesta === "2") {
            mostrarElCarrito();
        } else {
            alert("Opción incorrecta");
        }
    } else {
        alert("Opción incorrecta");
    }
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    alert(`"${producto.modelo} - ${producto.almacenamiento}" se agregó al carrito.`);
}

function mostrarElCarrito() { 
    let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    let detalles = carrito.map(producto => `• ${producto.modelo} - ${producto.almacenamiento} - U$D${producto.precio}`).join('\n');
    alert(`Detalles del carrito:\n${detalles}\nTotal: U$D ${total.toFixed(2)}`);
}

function salir() { // le permite al usuario poder salir
    alert("Gracias por usar el simulador de compras.");
}

function consultarPreciosYGarantia() { // muestra una lista de los productos con sus modelos y garantias
    let detalles = "";
    for (let producto of productos) {
        detalles += `${producto.producto}:\n`;
        for (let opcion of producto.opciones) {
            detalles += `- Modelo: ${opcion.modelo}, Almacenamiento: ${opcion.almacenamiento}, Precio: U$D${opcion.precio}, Garantía: 1 año\n`;
        }
        detalles += "\n";
    }
    alert(detalles);
}

function filtrarPrecios() { // filtra los precios del mas caro al mas barato y viceversa
    let opcion = prompt("¿Cómo desea ordenar los precios?\n1. Más caro al más barato\n2. Más barato al más caro");
    let ordenado;

    if (opcion === "1") {
        ordenado = productos.slice().sort((a, b) => {
            let precioA = Math.max(...a.opciones.map(opcion => opcion.precio));
            let precioB = Math.max(...b.opciones.map(opcion => opcion.precio));
            return precioB - precioA;
        });
    } else if (opcion === "2") {
        ordenado = productos.slice().sort((a, b) => {
            let precioA = Math.min(...a.opciones.map(opcion => opcion.precio));
            let precioB = Math.min(...b.opciones.map(opcion => opcion.precio));
            return precioA - precioB;
        });
    } else {
        alert("Opción incorrecta");
        return;
    }

    let detalles = "";
    for (let producto of ordenado) {
        detalles += `${producto.producto}:\n`;
        for (let opcion of producto.opciones) {
            detalles += `- Modelo: ${opcion.modelo}, Almacenamiento: ${opcion.almacenamiento}, Precio: U$D ${opcion.precio}\n`;
        }
        detalles += "\n";
    }
    alert(detalles);
}

