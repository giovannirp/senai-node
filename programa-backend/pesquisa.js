const chalk = require('chalk');
const inquirer = require('inquirer');

//função principal que executa o questionário
function main() {
  console.log(chalk.bgRed.white('Bem vindo ao questionário!\n'));

  //perguntar ao usuário seu nome
  inquirer.prompt({
    name: 'name',
    message: 'Qual é seu nome?'
  })
    //Promise - JavaScript
    .then((nomeResponder) => {
      // pergunta ao usuário sua idade
      return inquirer.prompt({
        name: 'age',
        message: 'Quantos anos você tem?'
      })
      .then((idadeResponder) => {

        // imprimir mensagem com idade na tela
        console.log(chalk.bgRed.black(`Olá, ${nomeResponder.name}! Você tem ${idadeResponder.age} anos!`));
      })
      .catch((error) => {
        console.log("aqui é o erro", error);
      })
    
    })
}

// chamar a função principal
main();