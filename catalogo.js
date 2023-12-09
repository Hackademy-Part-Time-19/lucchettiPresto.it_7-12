let listaImmagini = ["./image/skincare.jpg", "./image/abbigliamento.webp", "./image/telefonia.jpg"]
let index = 0
let img = document.getElementById("presentationImage")
let presentationP=[""]




/*
setInterval(function () {


    img.src = listaImmagini[index];
    document.getElementById("presentationImage").style = "opacity:0;display:block ";
    setTimeout(() => { document.getElementById("presentationImage").style = "opacity:1;display:block " }, 1000);
    setTimeout(() => { document.getElementById("presentationImage").style = "opacity:0;display:block " }, 3000)



    index > 1 ? index = 0 : index++;


}, 3500)*/



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

async function settaStyle( oggetti) {
    const oggetto = oggetti.shift()
    if (oggetto == undefined) {
        return;
    };
    img.style = `opacity:${oggetto.opacita}; display:block`;
    await delay(oggetto.ritardo)
    return settaStyle(oggetti)


}


cicloImmagine()




let prodotti=[
   
]

function filtraPerPrezzo() {

    let nome=document.getElementById("titleProduct")
    let prezzo= document.getElementById("priceProduct")

    let OggettiProdototti=[
        { 
            nomeProdotto:nome,
            prezzoProdotto:prezzo,
            nomeDaFiltrare: nomeProdotto.toLowerCase()
        }, 
    ]

    prodotti= prodotti.push(OggettiProdototti)
}