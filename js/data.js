$(document).ready(function() {
    let data_de_hoje = new Date();
    let dia = String(data_de_hoje.getDate()).padStart(2, '0');
    let mes = String(data_de_hoje.getMonth() + 1).padStart(2, '0');
    let ano = data_de_hoje.getFullYear();

    data_de_hoje = ano + '-' + mes + '-' + dia;
    $('#date_picker').attr('min', data_de_hoje);
    $('.data_editada').attr('min', data_de_hoje);

});