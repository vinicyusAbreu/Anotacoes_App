class BD {
  constructor() {
    this.arrayTarefas = [];
    this.id = 0;
  }

  criarTabela(titulo, dataCriacao, dataConclusao) {
    if (titulo == null) {
      return;
    }
    this.arrayTarefas.unshift({
      id: ++this.id,
      titulo: titulo,
      dataCriacao: dataCriacao,
      dataConclusao: dataConclusao,
      status: false,
    });

    this.salvarTarefas(this.arrayTarefas);
  }
  mostrarTarefas() {
    return this.arrayTarefas;
  }
  apagarTarefa(id) {
    this.arrayTarefas = this.arrayTarefas.filter((tarefa) => tarefa.id != id);
    this.salvarTarefas(this.arrayTarefas);
  }
  editarTarefa(id, title, dataConclusao) {
    const tarefa = this.pegarValor(id);
    tarefa[0].titulo = title;
    tarefa[0].dataConclusao = dataConclusao;
    this.salvarTarefas(this.arrayTarefas);
  }
  pegarValor(id) {
    return this.arrayTarefas.filter((tarefa) => tarefa.id == id);
  }

  marcarTarefa(id) {
    const tarefa = this.pegarValor(id);
    tarefa[0].status = !tarefa[0].status;
    this.salvarTarefas(this.arrayTarefas);
  }
  mostrarTarefasConcluidas() {
    return this.arrayTarefas.filter((tarefa) => tarefa.status == true);
  }
  mostrarTarefasNaoConcluidas() {
    return this.arrayTarefas.filter((tarefa) => tarefa.status == false);
  }
  mostrarVencimentosTarefas() {
    return this.arrayTarefas.filter((tarefa) => tarefa.dataConclusao);
  }
  ordernarTarefasPrimeiro() {
    //Javascript order array last to first
    return this.arrayTarefas.sort((a, b) => {
      return a.id - b.id;
    });
  }
  ordernarTarefasUltimo() {
    //Javascript order array first to last
    return this.arrayTarefas.sort((a, b) => {
      return b.id - a.id;
    });
  }
  salvarTarefas(tarefa) {
    localStorage.setItem("tarefas", JSON.stringify(tarefa));
  }
  carregarTarefas() {
    const tarefa = localStorage.getItem("tarefas");
    if (tarefa) {
      this.arrayTarefas = JSON.parse(tarefa);
      this.id = this.arrayTarefas.length;
    }
  }
}