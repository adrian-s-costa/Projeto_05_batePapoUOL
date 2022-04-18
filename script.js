
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
    <p class = "nomeUser">Todos</p>
    <ion-icon name="checkmark" class="certin hidden"></ion-icon>
</div>
<div class = "users">

</div>
<div class="lateral-topo">
    <p>Escolha a visibilidade:</p>
</div>
<div class="sessao visibilidade" onclick="marcar2(this)">
    <ion-icon name="lock-open" class="icon-lat"></ion-icon>
    <p class = "nomeTipo">Todos</p>
    <p class = "msg hidden">message</p>
    <ion-icon name="checkmark" class="certin hidden"></ion-icon>
</div>
<div class="sessao visibilidade" onclick="marcar2(this)">
    <ion-icon name="lock-closed" class="icon-lat"></ion-icon>
    <p class = nomeTipo>Reservadamente</p>
    <p class = "msg hidden">private_message</p>
    <ion-icon name="checkmark" class="certin hidden"></ion-icon>
</div>
</div>

<div class="barra baixo">
<div>
    <input type="text" class="digitar" placeholder="Escreva aqui...">
    <div class = "lugarFTV"> </div>
</div>
<ion-icon name="paper-plane-outline" class="icon" onclick="enviarMensagem()"></ion-icon>
</div>`



window.onload = imprimirTela()

let userSelecionado, userSelecionado2, nome, user
let mensagemEnviar = {
    from: 0,
    to: 0,
    text: 0,
    type: 0,
}
let selecionado, selecionado2, destinatario, tipo, tipo2, responseData, requisicao2
var pressedEnter = false;

function aparecer(){
    const fundoPreto = document.querySelector(".fundo-preto")
    const barraLateral = document.querySelector(".barra-lateral")
    fundoPreto.classList.toggle("hidden")
    barraLateral.classList.toggle("hidden") 
}

function marcar(elementoClicado){
    userSelecionado = elementoClicado
    selecionado = document.querySelector(".sessao.pessoa.selecionado")
    

    if (selecionado !== null && userSelecionado.classList.contains("pessoa")){
        selecionado.querySelector(".certin").classList.add("hidden")
        selecionado.classList.remove("selecionado")
    }

    
   
    
    userSelecionado.classList.add("selecionado")
    userSelecionado.querySelector(".certin").classList.remove("hidden")
    
    console.log(userSelecionado)
    destinatario = userSelecionado.querySelector(".nomeUser").innerHTML
    
    fromToVisible()

}

function marcar2(elementoClicado){
    
    userSelecionado2 = elementoClicado
    selecionado2 = document.querySelector(".sessao.visibilidade.selecionado")

    
    
    if (selecionado2 !== null && userSelecionado2.classList.contains("visibilidade")){
        selecionado2.querySelector(".certin").classList.add("hidden")
        selecionado2.classList.remove("selecionado")
    }

    userSelecionado2.classList.add("selecionado")
    userSelecionado2.querySelector(".certin").classList.remove("hidden")

    tipo = userSelecionado2.querySelector(".msg.hidden").innerHTML
    tipo2 = userSelecionado2.querySelector(".nomeTipo").innerHTML

    fromToVisible()
}



function entrarUser(){
    
    nome = document.querySelector(".entrar").value


    user = { 
        name: nome,
    }
    

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user)




    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);
    
    function tratarSucesso() {
        
        document.querySelector(".tela-inicio").classList.add("hidden")
        abrirChat()
        manterConexao()
        usersON()
        getMessages()

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




function manterConexao(){

    function mandarStatus(){
        requisicao2 = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user)
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



function usersON(){

    axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    .then(function (){
        setInterval(usersOnline, 10000)
    })

    function usersOnline(){
        axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
        .then(function (response){
            responseData = response.data
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
}
    
let  messagesData

function getMessages(){

    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(function(){
        setInterval(getMessages2, 3000)
    })

    function getMessages2(){
        axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
        .then(function(resposta){
            messagesData = resposta.data
            const espacoDasMensagens = document.querySelector(".mensagens-agrupadas")
            espacoDasMensagens.innerHTML = ""
            for(let i = 0; i < messagesData.length; i++){
            
                const messageMolde = `<div class="mensagem ${messagesData[i].type}">
                <p class="time texto">(${messagesData[i].time})</p>
                <p class = "texto"> ${messagesData[i].from} ${messagesData[i].text} </p>
                </div>`
    
                const messageMoldeNormal = `<div class="mensagem ${messagesData[i].type}">
                <p class="time texto">(${messagesData[i].time})</p>
                <p class = "texto"><strong>${messagesData[i].from}</strong> para <strong> ${messagesData[i].to}: </strong> ${messagesData[i].text}</p>
                </div>`

                const messageMoldePriv = `<div class="mensagem ${messagesData[i].type}">
                <p class="time texto">(${messagesData[i].time})</p>
                <p class = "texto"><strong>${messagesData[i].from}</strong> reservadamente para <strong> ${messagesData[i].to}: </strong> ${messagesData[i].text}</p>
                </div>`
            
                if (messagesData[i].to === nome && messagesData[i].type === "private_message"){
                    espacoDasMensagens.innerHTML += messageMoldePriv
                }
                if (messagesData[i].to === "Todos" && messagesData[i].type !== "status"){
                    espacoDasMensagens.innerHTML += messageMoldeNormal
                }
                if (messagesData[i].type === "status"){
                    espacoDasMensagens.innerHTML += messageMolde
                }
                if (messagesData[i].type !== "private_message" && messagesData[i].to !== "Todos" && messagesData[i].type !== "status"){
                    espacoDasMensagens.innerHTML += messageMoldeNormal
                }
                
                
            }

        })
    }


}

function enviarMensagem(){
    
    mensagemEnviar.text = document.querySelector(".digitar").value
    mensagemEnviar.from = nome
    mensagemEnviar.to = destinatario
    mensagemEnviar.type = tipo
    envioDeMensage = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemEnviar)
    .then(function(){

        console.log("Deu certo")

    }).catch(function(){
        alert("O usuário não se encontra na sala")
        window.location.reload()
    })
    
    
}

function fromToVisible(){
    const moldeFTV = `<p class="horario direcionamento">Enviando pra ${destinatario} (${tipo2})</p>`
    const lugar = document.querySelector(".lugarFTV")
    lugar.innerHTML = moldeFTV
}



function enter(){

document.onkeyup=function(e){
	if(e.which == 13)
	pressedEnter = false;
}

document.onkeydown=function(e){
	if(e.which == 13){
		pressedEnter = true;
    }
    if (pressedEnter == enter){
        enviarMensagem()
    }
}
}
