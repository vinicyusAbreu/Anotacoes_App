$(document).ready(function () {
  view.criarTarefa(bd.mostrarTarefas());

  $("#adicionar").on("click", cliqueBTN);

  $("ul").on("click", "li input[type=checkbox]", concluirTarefa);
  $("ul").on("click", "li #deletar", deletarTarefa);
  $("ul").on("click", "li #editar", selecionarTarefaParaEditar);
  $("#btnEdit").on("click", editarTarefa);
  //Selecionar select jquery
  $("#filtrar").on("change", filtrarTarefas);
  $("#ordernar").on("change", ordenarTarefas);
});
