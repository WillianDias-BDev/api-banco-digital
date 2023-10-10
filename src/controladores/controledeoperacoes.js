let { contas } = require('../bancodedados');

function verificarSenha(usuario, senha, res) {
    if (senha !== usuario.senha) {
        return res.status(400).json({ mensagem: 'Senha inválida.' });
    }
}

function verificarCampos(campoObrigatorio, res) {
    for (const campo in campoObrigatorio) {
        if (!campoObrigatorio[campo]) {
            return res.status(400).json(`O campo ${campo} é obrigatório`);
        }
    }
}

function verificarExistenciaConta(req, res, numeroConta, cpfExistente, emailExistente) {
    const contaCadastrada = contas.find(conta => conta.numero === numeroConta);

    if (Number(contaCadastrada.numero) !== Number(numeroConta) && cpfExistente && emailExistente) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o CPF e Email informado.' });
    }

    if (Number(contaCadastrada.numero) !== Number(numeroConta) && emailExistente) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o email informado.' });
    }

    if (Number(contaCadastrada.numero) !== Number(numeroConta) && cpfExistente) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o CPF informado.' });
    }
}

const { format } = require('date-fns')
const data = new Date();
const dataFormatada = format(data, 'yyyy-MM-dd HH:mm:ss');


module.exports = {
    verificarSenha,
    verificarCampos,
    verificarExistenciaConta,
    dataFormatada,
}
