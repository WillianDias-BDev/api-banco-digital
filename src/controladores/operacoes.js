let { contas, depositos, saques, transferencias } = require('../bancodedados');
const { verificarCampos, verificarSenha, verificarExistenciaConta, dataFormatada } = require('./controledeoperacoes')


const listarContas = (req, res) => {
    const senha = req.query.senha_banco

    if (senha === 'Cubos123Bank') {
        return res.status(200).json(contas)
    } else {
        return res.status(401).json({ mensagem: 'A senha do banco informada é inválida!' })
    }
}

const criarContaBancaria = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const campoObrigatorio = { nome, cpf, data_nascimento, telefone, email, senha };
    const cadastro = req.body;

    verificarCampos(campoObrigatorio, res);

    const usuarioExistente = contas.find(conta => conta.usuario.cpf === cpf || conta.usuario.email === email);
    if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o CPF ou Email informado' });
    }

    const novaConta = {
        numero: (contas.length + 1).toString(),
        saldo: 0,
        usuario: cadastro
    }

    contas.push(novaConta);

    return res.status(204).send();
}

const atualizarConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const contaCadastrada = contas.find(conta => Number(conta.numero) === Number(numeroConta));
    const emailExistente = contas.find(conta => conta.usuario.email === email);
    const cpfExistente = contas.find(conta => Number(conta.usuario.cpf) === Number(cpf));

    verificarExistenciaConta(req, res, numeroConta, cpfExistente, emailExistente);

    if (!contaCadastrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    function atualizarUsuario(contaCadastrada, nome, cpf, data_nascimento, telefone, email, senha, res) {
        if (email) {
            contaCadastrada.usuario.email = email;
        }

        if (cpf) {
            contaCadastrada.usuario.cpf = cpf;
        }

        contaCadastrada.usuario.nome = nome;
        contaCadastrada.usuario.data_nascimento = data_nascimento;
        contaCadastrada.usuario.telefone = telefone;
        contaCadastrada.usuario.senha = senha;

        return res.status(204).json();
    }

    atualizarUsuario(contaCadastrada, nome, cpf, data_nascimento, telefone, email, senha, res)

}



const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const contaCadastrada = contas.find(conta => conta.numero === numeroConta);

    if (!contaCadastrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    if (contaCadastrada.saldo === 0) {
        contas = contas.filter(conta => conta.numero !== numeroConta);
        return res.status(204).send();
    } else {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' })

    }


}

const depositarValor = (req, res) => {
    const { numero_conta, valor } = req.body;
    const campoObrigatorio = { numero_conta, valor };

    verificarCampos(campoObrigatorio, res);

    const contaCadastrada = contas.find(conta => conta.numero === numero_conta);

    if (!contaCadastrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' });
    }

    const novoDeposito = {
        data: dataFormatada,
        numero_conta: numero_conta,
        valor: valor
    }

    const saldoDisponivel = contaCadastrada.saldo + valor;

    contaCadastrada.saldo = saldoDisponivel;

    depositos.push(novoDeposito);

    return res.status(200).send();

}

const sacarValor = (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    const campoObrigatorio = { numero_conta, valor, senha };

    verificarCampos(campoObrigatorio, res);

    const contaCadastrada = contas.find(conta => conta.numero === numero_conta);
    const { usuario } = contaCadastrada;

    verificarSenha(usuario, senha, res);

    if (!contaCadastrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    };

    if (contaCadastrada.saldo <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero!' })
    };

    const saldoDisponivel = contaCadastrada.saldo - valor;

    const novoSaque = {
        data: dataFormatada,
        numero_conta: numero_conta,
        valor: valor
    }

    contaCadastrada.saldo = saldoDisponivel;

    saques.push(novoSaque);

    return res.status(200).send();

}


const trasnferirValor = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const campoObrigatorio = { numero_conta_origem, numero_conta_destino, valor, senha };
    const origem = contas.find(conta => conta.numero === numero_conta_origem);
    const destino = contas.find(conta => conta.numero === numero_conta_destino);
    const contasInformadas = { origem, destino }
    const { usuario } = origem;

    verificarCampos(campoObrigatorio, res);

    for (const campo in contasInformadas) {
        if (!contasInformadas[campo]) {
            return res.status(400).json({ mensagem: `Conta ${campo} não encontrada.` });
        }
    }

    verificarSenha(usuario, senha, res);

    if (origem.saldo <= 0) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' })
    }

    const saldoDisponivel = origem.saldo - valor;
    const destinoDisponivel = destino.saldo + valor;

    const novaTransferencia = {
        data: dataFormatada,
        numero_conta: numero_conta_origem,
        valor: valor
    }

    origem.saldo = saldoDisponivel
    destino.saldo = destinoDisponivel

    transferencias.push(novaTransferencia);

    return res.status(200).send();

}

const saldo = (req, res) => {
    const senha = req.query.senha;
    const numeroConta = req.query.numero_conta;
    const campoObrigatorio = { senha, numeroConta };

    verificarCampos(campoObrigatorio, res);

    const contaCadastrada = contas.find(conta => conta.numero === numeroConta);
    const { usuario } = contaCadastrada;

    verificarSenha(usuario, senha, res);

    if (!contaCadastrada) {
        return res.status(404).json('Conta bancária não encontrada!')
    }

    return res.status(200).json({ saldo: contaCadastrada.saldo })
}

const extrato = (req, res) => {
    const senha = req.query.senha;
    const numeroConta = req.query.numero_conta;
    const campoObrigatorio = { senha, numeroConta };

    verificarCampos(campoObrigatorio, res);

    const contaCadastrada = contas.find(conta => conta.numero === numeroConta);

    if (!contaCadastrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    const { usuario } = contaCadastrada;

    verificarSenha(usuario, senha, res);

    depositos = depositos.filter(deposito => deposito.numero_conta === contaCadastrada.numero);
    saques = saques.filter(saque => saque.numero_conta === contaCadastrada.numero);
    transferencias = transferencias.filter(transferencia => transferencia.numero_conta === contaCadastrada.numero);


    return res.status(200).json({ depositos: depositos, saques: saques, transferenciasEnviadas: transferencias })
}



module.exports = {
    listarContas,
    criarContaBancaria,
    atualizarConta,
    excluirConta,
    depositarValor,
    sacarValor,
    trasnferirValor,
    saldo,
    extrato
}