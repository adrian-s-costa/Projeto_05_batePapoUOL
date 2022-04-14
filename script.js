
const telaInicio = `<div class="tela-inicio">
<img src="imagens/logo 1.png">
<input type="text" class="entrar">
<button onclick="entrarUser()">Entrar</button>
</div>`





const corpoCod = `<div class="barra topo">
<img src="imagens/logo 1.png" class="logo">
<ion-icon name="people" class="icon" onclick="aparecer()"></ion-icon>
</div>
<div class="mensagens-agrupadas">
</div>
<div class="fundo-preto hidden" >
<div class="barra-lateral">
<div class = "lateral-topo">
    <ion-icon name="close-sharp" class="sair" onclick="aparecer()"></ion-icon>
    <p>Escolha um contato pra enviar mensagem:</p>
</div>
<div class="sessao pessoa" onclick="marcar(this)">
    <ion-icon name="person" class="icon-lat"></ion-icon>
    <p>Todos</p>
    <ion-icon name="checkmark" class="certin hidden"></ion-icon>
</div>
<div class="sessao pessoa" onclick="marcar(this)">
    <ion-icon name="person-circle" class="icon-lat"></ion-icon>
    <p>Jao</p>
    <ion-icon name="checkmark" class="certin hidden"></ion-icon>
</div>
<div class="sessao pessoa" onclick="marcar(this)">
    <ion-icon name="person-circle" class="icon-lat"></ion-icon>
    <p class="">July</p>
    <ion-icon name="checkmark" class="certin hidden"></ion-icon>
</div>
<div class="lateral-topo">
    <p>Escolha a visibilidade:</p>
</div>
<div class="sessao visibilidade" onclick="marcar(this)">
    <ion-icon name="lock-open" class="icon-lat"></ion-icon>
    <p>Todos</p>
    <ion-icon name="checkmark" class="certin hidden"></ion-icon>
</div>
<div class="sessao visibilidade" onclick="marcar(this)">
    <ion-icon name="lock-closed" class="icon-lat"></ion-icon>
    <p>Reservadamente</p>
    <ion-icon name="checkmark" class="certin hidden"></ion-icon>
</div>
</div>
</div>
<div class="barra baixo">
<div>
    <input type="text" class="digitar" placeholder="Escreva aqui...">
    <p class="horario direcionamento">Enviando pra OFADSSE</p>
</div>
<ion-icon name="paper-plane-outline" class="icon" onclick="testarMsg()"></ion-icon>
</div>`



window.onload = imprimirTela()

let nome 
let user = {}

function aparecer(){
    let elemento = document.querySelector(".fundo-preto")
    console.log(elemento)
    elemento.classList.toggle("hidden") 
}

function marcar(elementoClicado){
    
    console.log(elementoClicado)
    const selecionado = document.querySelector(".sessao.pessoa.selecionado")
    const selecionado2 = document.querySelector(".sessao.visibilidade.selecionado")

    if (selecionado !== null && elementoClicado.classList.contains("pessoa")){
        selecionado.querySelector(".certin").classList.add("hidden")
        selecionado.classList.remove("selecionado")
    }

    

    if (selecionado2 !== null && elementoClicado.classList.contains("visibilidade")){
        selecionado2.querySelector(".certin").classList.add("hidden")
        selecionado2.classList.remove("selecionado")
    }
   
    
    elementoClicado.classList.add("selecionado")
    elementoClicado.querySelector(".certin").classList.remove("hidden")
    
}


function entrarUser(){
    
    nome = document.querySelector(".entrar").value

    user = { 
        name: nome,
    }
    
    console.log(user.name)

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user)

    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);
    
    function tratarSucesso(resposta) {
        
        document.querySelector(".tela-inicio").classList.add("hidden")
        abrirChat()
        const mensagemEntrada = `<div class="mensagem entrada-saida">
        <p class="horario texto">(09:22:48)</p>
        <p class = "texto" class="texto"> <strong>${nome}</strong> entra </p>
        </div>`
        espaçoDasMensagens = document.querySelector(".mensagens-agrupadas")
        espaçoDasMensagens.innerHTML += mensagemEntrada
        manterConexao()
    }

    function tratarErro(erro) {
        console.log("Status code: " + erro.response.status);
	    console.log("Mensagem de erro: " + erro.response.data);
        alert('Digite outro nome por favor, esse já está em uso!')
        imprimirTela()
        
    }

}


function imprimirTela(){
    const tela = document.querySelector(".pagina")
    tela.innerHTML = telaInicio
}

function abrirChat(){
    const tela = document.querySelector(".pagina")
    tela.innerHTML = corpoCod
}

function testarMsg(){
    const espaçoDasMensagens = document.querySelector(".mensagens-agrupadas")
    let mensagemm = document.querySelector(".digitar").value
    const message = `<div class="mensagem entrada-saida">
    <p class="horario texto">(09:22:48)</p>
    <p class = "texto"> ${mensagemm} </p>
    </div>`
    espaçoDasMensagens.innerHTML += message

    

    

}

let requisicao2

function manterConexao(){

    function mandarStatus(){
        requisicao2 = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user)
        console.log("ta online bonitão")
    }

    requisicao2 = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user)
    requisicao2.then(tratarSucesso);
    requisicao2.catch(tratarErro);

    let meuInterval = setInterval(mandarStatus, 4000)

    function tratarSucesso(){
        setInterval(meuInterval, 4000)
    }

    function tratarErro(){
        clearInterval(meuInterval)
    }
}

