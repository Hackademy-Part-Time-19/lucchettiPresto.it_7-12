



let listaImmagini = ["./image/abbigliamentoDonna.jpeg", "./image/abbigliamentoUomo.jpg", "./image/elettronica.webp"];
let presentationP = [""]
let img = document.getElementById("presentationImage");
let index = 0


function apriHomePage() {

    window.location.href = "landingPage.html"

};



function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function cicloImmagine() {

    img.src = listaImmagini[index++ % listaImmagini.length];
    await settaStyle([...parametriImmagini])


    cicloImmagine()
}

let parametriImmagini = [{
    ritardo: 100,
    opacita: 0,

},
{
    ritardo: 2500,
    opacita: 0.8
},
{
    ritardo: 1500,
    opacita: 0
}]

async function settaStyle(oggetti) {
    const oggetto = oggetti.shift()
    if (oggetto == undefined) {
        return;
    };
    img.style = `opacity:${oggetto.opacita}; display:block`;
    await delay(oggetto.ritardo)
    return settaStyle(oggetti)


};






function apriCatalogoCategoria(categoria) {
    window.location.href = `catalogo.html?filtroCategoria=${categoria}`;
}


function apriProdotto(id) {
    window.location.href = `prodotto.html?id=${id}`
}


/*||||||||||  SEZIONE FETCH CON FUNZIONE PER PRODOTTI ||||||||||     */
function aggiungiProdotti(limiteInferiore, limiteSuperiore, filtroCategoria, filtroNome) {

    fetch("https://fakestoreapi.com/products")
        .then((response) => { return response.json() })
        .then(data => {

            let prodotti = data.filter((prodotto) => {

                if (limiteSuperiore != undefined && filtroNome != "" && filtroCategoria != "") {
                    console.log("sono nel primo if")
                    return prodotto.price >= limiteInferiore && prodotto.price < limiteSuperiore && prodotto.title.startsWith(filtroNome) && prodotto.category == filtroCategoria;
                } else if (limiteSuperiore == undefined && (filtroNome != "" && filtroNome != undefined) && filtroCategoria != "") {
                    console.log("sono nel secondo if")
                    return prodotto.price >= limiteInferiore && prodotto.title.startsWith(filtroNome) && prodotto.category == filtroCategoria;
                } else if (limiteSuperiore == undefined && filtroNome == "" && filtroCategoria != "") {
                    console.log("sono nel terzo if" + limiteInferiore)
                    return prodotto.price >= limiteInferiore && prodotto.category == filtroCategoria;
                } else if (limiteSuperiore == undefined && filtroNome != "" && filtroCategoria == "") {
                    console.log("sono nel quarto if")
                    return prodotto.price >= limiteInferiore && prodotto.title.startsWith(filtroNome);
                } else if (limiteSuperiore != undefined && filtroNome == "" && filtroCategoria != "") {
                    console.log("sono nel quinto if")
                    return prodotto.price >= limiteInferiore && prodotto.price < limiteSuperiore && prodotto.category == filtroCategoria
                } else if (filtroCategoria != "" && filtroCategoria != undefined) {
                    console.log("sono nel sesto if")
                    return prodotto.category == filtroCategoria
                }
            })
            console.log(prodotti)

            for (let i = 0; i < prodotti.length; i++) {

                let prodotto = prodotti[i];
                console.log(prodotto)
                let prezzo = prodotto.price;
                let titolo = prodotto.title;
                let immagine = prodotto.image;
                let descrizione = prodotto.description;
                let idProdotto = prodotto.id

                document.getElementById("divCatalogo").innerHTML += ` <div class="container-card col-12 col-sm-4 col-xl-3 " id="${idProdotto}" >
                                                                        <div class="card-prodotto" onclick="apriProdotto(${idProdotto})">
                                                                            <div class="container-immagine-prodotto">
                                                                                <img class="img-prodotto" src="${immagine}">
                                                                            </div>
                                                                            <div class="container-testo-prodotto" style="border-top:1px solid rgba(218, 0, 55, 0.7);">
                                                                                <p id="titleProduct">${titolo}</p>

                                                                                <p  id="priceProduct">€${prezzo}</p>
                                                                            </div>

                                                                            <div class="container-button-prodotto">
                                                                                <div class="button-compra" onclick="apriProdotto(${idProdotto})">
                                                                                <p> Acquista</p>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                      </div>`
            }
            document.getElementById("cardVuota").style = "display:none"
        })
        .catch(error => {
            console.log(error)
        })

}







let filtroPrezzo;
let filtroCategoria;
let filtroNome;



function filtraCatalogo() {
    filtroPrezzo = document.getElementById("bottonePrezzo").value;
    filtroCategoria = document.getElementById("bottoneCategoria").value;
    filtroNome = document.getElementById("inputNome").value;




    window.location.href = `./catalogo.html?filtroPrezzo=${filtroPrezzo}&filtroCategoria=${filtroCategoria}&filtroNome${filtroNome}`
}


