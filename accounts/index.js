// modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// modulos internos
const fs = require("fs");

// console.log("Iniamos o Accounts");

//criando função
function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: ["Criar Conta", "Consultar Saldo", "Depositar", "Sacar", "Sair"],
      },
    // Promise 
  ])
  // nao vao aparecer nada, a seleção
  // .then()
  .then((answer) => {
    const action = answer['action'];

    // console.log("gigi", action);
    if (action === "Criar Conta") {
      createAccount();
    } 
    // depois continuou
    else if(action === 'Depositar') {
      // Chamando a função
      deposit();
    }
    else if(action === 'Consultar Saldo') {
      getAccountBalance();
    } 
    else if(action === 'Sacar') {
      console.log("Sacar");
    } 
    // finalizando e saindo
    else if(action === 'Sair') {
      console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'));
      process.exit();
    }

  })
  .catch((err) => console.log(err))
}

// função criando a conta
function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green('Defina as opções da sua conta a seguir'));

  // chamando a função finalizando a compra
  buildAccount();
}

// função finalizando a criação de conta
function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para a sua conta:',
      },
    ])
    .then((answer) => {
      //visualizando o nome
      // console.log(answer);
      const accountName = answer['accountName'];

      console.log(accountName);
      
      //criando um tipo de banco de dados para criar a conta
      if (!fs.existsSync('Accounts')) {
        fs.mkdirSync('accounts');
      }

      //verificando se a conta existe
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta já existe, escola outro nome!'),)
        buildAccount();
        // encerrando as ações
        return false;
      }

      // depois, agora fazendo a criação do arquivo
      fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', 
        function(err) {
          console.log(err)
        },
      )

      // Mensagem de sucesso
      console.log(chalk.green('Parabéns, a sua conta foi criada!'));
    })
    .catch((err) => console.log())
}

//Adicionar um valor à conta do usuário
function deposit() {

  inquirer
    .prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }
  ])
  .then((answer) => {
    const accountName = answer['accountName'];

    // Verifica se a conta exists
    if (!checkAccount(accountName)) {
      return deposit();
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: 'Quanto você deseja depositar'
      }
    ]).then((answer) => {
      const amount = answer['amount'];

      // add an amount
      addAmount(accountName, amount);
      operation();


    }).catch(err => console.log(err));
  })
  .catch(err => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'));
    return false;
  }

  return true;
}

// adicionando uma quantia
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
      return deposit()
    }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    }
  )

  console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`));
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })

  return JSON.parse(accountJSON);
}

// invocando a função
operation();

// show accout balance
function getAccountBalance() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }
  ]).then((answer) => {
    const accountName = answer['accountName'];

    //verify if account exists
    if (!checkAccount(accountName)) {
      return getAccountBalance();
    }

    const accountData = getAccount(accountName);

    console.log(chalk.bgBlue.black(
      `Olá, o saldo da conta é de R$${accountData.balance}`,
    ),
    )
    operation();

  }
  ).catch(err => console.log(err))
}