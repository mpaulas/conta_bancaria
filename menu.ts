import readlinesync = require("readline-sync");
import { colors } from "./src/util/color";
import { Conta } from "./src/util/model/Conta";
import { contaCorrente } from "./src/util/model/contaCorrente";
import { contaPoupanca } from "./src/util/model/contaPoupanca";
import { ContaController } from "./src/controller/ContaController";
import { read } from "fs";

export function main() {

    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string;
    const tipoContas=[`Conta Corrente`, `Conta Poupança`];
    
    const contas: ContaController = new ContaController();

    //Novas Instancias Classe ContaCorrente (objetos)
    contas.cadastrar(new contaCorrente(contas.gerarNumero(), 1234, 1, "Amanda ", 10000.00,1000.00));
    contas.cadastrar(new contaCorrente(contas.gerarNumero(), 4567, 1, "João ", 10000.00,10000.00));

    //Novas Instancias Classe ContaPoupança (objetos)
    contas.cadastrar(new contaPoupanca(contas.gerarNumero(), 5789, 2, "Geana ", 1000.00,10));
    contas.cadastrar(new contaPoupanca(contas.gerarNumero(), 5698, 2, "Jean ", 1500.00,15));


    while (true) {
        console.log(colors.bg.black, colors.fg.yellowstrong);
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ",
            colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 9) {
            console.log("\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, "\n\nCriar Conta\n\n", colors.reset);

                console.log(`Digite o Número da Agência: `);
                agencia = readlinesync.questionInt("");

                console.log(`Digite o Nome do Titular da Conta: `);
                titular = readlinesync.question("");

                console.log(`Digite o Tipo de Conta: `);
                tipo = readlinesync.keyInSelect(tipoContas, "", {cancel: false}) + 1; //Pq o vetor começa em 0 mas as contas é a partir do 1 então (+1).

                console.log(`Digite o Saldo da Conta: `);
                saldo = readlinesync.questionFloat("");

                switch(tipo){
                    case 1:
                        console.log(`Digite o Limite da Conta: `);
                        limite= readlinesync.questionFloat("");
                        contas.cadastrar(
                            new contaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite)
                        )
                        break;

                    case 2:
                        console.log(`Digite a Data de Aniversário da Conta: `);
                        aniversario = readlinesync.questionInt("");
                        contas.cadastrar(
                            new contaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario)
                        )   
                        break;
                }

                break;
            case 2:
                console.log("\n\nListar todas as Contas\n\n");
                contas.listarTodas();
                keyPress();
                break;
            case 3:
                console.log("\n\nConsultar dados da Conta - por número\n\n");
                console.log("Digite o número da conta: ")
                numero=readlinesync.questionInt("");
                contas.procurarPorNumero(numero);
                
                keyPress();
                break;
            case 4:
                console.log("\n\nAtualizar dados da Conta\n\n");

                console.log("Digite o número da conta: ")
                numero = readlinesync.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if(conta){

                    console.log(`Digite o Número da Agência: `);
                    agencia = readlinesync.questionInt("");

                    console.log(`Digite o Nome do Titular da Conta: `);
                    titular = readlinesync.question("");

                    console.log(`Digite o Saldo da Conta: `);
                    saldo = readlinesync.questionFloat("");

                    tipo = conta.tipo;

                    switch(tipo){
                        case 1:
                        console.log(`Digite o Limite da Conta: `);
                        limite= readlinesync.questionFloat("");
                        contas.atualizar(
                            new contaCorrente(numero, agencia, tipo, titular, saldo, limite)
                        )
                        break;

                        case 2:
                        console.log(`Digite a Data de Aniversário da Conta: `);
                        aniversario = readlinesync.questionInt("");
                        contas.atualizar(
                            new contaPoupanca(numero, agencia, tipo, titular, saldo, aniversario)
                        )   
                        break;
                    }
                }else{
                    console.log(`\nA conta número: ${numero} não foi encontrada.`)
                }

                keyPress();
                break;

            case 5:
                console.log("\n\nApagar uma Conta\n\n");

                console.log("Digite o número da conta: ")
                numero=readlinesync.questionInt("");
                contas.deletar(numero);

                keyPress();
                break;
            case 6:
                console.log("\n\nSaque\n\n");
                
                console.log("Digite o número da conta: ")
                numero=readlinesync.questionInt("");

                console.log("Digite o valor do saque: ")
                valor = readlinesync.questionFloat("");

                contas.sacar(numero, valor);

                keyPress();
                break;
            case 7:
                console.log("\n\nDepósito\n\n");

                console.log("Digite o número da conta: ")
                numero=readlinesync.questionInt("");

                console.log("Digite o valor do Deposito: ")
                valor = readlinesync.questionFloat("");

                contas.depositar(numero, valor);

                keyPress();
                break;
            case 8:
                console.log("\n\nTransferência entre Contas\n\n");

                console.log("Digite o número da Conta de Origem: ")
                numero = readlinesync.questionInt("");

                console.log("Digite o número da Conta de Destino: ")
                numeroDestino = readlinesync.questionInt("");


                console.log("Digite o valor da tranferencia: ")
                valor = readlinesync.questionFloat("");

                contas.transferir(numero, numeroDestino, valor);

                keyPress();
                break;
            default:
                console.log("\nOpção Inválida!\n");

                break;
        }
    }

}



export function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Maria Paula");
    console.log("Generation Brasil - maria.alves@genstudents.org");
    console.log("github.com/mpaulas/generation.git");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}
 

main();