window.addEventListener("load", (event) => {

    if (window.location.href.includes("landingPage.html")) {
        console.log("Sto caricando la pagina");
        cicloImmagine();
    };

    if (window.location.href.includes("catalogo.html")) {
        let url = new URL(window.location.href)
        filtroPrezzo = url.searchParams.get("filtroPrezzo");
        filtroCategoria = url.searchParams.get("filtroCategoria");
        filtroNome = url.searchParams.get("filtroNome");

        if (filtroCategoria == "Elettronica") {
            filtroCategoria = "electronics"
        } else if (filtroCategoria == "Gioielli") {
            filtroCategoria = "jewelery"
        } else if (filtroCategoria == "Abbigliamento da Uomo") {
            filtroCategoria = "men's clothing"
        } else if (filtroCategoria == "Abbigliamento da Donna") {
            filtroCategoria = "women's clothing"
        }


        console.log(filtroPrezzo, filtroCategoria, filtroNome);
        let limiteInferiore = filtroPrezzo?.split("-")[0];
        let limiteSuperiore = filtroPrezzo?.split("-")[1];
        aggiungiProdotti(limiteInferiore, limiteSuperiore, filtroCategoria, filtroNome);
    }

    if (window.location.href.includes("prodotto.html")) {
        let url = new URL(window.location.href);
        filtroId = url.searchParams.get("id");

        aggiungiSingoloProdotto(filtroId)
    }
});



function aggiungiSingoloProdotto(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => { return response.json() })
        .then(data => {
            let singoloProdotto = data

            document.getElementById("containerVuoto").style = "display:none"
            document.getElementById("innerProdotto").innerHTML = `<div class="col-12 col-md-6">
            <div class="containerImmagineProdotto">
                <img src="${singoloProdotto.image}" class="immagineProdotto">
            </div>
        </div>

        <div class="col-12 col-md-6 ">

            <div class="containerDescrizioneProdotto">

                <div class="title">
                    <h1 class="titleProduct">${singoloProdotto.title}</h1>
                </div>

                <div class="description">
                    <h2 class="descrizioneProduct"> ${singoloProdotto.description}
                    </h2>
                </div>

                <div class="price">
                    <h2 class="prezzoProduct">
                        Prezzo: €${singoloProdotto.price}
                    </h2>
                </div>

                <div class="price">

                    <div class="divButtonCompra">
                        <div class="button-compra">
                            <p> Acquista</p>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>`


        }).catch(error => {
            console.log(error)
        })
}


function bordiImmagine(numeroImmagine) {
    document.getElementById(`imgCategoria${numeroImmagine}`).style = "border-radius:25px;filter:grayscale(0);"


}

function bordiImmagineNone(numeroImmagine) {
    document.getElementById(`imgCategoria${numeroImmagine}`).style = "border-radius:0px;filter:grayscale(1);"

}




/* |||||||| EVENTO DI SCROLL ||||||| */

/*

document.addEventListener("scroll", function () {
    
    //ottieni la posizioneCorrente
    let scrollTop = document.documentElement.scrollTop;
    let totalePaginaInPixel = document.documentElement.scrollHeight
    let altezzaInPixelDispositivoCorrente = document.documentElement.clientHeight
    let posizioneCorrente = scrollTop;
    
    //percentualeDiScroll
    let scrollPercentage = (posizioneCorrente / (totalePaginaInPixel - altezzaInPixelDispositivoCorrente)) * 100;
 
    //a che pixel inizia il div area1
    let area1OffsetTop = area1.offsetTop;
    //a che pixel finisce il div area1
    let area1Height = area1.offsetTop + area1.offsetHeight;
 
    let area2OffsetTop = area2.offsetTop;
    let area2Height = area2.offsetTop + area2.offsetHeight;

   let area3OffsetTop = area3.offsetTop;
    let area3Height = area3.offsetTop + area3.offsetHeight;
 
    //è vero che la posizione corrente è contenuta tra l'inzio e la fine?
    if (scrollTop > area1OffsetTop && scrollTop < area1Height) {
        area1.style.backgroundColor = "orange"
    } else {
        area1.style.backgroundColor = "white"
    }
    if (scrollTop > area2OffsetTop && scrollTop < area2Height) {
        area2.style.backgroundColor = "violet"
    } else {
        area2.style.backgroundColor = "white"
    }
    
})
*/




/* SEZIONE REGISTRAZIONE.HTML */

function registrati() {

    let eMail = document.getElementById("inputEmail").value;
    let nome = document.getElementById("inputNome").value;
    let cognome = document.getElementById("inputCognome").value;
    let telefono = document.getElementById("inputTelefono").value;
    let password = document.getElementById("inputPassword").value;
    let indirizzoCompleto = document.getElementById("inputIndirizzo").value;



    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

            username: 'kminchelle',
            password: '0lelplR',
            /*
            username: eMail,
            password: password,*/
            // expiresInMins: 60, // optional
        })
    })
        .then(res => res.json())
        .then((data)=>{
            console.log("Messaggio del server " + data?.message);

            if(data?.message != null) {
                console.log("autenticazione fallita")
                document.getElementById("erroreAutenticazione").style.display="block"
            } else{
                window.location.href = "home.html";


                localStorage.setItem("userToken", data.token)
            }
        });

    console.log(eMail, nome, cognome, telefono, password, indirizzoCompleto)


}