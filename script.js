
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
<div class="fundo-preto hidden" onclick="aparecer()">
</div>
<div class="barra-lateral hidden">
<div class = "lateral-topo">
    <p>Escolha um contato pra enviar mensagem:</p>
</div>
<div class="sessao pessoa" onclick="marcar(this)">
    <ion-icon name="person" class="icon-lat"></ion-icon>
    <p>Todos</p>
    <ion-icon name="checkmark" class="certin hidden"></ion-icon>
</div>
<div class = "users">

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

<div class="barra baixo">
<div>
    <input type="text" class="digitar" placeholder="Escreva aqui...">
    <p class="horario direcionamento">Enviando pra OFADSSE</p>
</div>
<ion-icon name="paper-plane-outline" class="icon" onclick="testarMsg()"></ion-icon>
</div>`



window.onload = imprimirTela()

let userSelecionado
let nome 
let user = {}
let mensagemEnviar = {
    from: 0,
    to: 0,
    text: 0,
    type: 0,
}

function aparecer(){
    const fundoPreto = document.querySelector(".fundo-preto")
    const barraLateral = document.querySelector(".barra-lateral")
    console.log(fundoPreto)
    fundoPreto.classList.toggle("hidden")
    barraLateral.classList.toggle("hidden") 
}

function marcar(elementoClicado){
    userSelecionado = elementoClicado
    console.log(elementoClicado)
    const selecionado = document.querySelector(".sessao.pessoa.selecionado")
    const selecionado2 = document.querySelector(".sessao.visibilidade.selecionado")

    if (selecionado !== null && userSelecionado.classList.contains("pessoa")){
        selecionado.querySelector(".certin").classList.add("hidden")
        selecionado.classList.remove("selecionado")
    }

    

    if (selecionado2 !== null && userSelecionado.classList.contains("visibilidade")){
        selecionado2.querySelector(".certin").classList.add("hidden")
        selecionado2.classList.remove("selecionado")
    }
   
    
    userSelecionado.classList.add("selecionado")
    userSelecionado.querySelector(".certin").classList.remove("hidden")
    
}


function entrarUser(){
    
    nome = document.querySelector(".entrar").value


    user = { 
        name: nome,
    }
    
    console.log(user.name)

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user)


    console.log(user)


    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);
    
    function tratarSucesso(resposta) {
        
        document.querySelector(".tela-inicio").classList.add("hidden")
        abrirChat()
        const mensagemEntrada = `<div class="mensagem entrada-saida">
        <p class="horario texto">()</p>
        <p class = "texto" class="texto"> <strong>${nome}</strong> entra </p>
        </div>`
        espaçoDasMensagens = document.querySelector(".mensagens-agrupadas")
        espaçoDasMensagens.innerHTML += mensagemEntrada
        manterConexao()

        usersON()

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
    mensagemEnviar.text = document.querySelector(".digitar").value
    mensagemEnviar.from = nome
    mensagemEnviar.to = userSelecionado.querySelector(".nomeUser").innerHTML
    console.log(mensagemEnviar)
    const message = `<div class="mensagem entrada-saida">
    <p class="horario texto">()</p>
    <p class = "texto"> ${mensagemEnviar.text} </p>
    </div>`
    espaçoDasMensagens.innerHTML += message


}



function entradas(){


   
    
   
   
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

let responseData

function usersON(){

    let participantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    .then(function (response){
        setInterval(usersOnline, 10000)
    })

    function usersOnline(){
        axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
        .then(function (response){
        responseData = response.data
        console.log(responseData.length)
        
        let lugarOn = document.querySelector(".users")
        lugarOn.innerHTML = ""
        
        for (let i = 0; i < responseData.length; i++){
            const moldeContato = `<div class="sessao pessoa" onclick="marcar(this)">
            <ion-icon name="person-circle" class="icon-lat"></ion-icon>
            <p class = "nomeUser">${responseData[i].name}</p>
            <ion-icon name="checkmark" class="certin hidden"></ion-icon>
            </div>`
            lugarOn.innerHTML += moldeContato
        }
        })
    }

    const mensagemEntrada = `<div class="mensagem entrada-saida">
        <p class="horario texto">()</p>
        <p class = "texto" class="texto"> <strong>${nome}</strong> entra </p>
        </div>`

}

function getMessages(){
    axios.get()
}


