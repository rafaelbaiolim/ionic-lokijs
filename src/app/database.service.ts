import { Injectable } from '@angular/core';
import * as Loki from 'lokijs';
import * as LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter'
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: any;
  dbNome: string = "BANCO.db";

  tabela: any;
  tabelaNome: string = "CARROS";

  constructor() { }

  /**
   * Carrega o banco
   */
  loadDB() {
    let promise = new Promise((resolve, reject) => {
      let adapter = new LokiIndexedAdapter();
      this.db = new Loki(this.dbNome, {
        autosave: true,
        adapter: adapter
      });
      this.db.loadDatabase({}, (err) => {
        if (err) {
          console.log("Erro na incicialização do banco.");
        }
        else {
          console.log("Banco carregado.");
          resolve();
        }
      });
    });
    return promise;
  }

  /**
   * Inicializa o banco
   */
  initTable() {
    let promise = new Promise((resolve, reject) => {
      let tabela = this.db.getCollection(this.tabelaNome);
      if (tabela) { //se já existir uma tabela com o nome criado só faz o load
        resolve(true);  
      }
      this.tabela = this.db.addCollection(this.tabelaNome); //adiciona a tabela ao banco
      resolve(true);
    });
    return promise;
  }
  
  /**
   * Inserir
   * @param dat 
   */
  inserir(dat:any){
    return this.tabela.insert(dat);
  }

  /**
   * Pesquisar
   * Outras formas de pesquisa: 
   * https://github.com/techfort/LokiJS/wiki/Query-Examples
   * @param dat 
   */
  procurar(query:any){
    return this.tabela.findOne(query);
  }

  /**
   * Remover
   */
  remover(item:any){
    if(item){
      this.tabela.remove(item);
      return true;
    }else{
      console.log("Registro não encontrado.");
    }
  }

  /**
   * Atualizar
   */
  atualizar(item:any){
    if(item){
      this.tabela.update(item);
      return true;
    }else{
      console.log("Registro não encontrado.");
    }
  }

  /**
   * Busca todos os registros do banco
   */
  getRegistros(){
    return this.tabela.chain().data();
  }

}
