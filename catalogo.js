

let prodotti = [

]

function filtraPerPrezzo() {

    let nome = document.getElementById("titleProduct")
    let prezzo = document.getElementById("priceProduct")

    let OggettiProdotti = [
        {
            nomeProdotto: nome,
            prezzoProdotto: prezzo,
            nomeDaFiltrare: nomeProdotto.toLowerCase()
        },
    ]

    prodotti = prodotti.push(OggettiProdotti)
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

            let prodotti = data.filter((prodotto) => {

                if (limiteSuperiore != undefined && filtroNome != "" && filtroCategoria != "") {
                    return prodotto.price >= limiteInferiore && prodotto.price < limiteSuperiore && prodotto.title.startsWith(filtroNome) && prodotto.category == filtroCategoria;
                } else if (limiteSuperiore == undefined && (filtroNome != "" && filtroNome != undefined) && filtroCategoria != "") {
                    return prodotto.price >= limiteInferiore && prodotto.title.startsWith(filtroNome) && prodotto.category == filtroCategoria;
                } else if (limiteSuperiore == undefined && filtroNome == "" && filtroCategoria != "") {
                    return prodotto.price >= limiteInferiore && prodotto.category == filtroCategoria;
                } else if (limiteSuperiore == undefined && filtroNome != "" && filtroCategoria == "") {
                    return prodotto.price >= limiteInferiore && prodotto.title.startsWith(filtroNome);
                } else if (limiteSuperiore != undefined && filtroNome =="" && filtroCategoria!= ""){
                    return prodotto.price >= limiteInferiore && prodotto.price < limiteSuperiore && prodotto.category == filtroCategoria
                } else if (filtroCategoria!= "" && filtroCategoria!= undefined){
                    return prodotto.category == filtroCategoria
                }
            })

            for (let i = 0; i < prodotti.length; i++) {
                let prodotto= prodotti[i];

                let prezzo = prodotto.price;
                let titolo = prodotto.title;
                let immagine = prodotto.image;
                let descrizione = prodotto.description;

                console.log(prezzo,titolo,immagine)
                document.getElementById("divCatalogo").innerHTML += ` <div class="container-card col-12 col-sm-4 col-xl-3 " id="prodotto">
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


