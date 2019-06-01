import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  carro: any = { 'modelo': null, 'cor': null };
  tabelaNome: string;
  carros: any;
  busca: any = { 'modelo': null };
  encontrado: any;

  constructor(protected DB: DatabaseService) {
    this.carros = this.DB.getRegistros();
    this.tabelaNome = this.DB.tabelaNome;
  }
  adicionar() {
    this.DB.inserir(this.carro);
    this.carros = this.DB.getRegistros();
  }

  remover(carro: any) {
    if (this.DB.remover(carro)) {
      this.carros = this.DB.getRegistros();
      alert(`Registro ${carro.modelo} - ${carro.cor} removido.`);
    }
  }

  atualizar(carro: any) {
    if (this.DB.atualizar(carro)) {
      this.carros = this.DB.getRegistros();
      alert(`Registro ${carro.modelo} - ${carro.cor} atualizado.`);
    }
  }

  buscar(carro: any) {
    this.encontrado = this.DB.procurar(carro);
    if(this.encontrado){
      this.encontrado = JSON.stringify(this.encontrado);
    }else{
      alert(`${carro.modelo} não encontrado.`);
    }
  }
}
