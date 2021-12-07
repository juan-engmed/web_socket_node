window.onload = function () {
  // Busca a referencia elementos da página
  var form = document.getElementById("message-form");
  let messageField1 = document.getElementById("message1");
  let messageField2 = document.getElementById("message2");
  var messagesList = document.getElementById("messages");
  var socketStatus = document.getElementById("status");
  var closeBtn = document.getElementById("closeBtn")

  // Cria um novo socket.
  var socket = new WebSocket("ws://localhost:9898");

  // Função para tratar os erros que podem ocorrer
  socket.onerror = function (error) {
    console.log("WebSocket Error: ", error);
  };

  // Função chamada no momento da conexão do cliente com o servidor
  socket.onopen = function (event) {
    socketStatus.innerHTML =
      "Conectado ao servidor: " + event.currentTarget.url;
    socketStatus.className = "open";
  };

  // Função para tratar mensagens enviadas pelo servidor.
  socket.onmessage = function (event) {
    var message = (event.data);
    messagesList.innerHTML +=
      '<li class="received"><span>Recebido:</span>' + message + "</li>";
  };

  // Função chamada no momento da desconexão do servidor com o cliente
  socket.onclose = function (event) {
    socketStatus.innerHTML = "Websocket desconectado.";
    socketStatus.className = "closed";
  };

  // Função que envia mensagens para o servidor através da conexão websocket
  form.onsubmit = function (e) {
    e.preventDefault();

    // Pega a mensagem digitada no campo de mensagem do formulário
    message1 = messageField1.value;
    message2 = messageField2.value;
    var btnAction = document.getElementById("myOptgroup").parentElement.value;
   
    
    alert(btnAction);

    // Envia a mensagem através do websocket
    socket.send(
      JSON.stringify({
      data: {
      message1: `${message1}`,
      /* message2: message2,
      btnAction: btnAction */
    }}));

    // Adiciona a mensagem enviada na tela
    messagesList.innerHTML +=
      `<li class="sent"><span>Enviado:</span> ${message1} ${message2} </li>`;

    // Limpa o campo de mensagem
    messageField1.value = "";
    messageField2.value = "";

    return false;
  };

  // Função que fecha a conexão websocket
  closeBtn.onclick = function (e) {
    e.preventDefault();

    socket.close();

    return false;
  };
};
