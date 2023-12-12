let listaImmagini = ["./image/skincare.jpg", "./image/abbigliamento.webp", "./image/telefonia.jpg"];
let presentationP = [""]
let img = document.getElementById("presentationImage");
let index = 0


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function cicloImmagine() {

    img.src = listaImmagini[index++ % listaImmagini.length];
    await settaStyle([...parametriImmagini])


    cicloImmagine()
}

let parametriImmagini = [{
    ritardo: 500,
    opacita: 0,

},
{
    ritardo: 1000,
    opacita: 0.8
},
{
    ritardo: 2000,
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


}


cicloImmagine()






function filtraCatalogo() {
    let filtroPrezzo = document.getElementById("bottonePrezzo").value;
    let filtroCategoria = document.getElementById("bottoneCategoria").value;
    let filtroNome = document.getElementById("inputNome").value;




    window.location.href = `./catalogo.html?filtroPrezzo=${filtroPrezzo}&filtroCategoria=${filtroCategoria}&filtroNome${filtroNome}`
}


window.addEventListener("load", (event) => {

    if (window.location.href.includes("landingPage.html")) {
        console.log("Sto caricando la pagina")
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


});

