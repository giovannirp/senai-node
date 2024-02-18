// modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// modulos internos
const fs = require("fs");

// teste para mostrar que iniciamos
console.log("Iniciamos o Accounts");

// função para criar conta
function criarConta() {
  // aqui somente mensagem
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));

  //função construindo a conta
  construindoConta();
}

//função para construindo a conta
function construindoConta() {
  inquirer
    .prompt([
      {
        name: 'nomeDaConta',
        message: 'Digite um nome para sua conta:'
      }
    ])
    .then((resposta) => {
      // visualizando o nome
      // console.log(resposta);
      const nomeDaConta = resposta['nomeDaConta']

      console.log(nomeDaConta)

      //criando um tipo de banco de dados para criar a conta
      if (!fs.existsSync('Contas')) {
        fs.mkdirSync('contas');
      }

      // verificando se a conta existe
      if (fs.existsSync(`contas/${nomeDaConta}.json`)) {
        console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'),)
        // Mostrando novamente todo o processo das mensagem
        construindoConta();
        return false;
      }

      // Fazendo a criação do arquivo
      fs.writeFileSync(`contas/${nomeDaConta}.json`, '{"balance": 0}', 
        function(error) {
          console.log(error)
        }
      )

      //mensagem de sucesso
      console.log(chalk.green('Parabéns, a sua conta foi criada!'));
    })
    .catch((error) => console.log(error))
}

// função para verificar a conta
function checarConta(nomeConta) {
  if (!fs.existsSync(`contas/${nomeConta}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'));
    return false;
  }
}

// função para pegar a conta
function getConta(nomeDaConta) {
  const contaJson = fs.readFileSync(`contas/${nomeDaConta}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })

  return JSON.parse(contaJson);
}

//Função mostrar saldo da conta
function obterSaldo() {
  inquirer.prompt([
    {
      name: 'nomeDaConta',
      message: 'Qual o nome da sua conta?'
    }
  ])
  .then((resposta) => {
    const nomeDaConta = resposta['nomeDaConta'];

    // verifica se a conta existe
    if(!checarConta(nomeDaConta)) {
      return obterSaldo();
    }

    const contaData = getConta(nomeDaConta);

    console.log(chalk.bgBlue.black(
      `Olá, o saldo da conta é de R$${contaData.balance}`,
    ),
    )


  })
  .catch((error) => console.log(error))
}

//criando função
// criando os menus
function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: ["Criar Conta", "Consultar Saldo", "Depositar", "Sacar", "Sair"],
      }
    ])
    // aqui é uma promessa
    // Criando as logicas com os menus
    .then((resposta) => {
      const action = resposta['action'];

      if (action === 'Criar Conta') {
        // console.log("Criar Conta")
        criarConta();
      }

      if (action === 'Consultar Saldo') {
        // console.log("Consultar Saldo");
        obterSaldo();
      }

      if (action === "Depositar") {
        console.log("Depositar");
      }

      if (action === "Sacar") {
        console.log("Sacar");
      }

      if (action === "Sair") {
        // console.log("Sair");
        console.log(chalk.bgBlue.black('Obrigado por usar o sistema'));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

// invocando a função
operation();