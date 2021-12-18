const requestURL = "../json/vivo.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function() {
    data = request.response;
    shows = data.data;
    console.log(shows);
    agregarNavbar();
    agregarBarraSecciones("vivo");
    crearRankStars();
    /* ordenarFecha('reciente'); */
    agregarCards("ninguno", "ninguno");
    /* seleccionarCategoria();
      cambiarCriterioOrdenamiento(); */
};

function agregarCards(criterio, opcion) {
    $("#contenedorCards").empty();
    for (i = 0; i < shows.length; i++) {
        miCard = '<div class="col-xl-4 col-lg-12">';
        miCard += '<div class="card text-white mb-3 text-center">';
        miCard += '<img src="' + shows[i].img + '" class="card-img-top">';
        miCard += '<div class="card-body">';
        miCard += '<h5 class="card-title mb-4">' + shows[i].nombre + "</h5>";
        miCard += '<div class="row">';
        miCard += '<div class="col-6">';
        miCard +=
            '<button id="botonTickets' +
            shows[i].id +
            '" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalTickets">Tickets</button></div>';
        miCard += '<div class="col-6">';
        miCard +=
            " <button onclick=\"ruteoADescripcion('" +
            shows[i].id.toString() +
            "')\" >Ver Articulo</button> ";
        // miCard +=
        //   '<button id="botonOpinion' +
        //   shows[i].id +
        //   '" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalComentario">Comentario</button>';
        miCard += "</div></div></div></div></div>";
        idBotonTickets = "#botonTickets" + shows[i].id;
        idBotonOpinion = "#botonOpinion" + shows[i].id;
        if (criterio == "ninguno") {
            $("#contenedorCards").append(miCard);
        } else if (criterio == "localidad") {
            if (shows[i].localidad == opcion) {
                $("#contenedorCards").append(miCard);
            }
        } else if (criterio == "vigencia") {
            if (shows[i].vigente == opcion) {
                $("#contenedorCards").append(miCard);
            }
        } else if (criterio == "gratuidad") {
            if (shows[i].gratis == opcion) {
                $("#contenedorCards").append(miCard);
            }
        }
    }
}

boton = $("#formCompraBoton").click(function() {
    validarFormularioCompra();
});

botonOpinion = $("#botonOpinion").click(function() {
    validarFormularioComentario();
});

function validarFormularioCompra() {
    mail = $("#formCompraMail").val();
    console.log(mail);
    cantidadTickets = $("#formCompraCantidad").val();
    nombre = $("#formCompraNombre").val();
    apellido = $("#formCompraApellido").val();
    if (nombre == "") {
        llamarModalIncompleto("nombre");
    } else if (apellido == "") {
        llamarModalIncompleto("apellido");
    } else if (mail == "") {
        llamarModalIncompleto("mail");
    } else if (validarEmail(mail) == false) {
        llamarModalMailInvalido();
    } else if (cantidadTickets == "Selecciona la cantidad de tickets") {
        llamarModalIncompleto("cantidad de tickets");
    } else {
        llamarModalCompletoCompra(nombre, apellido, mail, cantidadTickets);
        $("#formCompraShows").submit();
    }
}

function validarFormularioComentario() {
    star5 = $("#star5").prop("checked");
    star4 = $("#star4").prop("checked");
    star3 = $("#star3").prop("checked");
    star2 = $("#star2").prop("checked");
    star1 = $("#star1").prop("checked");
    mail = $("#formComentarioMail").val();
    comentario = $("#formComentarioComentario").val();
    if (
        star1 == false &&
        star2 == false &&
        star3 == false &&
        star4 == false &&
        star5 == false
    ) {
        llamarModalIncompleto("puntuacion");
    } else if (mail == "") {
        llamarModalIncompleto("e-mail");
    } else if (validarEmail(mail) == false) {
        llamarModalMailInvalido();
    } else if (comentario == "") {
        llamarModalIncompleto("comentario");
    } else {
        llamarModalCompleto(mail);
        $("#formComentarioShows").submit();
    }
}

function llamarModalCompletoCompra(nombre, apellido, mail, tickets) {
    $("#modalsSection").empty();
    miModal = '<div id="modalCompleto" class="modal" tabindex="-1">';
    miModal += '<div class="modal-dialog">';
    miModal += '<div class="modal-content">';
    miModal += '<div class="modal-header">';
    miModal += '<h5 class="modal-title">Reserva exitosa</h5>';
    miModal +=
        '<button type="button" class="btn-close botonCerrarModal" data-bs-dismiss="modal" aria-label="Close"></button></div>';
    miModal += '<div class="modal-body">';
    miModal +=
        "<p><strong>" +
        nombre +
        " " +
        apellido +
        "</strong> registrado con el e-mail <strong>" +
        mail +
        "</strong> has reservado <strong>" +
        tickets +
        "</strong> tickets</p></div>";
    miModal += '<div class="modal-footer">';
    miModal +=
        '<button type="button" class="btn btn-secondary botonCerrarModal" data-bs-dismiss="modal">Cerrar</button>';
    miModal += "</div></div></div></div>";
    $("#modalsSection").append(miModal);
    $("#modalCompleto").show();
    $(".botonCerrarModal").click(function() {
        $("#modalCompleto").hide();
    });
}

function ruteoADescripcion(id) {
    id_detalleMerchandising = id;
    localStorage.setItem("path_data", requestURL);
    localStorage.setItem("idDescripcion", id);
    location.href = "descripcion.html";
}