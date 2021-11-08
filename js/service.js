const bd = new BD();
bd.carregarTarefas();
const view = new UI();

function cliqueBTN() {
    const tarefa = $("#notações").val();
    const dataCriacao = new Date();
    const vencimento = $("#date_picker").val();
    if (tarefa == "") {
        inputVazio("erroInput");
    } else {
        bd.criarTabela(tarefa, dataCriacao, vencimento);

        ordenarTarefas();

        $("#notações").val("");
        $("#date_picker").val("");
    }
}

function concluirTarefa(e) {
    if (this.checked) {
        const id = $(this.closest("li")).data("id");
        $(this.closest("li")).removeClass("bg-transparent");
        $(this.closest("li")).addClass("text-decoration-line-through");
        bd.marcarTarefa(id);

        ordenarTarefas();
    } else {
        $(this.closest("li")).removeClass("text-decoration-line-through");
        $(this.closest("li")).addClass("bg-transparent");
        bd.marcarTarefa($(this.closest("li")).data("id"));

        ordenarTarefas();
    }
}

function deletarTarefa() {
    const id = $(this.closest("li")).data("id");
    $(this.closest("li")).fadeOut(() => {
        bd.apagarTarefa(id);
        view.criarTarefa(bd.mostrarTarefas());
    });
}

function selecionarTarefaParaEditar() {
    const id = $(this.closest("li")).data("id");

    const valores = bd.pegarValor(id);

    $("#edicao").val(valores[0].titulo);
    $(".data_editada").val(valores[0].dataConclusao);
    $(".modal").attr("data-edicao", id);
}

function editarTarefa() {
    const tarefa = $("#edicao").val();
    const vencimento = $(".data_editada").val();
    const id = $(".modal").attr("data-edicao");
    if (tarefa == "") {
        inputVazio("erroEdit");
    } else {
        bd.editarTarefa(id, tarefa, vencimento);
        ordenarTarefas();
        $(".modal .btn-close").click();
    }
}

function filtrarTarefas() {
    switch (this.value || $("#filtrar").val()) {
        case "completo":
            view.criarTarefa(bd.mostrarTarefasConcluidas());
            break;
        case "ativo":
            view.criarTarefa(bd.mostrarTarefasNaoConcluidas());
            break;
        case "vencimento":
            view.criarTarefa(bd.mostrarVencimentosTarefas());
            break;
        default:
            view.criarTarefa(bd.mostrarTarefas());
            break;
    }
}

function ordenarTarefas() {
    if (this.value === "primeiro" || $("#ordernar").val() === "primeiro") {
        bd.ordernarTarefasPrimeiro();
        filtrarTarefas();
    } else {
        bd.ordernarTarefasUltimo();
        filtrarTarefas();
    }
}

function inputVazio(valor) {
    $(`#${valor}`).append(
        '<div class="mt-3 alert alert-danger" role="alert"> É obrigatório preencher o campo da anotações!</div>'
    );
    $(".alert-danger").fadeOut(3000, () => {
        $(".alert-danger").remove();
    });
}