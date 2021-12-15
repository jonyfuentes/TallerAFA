abrirModal();
cerrarModal();


/* function enviarDatos() {
    $('#botonEnviar').click(function() {
        validarDatos;
    })


*/

function abrirModal() {
    $('#botonEnviar').click(function() {
        nombre = $('#nombre').val();
        apellido = $('#apellido').val();
        celular = $('#celular').val();
        email = $('#email').val();
        comentario = $('#comentario').val();
        if (nombre == '' || apellido == '' || celular == '' || email == '' || comentario == '') {
            $('#modalUno').show();
        } else { $('#modalDos').show(); }
    })

}

function cerrarModal() {
    $('.botonCerrarModal').click(function() {
        $('#modalUno').hide();

    })

}