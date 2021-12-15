async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);
  
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
  
    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    //console.log(hashHex);
    return hashHex;
} 


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let params = new URLSearchParams(location.search);
var id_detalleMerchandising;

function validarEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
}

function agregarNavbar(){
    var miNavBar = '<nav class="navbar navbar-dark bg-dark fixed-top">';
    miNavBar += '<nav class="navbar navbar-dark bg-dark fixed-top">';
    miNavBar += '<nav class="navbar navbar-dark bg-dark fixed-top">';
    miNavBar += '<div class="container-fluid">';
    miNavBar += '<div class="row">';
    miNavBar += '<a class="navbar-brand" href="index.html">';
    miNavBar += '<img src="imagenes/logo_estrella.png" id="estrellaLogo" class= "d-none d-lg-block">';
    miNavBar += '<img src="imagenes/logo_nombrebanda.png" id="nombreLogo"></a></div>';
    miNavBar += '<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">';
    miNavBar += '<span class="navbar-toggler-icon"></span></button>'
    miNavBar += '<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">'
    miNavBar += '<div class="offcanvas-body">'    
    miNavBar += '<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">'
    miNavBar += '<li class="nav-item">'
    miNavBar += '<a class="nav-link active" aria-current="page" href="nosotros.html">Nosotros</a></li>'
    miNavBar += '<li class="nav-item dropdown">'
    miNavBar += '<a class="nav-link dropdown-toggle" href="musica.html" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Nuestra música</a>'
    miNavBar += '<ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">'
    miNavBar += '<li><a class="dropdown-item" href="musica.html">En línea</a></li>'
    miNavBar += '<li><a class="dropdown-item" href="shows.html">En vivo</a></li>'
    miNavBar += '<li><a class="dropdown-item" href="merchandising.html">En merchandising</a></li></ul></li>'
    miNavBar += '<li class="nav-item"><a class="nav-link active" aria-current="page" href="formulario.html">Contacto</a></li>'
    miNavBar += '</ul></div></div></div></nav>'
            
    $('#headerSecciones').append(miNavBar);
}

function agregarBarraSecciones(seccion){
    var BarraSecciones = '<ul class="nav nav-tabs">';
    BarraSecciones += '<li class="nav-item">';
    BarraSecciones += '<a id="enLinea" class="nav-link" href="musica.html">En linea</a>';
    BarraSecciones += '</li>';
    BarraSecciones += '<li class="nav-item">';
    BarraSecciones += '<a id="enVivo" class="nav-link" aria-current="page" href="shows.html">En vivo</a>';
    BarraSecciones += '</li>';
    BarraSecciones += '<li class="nav-item">';
    BarraSecciones += '<a id="enMerch" class="nav-link" href="merchandising.html">En merchandising</a></li></ul>';
    $('#sectorBarraNavegacion').append(BarraSecciones);

    $('#sectorBarraNavegacion').ready(function(){
        if (seccion == 'linea'){
            $('#enLinea').prop('class','nav-link active');
        } else if (seccion == 'vivo') {
            $('#enVivo').prop('class','nav-link active');
        } else if (seccion == 'merch') {
            $('#enMerch').prop('class','nav-link active');
        }
    })
}

function crearRankStars(){
    stars = '<div class="rate">';
    stars += '<input type="radio" id="star5" name="rate" value="5" />';
    stars += '<label for="star5" title="text">5 stars</label>';
    stars += '<input type="radio" id="star4" name="rate" value="4" />';
    stars += '<label for="star4" title="text">4 stars</label>';
    stars += '<input type="radio" id="star3" name="rate" value="3" />';
    stars += '<label for="star3" title="text">3 stars</label>';
    stars += '<input type="radio" id="star2" name="rate" value="2" />';
    stars += '<label for="star2" title="text">2 stars</label>';
    stars += '<input type="radio" id="star1" name="rate" value="1" />';
    stars += '<label for="star1" title="text">1 star</label></div>';
    $('.rankingStars').append(stars);                
}

function ordenarUnParamDesc(prop){
    return function(a,b){  
        if(a[prop] < b[prop]){
            return 1;
        } else if(a[prop] > b[prop]){ 
            return -1; 
        } else {
            return 0;
        }
    }
}

