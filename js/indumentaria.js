const requestURL = "../json/indumentaria.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
productosTresRound = "";

request.onload = function() {
    indumentaria = request.response;
    merch = indumentaria.data;
    console.log(merch);
    agregarNavbar();
    agregarBarraSecciones("merch");
    agregarCards(merch);
};

function agregarNavbar() {
    var miNavBar = '<nav class="navbar navbar-dark bg-dark fixed-top">';
    miNavBar += '<nav class="navbar navbar-dark bg-dark fixed-top">';
    miNavBar += '<nav class="navbar navbar-dark bg-dark fixed-top">';
    miNavBar += '<div class="container-fluid">';
    miNavBar += '<div class="row">';
    miNavBar += '<a class="navbar-brand" href="index.html">';
    miNavBar +=
        '<img src="imagenes/logo_estrella.png" id="estrellaLogo" class= "d-none d-lg-block">';
    miNavBar +=
        '<img src="imagenes/logo_nombrebanda.png" id="nombreLogo"></a></div>';
    miNavBar +=
        '<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">';
    miNavBar += '<span class="navbar-toggler-icon"></span></button>';
    miNavBar +=
        '<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">';
    miNavBar += '<div class="offcanvas-body">';
    miNavBar += '<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">';
    miNavBar += '<li class="nav-item">';
    miNavBar +=
        '<a class="nav-link active" aria-current="page" href="nosotros.html">Nosotros</a></li>';
    miNavBar += '<li class="nav-item dropdown">';
    miNavBar +=
        '<a class="nav-link dropdown-toggle" href="musica.html" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Nuestra música</a>';
    miNavBar +=
        '<ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">';
    miNavBar +=
        '<li><a class="dropdown-item" href="musica.html">En línea</a></li>';
    miNavBar += '<li><a class="dropdown-item" href="shows.html">En vivo</a></li>';
    miNavBar +=
        '<li><a class="dropdown-item" href="merchandising.html">En merchandising</a></li></ul></li>';
    miNavBar +=
        '<li class="nav-item"><a class="nav-link active" aria-current="page" href="formulario.html">Contacto</a></li>';
    miNavBar += "</ul></div></div></div></nav>";

    $("#headerSecciones").append(miNavBar);
}

function agregarBarraSecciones(seccion) {
    var BarraSecciones = '<ul class="nav nav-tabs">';
    BarraSecciones += '<li class="nav-item">';
    BarraSecciones +=
        '<a id="enLinea" class="nav-link" href="musica.html">En linea</a>';
    BarraSecciones += "</li>";
    BarraSecciones += '<li class="nav-item">';
    BarraSecciones +=
        '<a id="enVivo" class="nav-link" aria-current="page" href="shows.html">En vivo</a>';
    BarraSecciones += "</li>";
    BarraSecciones += '<li class="nav-item">';
    BarraSecciones +=
        '<a id="enMerch" class="nav-link" href="merchandising.html">En merchandising</a></li></ul>';
    $("#sectorBarraNavegacion").append(BarraSecciones);

    $("#sectorBarraNavegacion").ready(function() {
        if (seccion == "linea") {
            $("#enLinea").prop("class", "nav-link active");
        } else if (seccion == "vivo") {
            $("#enVivo").prop("class", "nav-link active");
        } else if (seccion == "merch") {
            $("#enMerch").prop("class", "nav-link active");
        }
    });
}

function agregarCards(array) {
    $("#sectorAgregarCards").empty();
    for (i = 0; i < array.length; i++) {
        miCard = ' <div class="col-xl-4 col-lg-12">';
        miCard += ' <div class="card text-white mb-3 text-center">';
        miCard += ' <img src="' + array[i].img + ' " class="card-img-top"> ';
        miCard += ' <div class="card-body">';
        miCard += ' <h5 class="card-title">' + array[i].nombre + " </h5> ";
        miCard +=
            " <button onclick=\"ruteoADescripcion('" +
            array[i].id.toString() +
            "')\" >Ver Articulo</button> ";
        miCard += "</div></div></div>";
        $("#sectorAgregarCards").append(miCard);
    }
}

function ruteoADescripcion(id) {
    id_detalleMerchandising = id;
    localStorage.setItem("path_data", requestURL);
    localStorage.setItem("idDescripcion", id);
    location.href = "descripcion.html";
}