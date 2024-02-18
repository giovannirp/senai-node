const chalk = require('chalk');
const inquirer = require('inquirer');

// Função principal que executa o questionário
function main() {
    console.log(chalk.bgRed.white('Bem-vindo ao questionário!\n'));

    // Perguntar ao usuário seu nome
    inquirer.prompt({
        name: 'name',
        message: 'Qual é o seu nome?'
    })
      .then(nameAnswer => {

        // Perguntar ao usuário sua idade
        return inquirer.prompt({
            name: 'age',
            message: 'Quantos anos você tem?'
        }).then(ageAnswer => {

            // Imprimir mensagem com idade na tela
            console.log(chalk.bgRed.black(`Olá, ${nameAnswer.name}! Você tem ${ageAnswer.age} anos!`));
        });
    })
      .catch(error => {
        console.error(error);
    });
}

// Chamar a função principal
main();