function ordenarUnParamAsc(prop){
    return function(a,b){  
        if(a[prop] > b[prop]){
            return 1;
        } else if(a[prop] < b[prop]){ 
            return -1; 
        } else {
            return 0;
        }
    }
}

function ordenarVariosParamDesc(prop1,prop2, prop3){
    return function(a,b){  
        if(a[prop1] < b[prop1]){
            return 1;
        } else if(a[prop1] > b[prop1]){ 
            return -1; 
        } else {
            if (a[prop2] < b[prop2]){
                return 1;
            } else if (a[prop2] > b[prop2]){
                return -1
            } else {
                if (a[prop3] < b[prop3]){
                    return 1;
                } else if (a[prop3] > b[prop3]){
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }
}

function ordenarVariosParamAsc(prop1,prop2, prop3){
    return function(a,b){  
        if(a[prop1] > b[prop1]){
            return 1;
        } else if(a[prop1] < b[prop1]){ 
            return -1; 
        } else {
            if (a[prop2] > b[prop2]){
                return 1;
            } else if (a[prop2] < b[prop2]){
                return -1
            } else {
                if (a[prop3] > b[prop3]){
                    return 1;
                } else if (a[prop3] < b[prop3]){
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }
}

function llamarModalIncompleto(campo){
    $('#modalsSection').empty();
    miModal = '<div id="modalIncompleto" class="modal" tabindex="-1">'
    miModal += '<div class="modal-dialog">'
    miModal += '<div class="modal-content">'
    miModal += '<div class="modal-header">'
    miModal += '<h5 class="modal-title">Datos incompletos</h5>'
    miModal += '<button type="button" class="btn-close botonCerrarModal" data-bs-dismiss="modal" aria-label="Close"></button></div>'
    miModal += '<div class="modal-body">'
    miModal += '<p>Debe completar el campo '+campo+'</p></div>'
    miModal += '<div class="modal-footer">'
    miModal += '<button type="button" class="btn btn-secondary botonCerrarModal" data-bs-dismiss="modal">Cerrar</button>'
    miModal += '</div></div></div></div>'
    $('#modalsSection').append(miModal);
    $('#modalIncompleto').show();
    $('.botonCerrarModal').click(function(){
        $('#modalIncompleto').hide();
    })
}

function llamarModalCompleto(mail){
    $('#modalsSection').empty();
    miModal = '<div id="modalCompleto" class="modal" tabindex="-1">'
    miModal += '<div class="modal-dialog">'
    miModal += '<div class="modal-content">'
    miModal += '<div class="modal-header">'
    miModal += '<h5 class="modal-title">Envio exitoso</h5>'
    miModal += '<button type="button" class="btn-close botonCerrarModal" data-bs-dismiss="modal" aria-label="Close"></button></div>'
    miModal += '<div class="modal-body">'
    miModal += '<p><strong>'+mail+'</strong> su comentario ha sido enviado</p></div>'
    miModal += '<div class="modal-footer">'
    miModal += '<button type="button" class="btn btn-secondary botonCerrarModal" data-bs-dismiss="modal">Cerrar</button>'
    miModal += '</div></div></div></div>'
    $('#modalsSection').append(miModal);
    $('#modalCompleto').show();
    $('.botonCerrarModal').click(function(){
        $('#modalCompleto').hide();
    })
}

function llamarModalMailInvalido(campo){
    $('#modalsSection').empty();
    miModal = '<div id="modalIncompleto" class="modal" tabindex="-1">'
    miModal += '<div class="modal-dialog">'
    miModal += '<div class="modal-content">'
    miModal += '<div class="modal-header">'
    miModal += '<h5 class="modal-title">E-mail invalido</h5>'
    miModal += '<button type="button" class="btn-close botonCerrarModal" data-bs-dismiss="modal" aria-label="Close"></button></div>'
    miModal += '<div class="modal-body">'
    miModal += '<p>Debe ingresar una dirección de correo electrónico válida</p></div>'
    miModal += '<div class="modal-footer">'
    miModal += '<button type="button" class="btn btn-secondary botonCerrarModal" data-bs-dismiss="modal">Cerrar</button>'
    miModal += '</div></div></div></div>'
    $('#modalsSection').append(miModal);
    $('#modalIncompleto').show();
    $('.botonCerrarModal').click(function(){
        $('#modalIncompleto').hide();
    })
}


