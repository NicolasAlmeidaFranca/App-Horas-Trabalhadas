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

function preencheMinuto(){
  var minuto = "";
    for(var x = 0; x <= 59; x++){
      if(x <= 9){
        minuto+="<option value="+x+">0"+x+"</option>";
      }else{
        minuto+="<option value="+x+">"+x+"</option>";
      }
    }
    $("#minutoEntrada").html(minuto);
    $("#minutoSaida").html(minuto);
}

$(document).on("click","#calcular",function(){
  var horaEntrada =parseFloat($("option:selected",("#horaEntrada")).val());
  var horaSaida = parseFloat($("option:selected",("#horaSaida")).val());
  var minutoEntrada =parseFloat($("option:selected",("#minutoEntrada")).val());
  var minutoSaida = parseFloat($("option:selected",("#minutoSaida")).val());
  var valorHora = parseFloat($("option:selected",("#funcao")).val());
  
  var total = ((horaSaida + (minutoSaida/60)) - (horaEntrada + (minutoEntrada/60))) * valorHora;

  $("#resultado").val(total.toFixed(2));
 
 var parametros ={
      "nome":$("#nome").val(),
      "entrada":horaEntrada+":"+minutoEntrada+":00",
      "saida":horaSaida+":"+minutoSaida+":00",
      "funcao":$("option:selected",("#funcao")).text(),
      "valor": total.toFixed(2)
  };
  $.ajax({
      type:"post",//como vou enviar os dados ao servidor
      url:"https://nicolasafco.000webhostapp.com/cadastra.php",//para onde vou enviar
      data:parametros,//o que eu vou enviar
      //caso esteja tudo certo executa esse codigo
      success: function(data){
        navigator.notification.alert(data);
      },
      //caso algo esteja errado executa esse codigo
      error: function(data){
        navigator.notification.alert("Erro ao cadastrar!");
      }
    });
});
$(document).on("click","#irBuscar",function(){
  $(location).attr("href","listar.html");
});
$(document).on("click","#voltar",function(){
  $(location).attr("href","index.html");
});

$(document).on("click","#buscarRegistro",function(){
  var parametro ={
      "nome":$("#nomeBusca").val()
    };
    
    $.ajax({
      type:"post",//como vou enviar os dados ao servidor
      url:"https://nicolasafco.000webhostapp.com/buscar.php",//para onde vou enviar
      data:parametro,
      dataType:"json",
      //caso esteja tudo certo executa esse codigo
      success: function(data){
        $("#nome").val(data.funcionario.nome);
        $("#funcao").val(data.funcionario.funcao);
        $("#entrada").val(data.funcionario.entrada);
        $("#saida").val(data.funcionario.saida);
        $("#valor").val(data.funcionario.valor);
      },
      //caso algo esteja errado executa esse codigo
      error: function(data){
        navigator.notification.alert("Erro ao buscar registros!");
      }
    });
});