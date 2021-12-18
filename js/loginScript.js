URL = "../json/datosUsers.json";
let usuariosJson = "";
$.getJSON(URL, function(data) {
    usuariosJson = data;
}).done(function() {
    agregarNavbar();
});

function agregarNavbar() {
    var miNavBar = '<nav class="navbar navbar-dark bg-dark fixed-top">';
    miNavBar += '<nav class="navbar navbar-dark bg-dark fixed-top">';
    miNavBar += '<nav class="navbar navbar-dark bg-dark fixed-top">';
    miNavBar += '<div class="container-fluid">';
    miNavBar += '<div class="row">';
    miNavBar +=
        '<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">';
    miNavBar += '<span class="navbar-toggler-icon"></span></button>';
    miNavBar +=
        '<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">';
    miNavBar += '<div class="offcanvas-body">';
    miNavBar += '<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">';
    miNavBar += '<li class="nav-item">';
    miNavBar +=
        '<a class="nav-link active" aria-current="page" href="../nosotros.html">Nosotros</a></li>';
    miNavBar += '<li class="nav-item dropdown">';
    miNavBar +=
        '<a class="nav-link dropdown-toggle" href="musica.html" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Producto</a>';
    miNavBar +=
        '<ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">';
    miNavBar +=
        '<li><a class="dropdown-item" href="../Equipo.html">Equipo</a></li>';
    miNavBar +=
        '<li><a class="dropdown-item" href="../Vivo.html">En vivo</a></li>';
    miNavBar +=
        '<li><a class="dropdown-item" href="../indumentaria.html">En indumentaria</a></li></ul></li>';
    miNavBar +=
        '<li class="nav-item"><a class="nav-link active" aria-current="page" href="../formulario.html">Contacto</a></li>';
    miNavBar += "</ul></div></div></div></nav>";

    $("#headerSecciones").append(miNavBar);
}

function validarCampos() {
    mail = $("#loginInputEmail").val();
    pass = $("#loginInputPassword").val();
    if (mail == "") {
        llamarModalIncompleto("usuario");
    } else if (pass == "") {
        llamarModalIncompleto("contraseña");
    } else {
        sha256(pass).then(function(respuestaHash) {
            checkUserData(mail, respuestaHash);
        });
    }
}

function checkUserData(usuario, password) {
    usuarios = usuariosJson.Users;
    usuarioExistente = false;
    indiceUsuario = "";
    for (i = 0; i < usuarios.length; i++) {
        if (usuario == usuarios[i].user) {
            usuarioExistente = true;
            indiceUsuario = i;
        }
    }
    if (usuarioExistente == false) {
        llamarModalUsuarioInexistente(usuario);
    } else {
        passParsed = JSON.stringify(usuariosJson.Users[indiceUsuario].password);
        passParsed = JSON.parse(passParsed);
        if (password == passParsed) {
            llamarModalIngresoExitoso(usuario);
            $("#formLogin").submit();
        } else {
            llamarModalContraseñaIncorrecta();
        }
    }
}

function llamarModalUsuarioInexistente(username) {
    $("#modalsSection").empty();
    miModal = '<div id="modalUsuarioInexistente" class="modal" tabindex="-1">';
    miModal += '<div class="modal-dialog">';
    miModal += '<div class="modal-content">';
    miModal += '<div class="modal-header">';
    miModal += '<h5 class="modal-title">Acceso denegado</h5>';
    miModal +=
        '<button type="button" class="btn-close botonCerrarModal" data-bs-dismiss="modal" aria-label="Close"></button></div>';
    miModal += '<div class="modal-body">';
    miModal +=
        "<p>El usuario <strong>" +
        username +
        "</strong> no se encuentra registrado</p></div>";
    miModal += '<div class="modal-footer">';
    miModal +=
        '<button type="button" class="btn btn-secondary botonCerrarModal" data-bs-dismiss="modal">Cerrar</button>';
    miModal += "</div></div></div></div>";
    $("#modalsSection").append(miModal);
    $("#modalUsuarioInexistente").show();
    $(".botonCerrarModal").click(function() {
        $("#modalUsuarioInexistente").hide();
    });
}

function llamarModalContraseñaIncorrecta() {
    $("#modalsSection").empty();
    miModal = '<div id="modalContraseñaIncorrecta" class="modal" tabindex="-1">';
    miModal += '<div class="modal-dialog">';
    miModal += '<div class="modal-content">';
    miModal += '<div class="modal-header">';
    miModal += '<h5 class="modal-title">Acceso denegado</h5>';
    miModal +=
        '<button type="button" class="btn-close botonCerrarModal" data-bs-dismiss="modal" aria-label="Close"></button></div>';
    miModal += '<div class="modal-body">';
    miModal += "<p>La contraseña ingresada es incorrecta</p></div>";
    miModal += '<div class="modal-footer">';
    miModal +=
        '<button type="button" class="btn btn-secondary botonCerrarModal" data-bs-dismiss="modal">Cerrar</button>';
    miModal += "</div></div></div></div>";
    $("#modalsSection").append(miModal);
    $("#modalContraseñaIncorrecta").show();
    $(".botonCerrarModal").click(function() {
        $("#modalContraseñaIncorrecta").hide();
    });
}

function llamarModalIngresoExitoso(username) {
    $("#modalsSection").empty();
    miModal = '<div id="modalIngresoExitoso" class="modal" tabindex="-1">';
    miModal += '<div class="modal-dialog">';
    miModal += '<div class="modal-content">';
    miModal += '<div class="modal-header">';
    miModal += '<h5 class="modal-title">Ingreso exitoso</h5>';
    miModal +=
        '<button type="button" class="btn-close botonCerrarModal" data-bs-dismiss="modal" aria-label="Close"></button></div>';
    miModal += '<div class="modal-body">';
    miModal +=
        "<p>Bienvenido al sistema <strong>" + username + "<strong></p></div>";
    miModal += '<div class="modal-footer">';
    miModal +=
        '<button type="button" class="btn btn-secondary botonCerrarModal" data-bs-dismiss="modal">Cerrar</button>';
    miModal += "</div></div></div></div>";
    $("#modalsSection").append(miModal);
    $("#modalIngresoExitoso").show();
    $(".botonCerrarModal").click(function() {
        $("#modalIngresoExitoso").hide();
    });
}