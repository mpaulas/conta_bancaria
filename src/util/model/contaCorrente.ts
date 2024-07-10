import { Conta } from "./Conta";

export class contaCorrente extends Conta{
    public teste(): void {
        throw new Error("Method not implemented.");
    }

    private _limite: number;


	constructor(numero: number, agencia: number, tipo: number, titular: string, saldo: number, limite: number) {
        super(numero, agencia, tipo, titular, saldo);
		this._limite = limite;
	}

    
	public get limite(): number {
		return this._limite;
	}

    
	public set limite(value: number) {
		this._limite = value;
	}

    public visualizar(){
        super.visualizar();
        console.log(`Limite: ${this._limite}`);
    }

    //Método Sacar Sobrescrito da Classe Conta:
    public sacar(valor: number):boolean{
        console.log(`Titular: ${this.titular} - Operação Selecionada: Sacar R$ ${valor.toFixed(2)}`);
        if((this.saldo + this.limite) >= valor){
            this.saldo = this.saldo - valor;
            //this._saldo -= valor; (outro jeito de fazer o código acima)
            console.log(`Saque de R$ ${valor.toFixed(2)}`);
            console.log(`Saldo Atual: R$ ${this.saldo.toFixed(2)}`)
            return true;
        }
        console.log("\nSaldo insuficiente.")
        return false;
        
    }
}