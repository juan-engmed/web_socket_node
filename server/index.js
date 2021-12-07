const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

//Inicializa um servidor HTTP orquestrado pelo express
const server = http.createServer(app);

//Inicializa um instancia de servidor websocket a partir do servidor http
const wss = new WebSocket.Server({ server });

// Função responsável por manusear a conexão websocket
wss.on("connection", (ws) => {
  // Função que trata as mensagens recebidas pelo servidor
  ws.on("message", (message1) => {
    console.log(`Mensagem recebida: ${message1.message1}`);
    ws.send(message1);
    //ws.send(message2);
  });
});

//Inicia o servidor
server.listen(process.env.PORT || 9898, () => {
  console.log("Servidor conectado na porta:", server.address().port);
});