import { ContaRepository } from "../repository/ContaRepository";
import { Conta } from "../util/model/Conta";

export class ContaController implements ContaRepository{

    //Coleção Array que vai armazenar os Objetos Conta
    private listaContas: Array<Conta> = new Array<Conta>();

    //Controlar os nº das Contas
    public numero: number = 0;



    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if(buscaConta !== null)
            buscaConta.visualizar();
        else
            console.log(`\nA Conta ${numero} não foi encontrada.`);
    }
    
    listarTodas(): void {
        for(let conta of this.listaContas){
            conta.visualizar();
        }
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log("Conta cadastrada com sucesso.");
    }

    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if(buscaConta !== null){

            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(`\nA Conta ${conta.numero} foi atualizada.`);

        }else
            console.log(`\nA Conta ${conta.numero} não foi encontrada.`);
    
    }

    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if(buscaConta !== null){

            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(`\nA Conta ${numero} foi excluida.`);

        }else
            console.log(`\nA Conta ${numero} não foi encontrada.`);
    }

    sacar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    //Métodos auxiliares

    public gerarNumero(): number{
        return ++ this.numero;
    }

    public buscarNoArray(numero: number): Conta | null{
        for (let conta of this.listaContas){
            if (conta.numero == numero)
                return conta;
        }
        return null;
    }
    
}