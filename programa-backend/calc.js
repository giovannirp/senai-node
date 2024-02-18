const chalk = require('chalk');
const inquirer = require('inquirer');

// Função para somar dois números
function somarNumeros(num1, num2) {
  return num1 + num2;
}

// Função para subtrair dois números
function somarNumeros(num1, num2) {
  return num1 - num2;
}

function main() {
    // Perguntar ao usuário dois números
  inquirer.prompt([
    {
      name: 'numero1',
      message: 'Digite o primeiro número:'
    },
    {
      name: 'numero2',
      message: 'Digite o segundo número:'
    }
  ])
  // Promise - JavaScript
  .then((respostas) => {
    // Converter os números para valores númericos
    const numero1 = Number(respostas.numero1);
    const numero2 = Number(respostas.numero2);

    // Calcular a soma
    const resultado = somarNumeros(numero1, numero2);

    // Imprimir o resultado usando chalk para formatação
    console.log(chalk.green(`A soma de ${numero1} e ${numero2} é ${resultado}`));
    console.log(chalk.bgRed.white(`Valeu, volte sempre!`));

  })
    .catch((error) => {
      console.log(chalk.red('Ocorreu um erro:', error));
    })

}

main();

