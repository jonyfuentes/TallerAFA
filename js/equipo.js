const requestURL = "../json/equipo.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function() {
    data = request.response;
    añadirEquipos();
};

function añadirEquipos() {
    equipos = data.data;

    $("#sectorAgregarCards").empty();
    for (i = 0; i < equipos.length; i++) {
        miCard = ' <div class="col-xl-4 col-lg-12">';
        miCard += ' <div class="card text-white mb-3 text-center">';
        miCard += ' <img src="' + equipos[i].img + ' " class="card-img-top"> ';
        miCard += ' <div class="card-body">';
        miCard += ' <h5 class="card-title">' + equipos[i].nombre + " </h5> ";
        miCard +=
            '<button id="botonTickets' +
            equipos[i].id +
            '" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalTickets">Tickets</button></div>';
        miCard +=
            " <button   onclick=\"ruteoADescripcion('" +
            equipos[i].id.toString() +
            "')\" >Detalle</button> ";
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