const express = require('express');
const operadores = require('./controladores/operacoes');

const routers = express();

routers.get('/contas', operadores.listarContas);
routers.post('/contas', operadores.criarContaBancaria);
routers.put('/contas/:numeroConta/usuario', operadores.atualizarConta);
routers.delete('/contas/:numeroConta', operadores.excluirConta);
routers.post('/transacoes/depositar', operadores.depositarValor);
routers.post('/transacoes/sacar', operadores.sacarValor);
routers.post('/transacoes/transferir', operadores.trasnferirValor);
routers.get('/contas/saldo', operadores.saldo);
routers.get('/contas/extrato', operadores.extrato);

module.exports = routers;