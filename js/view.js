function dataAtualFormatada(Data) {
  let data = new Date(Data),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();

  return diaF + "/" + mesF + "/" + anoF;
}

function formartarData(data) {
  let dataFormatada = data.split("-");
  return dataFormatada[2] + "/" + dataFormatada[1] + "/" + dataFormatada[0];
}

class UI {
  constructor() {
    this.lista = $("#lista-tarefas");
  }

  criarTarefa(tarefa) {
    this.lista.html("");

    tarefa.forEach((element) => {
      let concluido = element.status ?
        "text-decoration-line-through" :
        "bg-transparent";

      let checked = element.status ? "checked" : "";

      let html = `
            <li class="list-group-item ${concluido}  text-secondary  d-flex justify-content-between align-items-center flex-wrap" data-id="${element.id}">

                <div class="fs-4 d-flex  align-items-center col-lg-7 col-md-6 col-12 ">
                    <input class="form-check-input me-3" type="checkbox" value="desativado" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Marcar essa anotação"
                    ${checked}>
                    <span>${element.titulo}</span>
                </div>

                ${
                  element.dataConclusao
                    ? `
                <div class="me-5 mb-sm-0 mb-2 mt-sm-2 mt-2 validade border border-warning rounded col-lg-2 col-md-3 ">
                        <i class="bi bi-hourglass-split text-warning" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Data de vencimento"></i>
                        <span>${formartarData(element.dataConclusao)}</span>
                    </div>
                
                `
                    : ""
                }

                <div class="d-flex flex-sm-column invisible invisible conf align-items-center align-items-md-end align-items-sm-start col-lg-2 col-md-2 col-12">
                    <span class="d-flex justify-content-end align-items-center mb-1 me-sm-0 me-3">
                      <i class="btn bi bi-pencil-fill text-info fs-6 me-"  data-bs-placement="bottom" title="Editar anotação" data-bs-toggle="modal" data-bs-target="#editarModal" id="editar"></i>
            
                        <i class="bi bi-trash-fill text-danger fs-6" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Deletar anotação" id="deletar"></i>
                    </span>
                    <span>
                      <i class="bi bi-exclamation-circle-fill text-secondary fs-6" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Data de criação"></i>
                      <span>${dataAtualFormatada(element.dataCriacao)}</span>
                    </span>
                </div>
            </li>
            `;
      this.lista.append(html);
    });
  }
}