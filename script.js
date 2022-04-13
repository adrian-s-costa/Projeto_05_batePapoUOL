function aparecer(){
    let elemento = document.querySelector(".fundo-preto")
    console.log(elemento)
    elemento.classList.toggle("hidden") 
}

function marcar(elementoClicado){
    
    console.log(elementoClicado)
    const selecionado = document.querySelector(".sessao.pessoa.selecionado")
    

    if (selecionado !== null && elementoClicado.classList.contains("pessoa")){
     selecionado.querySelector(".certin").classList.add("hidden")
     selecionado.classList.remove("selecionado")
    }

    elementoClicado.classList.add("selecionado")
    elementoClicado.querySelector(".certin").classList.remove("hidden")

    
    
}

function marcar2(elementoClicado){
    
    console.log(elementoClicado)
    const selecionado = document.querySelector(".sessao.visibilidade.selecionado")
    

    if (selecionado !== null && elementoClicado.classList.contains("visibilidade")){
     selecionado.querySelector(".certin").classList.add("hidden")
     selecionado.classList.remove("selecionado")
    }

    elementoClicado.classList.add("selecionado")
    elementoClicado.querySelector(".certin").classList.remove("hidden")

    
    
}