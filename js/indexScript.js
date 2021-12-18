const requestURL = '../json/indexProducts.json';
const request = new XMLHttpRequest;
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    data = request.response;
    mostrarProductosDestacados();
}

function mostrarProductosDestacados() {
    productos = data.indexProducts;

    for (i = 0; i < productos.length; i++) {
        if (productos[i].destacado == true) {
            miniatura = `
                <div class="col-xl-2 col-lg-12">
                    <div class="card text-white mb-3 text-center border-secondary bg-dark rounded">
                      <form method="get" action="${productos[i].seccion}">
                        <img src="${productos[i].img}" class="card-img-top img">
                        <div class="card-body">
                            <button type="submit" class="btn btn-outline-light tex">Comprar</button>
                        </div>
                    </div>
                </div>
            `;
            $('#thumbnailsContainer').append(miniatura);
        }
    }
}