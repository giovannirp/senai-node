const chalk = require('chalk');
const inquirer = require('inquirer');

// Função principal que solicita um número e imprime sua tabuada
function main() {
  console.log(chalk.yellow('Bem-vindo ao programa de tabuada!\n'));

  // Perguntar ao usuário qual número deseja ver a tabuada
  inquirer.prompt({
    name: 'numero',
    message: 'Digite um número para ver a sua tabuada'
  })
  //Promise - JavaScript
  .then((resposta) => {
    const numero = parseInt(resposta.numero);

    // Imprimir a tabuada do número fornecido
    console.log(chalk.green(`Tabuada do ${numero}:\n`))
    
    for(let i = 0; i <= 10; i++) {
      console.log(`${numero} x ${i} = ${numero * i}`);
    }
  }).catch((error) => {
    console.error(chalk.red('Ocorreu um erro:', error));
  })
}

// Chamar a função principal
main();