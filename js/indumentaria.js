$('#boton').click(function() {
    validarFormularioComentario()
})

function validarFormularioComentario(){
    star5 = $('#star5').prop('checked');
    star4 = $('#star4').prop('checked');
    star3 = $('#star3').prop('checked');
    star2 = $('#star2').prop('checked');
    star1 = $('#star1').prop('checked');
    mail = $('#formComentarioMail').val();
    comentario = $('#formComentarioComentario').val();
    if (star1 == false && star2 == false && star3 == false && star4 == false && star5 == false){
        llamarModalIncompleto('puntuacion');
    } else if (mail == '') {
        llamarModalIncompleto('e-mail');
    } else if (validarEmail(mail)==false) {
        llamarModalMailInvalido();
    } else if (comentario == '') {
        llamarModalIncompleto('comentario');
    } else {
        llamarModalCompleto(mail);
        $('#formComentarioShows').submit();
    }
}


function llamarModalCompletoCompra(nombre, apellido, mail, tickets){
    $('#modalsSection').empty();
    miModal = '<div id="modalCompleto" class="modal" tabindex="-1">'
    miModal += '<div class="modal-dialog">'
    miModal += '<div class="modal-content">'
    miModal += '<div class="modal-header">'
    miModal += '<h5 class="modal-title">Reserva exitosa</h5>'
    miModal += '<button type="button" class="btn-close botonCerrarModal" data-bs-dismiss="modal" aria-label="Close"></button></div>'
    miModal += '<div class="modal-body">'
    miModal += '<p><strong>'+nombre+' '+apellido+'</strong> registrado con el e-mail <strong>'+mail+'</strong> has reservado <strong>'+tickets+'</strong> tickets</p></div>'
    miModal += '<div class="modal-footer">'
    miModal += '<button type="button" class="btn btn-secondary botonCerrarModal" data-bs-dismiss="modal">Cerrar</button>'
    miModal += '</div></div></div></div>'
    $('#modalsSection').append(miModal);
    $('#modalCompleto').show();
    $('.botonCerrarModal').click(function(){
        $('#modalCompleto').hide();
    })
}
