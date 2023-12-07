let listaImmagini = ["./image/skincare.jpg", "./image/abbigliamento.webp", "./image/telefonia.jpg"]
let index = 0
let img = document.getElementById("presentationImage")
let imgIndex = 0

setInterval(() => {
    if (index == 0) {

        img.src = listaImmagini[index];
        document.getElementById("presentationImage").style = "opacity:0; display:block";
        setTimeout(() => { document.getElementById("presentationImage").style = "opacity:1; display:block" }, 1000);
        setTimeout(() => { document.getElementById("presentationImage").style = "opacity:0; display:block" }, 1500)

    } else if (index == 1) {

        img.src = listaImmagini[index];
        document.getElementById("presentationImage").style = "opacity:0; display:block";
        setTimeout(() => { document.getElementById("presentationImage").style = "opacity:1; display:block" }, 1000);
        setTimeout(() => { document.getElementById("presentationImage").style = "opacity:0; display:block" }, 1500)

    } else if (index == 2) {

        img.src = listaImmagini[index];
        document.getElementById("presentationImage").style = "opacity:0; display:block";
        setTimeout(() => { document.getElementById("presentationImage").style = "opacity:1; display:block" }, 1000);
        setTimeout(() => { document.getElementById("presentationImage").style = "opacity:0; display:block" }, 1500)

    }

    index > 1 ? index = 0 : index++;

    console.log(index)
}, 2500)



