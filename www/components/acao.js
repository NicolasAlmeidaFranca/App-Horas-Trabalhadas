function preencheHora(){
    var hora = "";
    for(var x = 0; x <= 23; x++){
      if(x <= 9){
        hora+="<option value="+x+">0"+x+"</option>";
      }else{
        hora+="<option value="+x+">"+x+"</option>";
      }
    }
    $("#horaEntrada").html(hora);
    $("#horaSaida").html(hora);
}

$(document).on("click","#irBuscar",function(){
  $(location).attr("href","listar.html");
});


$(document).on("click","#cadastrar",function(){

var parametros ={
"nome":$("#nome").val(),
"modelo":$("#modelo").val(),
"marca":$("#marca").val(),
"tipo":$("#tipo").val(),
"placa":$("#placa").val(),
"horaEntrada" : $("#horaEntrada").val()
};
$.ajax({
type: "post",
url: "https://nicolasafco.000webhostapp.com/cadastra.php",

data: parametros,
success: function(data){
  navigator.notification.alert(data);

  $("nome").val("");
  $("modelo").val("");
  $("marca").val("");
  $("tipo").val("");
  $("placa").val("");
  $("horaEntrada").val("")
  

},
error: function(data){
  navigator.notification.alert("Erro ao cadastrar");
  }
 })
});

//buscar
$(document).on("click","#buscarRegistro",function(){
var parametro ={
      "placa":$("#placaBusca").val()
    };
    
    $.ajax({
      type:"post",
      url:"https://nicolasafco.000webhostapp.com/buscar.php",//para onde vou enviar
      data:parametro,
      datatype:"json",
      //caso esteja tudo certo executa esse codigo
      success: function(data){
        $("#placa").val(data.veiculo.nr_placa);
        $("#nome").val(data.veiculo.nome);
        $("#marca").val(data.veiculo.marca);
        $("#tipo").val(data.veiculo.tipo);
        $("#modelo").val(data.veiculo.modelo);
        $("#horaEntrada").val(data.veiculo.horaEntrada);
      },
      //caso algo esteja errado executa esse codigo
      error: function(data){
        navigator.notification.alert("Erro ao buscar registros!");
      }
    });
});