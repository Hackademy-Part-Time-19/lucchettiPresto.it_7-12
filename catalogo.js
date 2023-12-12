







/*
setInterval(function () {


    img.src = listaImmagini[index];
    document.getElementById("presentationImage").style = "opacity:0;display:block ";
    setTimeout(() => { document.getElementById("presentationImage").style = "opacity:1;display:block " }, 1000);
    setTimeout(() => { document.getElementById("presentationImage").style = "opacity:0;display:block " }, 3000)



    index > 1 ? index = 0 : index++;


}, 3500)*/






let prodotti = [

]

function filtraPerPrezzo() {

    let nome = document.getElementById("titleProduct")
    let prezzo = document.getElementById("priceProduct")

    let OggettiProdototti = [
        {
            nomeProdotto: nome,
            prezzoProdotto: prezzo,
            nomeDaFiltrare: nomeProdotto.toLowerCase()
        },
    ]

    prodotti = prodotti.push(OggettiProdototti)
}


function apriHomePage() {

    window.location.href = "landingPage.html"

}

let inputAttivo = true
function apriSezioneCerca() {

    if (inputAttivo == true) {
        document.getElementById("inputSearch").style = "visibility:visible"
        inputAttivo = false
    } else {
        document.getElementById("inputSearch").style = "visibility:hidden"
        inputAttivo = true
    }


}

/*||||||||||  SEZIONE FETCH CON FUNZIONE PER PRODOTTI ||||||||||     */
function aggiungiProdotti(limiteInferiore, limiteSuperiore, filtroCategoria, filtroNome) {

    fetch("https://fakestoreapi.com/products")
        .then((response) => { return response.json() })
        .then(data => {
            data = data.filter(function (prodotto) {
                return prodotto.category == filtroCategoria && prodotto.title.startsWith(filtroNome)
                    && prodotto.price >= limiteInferiore && prodotto.price <= limiteSuperiore
            })
            for (let i = 0; i < data.length; i++) {


                let prezzo = data[i].price;
                let titolo = data[i].title;
                let immagine = data[i].image;
                let descrizione = data[i].description;


                document.getElementById("divCatalogo").innerHTML += ` <div class="container-card col-12 col-sm-4 col-md-3 " id="prodotto">
                                                                        <div class="card-prodotto">
                                                                            <div class="container-immagine-prodotto">
                                                                                <img class="img-prodotto" src="${immagine}">
                                                                            </div>
                                                                            <div class="container-testo-prodotto">
                                                                                <p id="titleProduct">${titolo}</p>

                                                                                <p id="priceProduct">€${prezzo}</p>
                                                                            </div>

                                                                            <div class="container-button-prodotto">
                                                                                <div class="button-compra">
                                                                                <p> Acquista</p>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                      </div>`
            }
        })
        .catch(error => {
            console.log(error)
        })

}


aggiungiProdotti()