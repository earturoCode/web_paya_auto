/* global alertify */

function agregar() 
{
    // Habilitar campos de entrada
    $("#txtnombre").removeAttr("disabled");
    $("#txtapellido").removeAttr("disabled");
    $("#txtci").removeAttr("disabled");
    $("#txtdireccion").removeAttr("disabled");
    
    // Habilitar y deshabilitar botones  
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnAgregar").attr("disabled", "true");
    $("#btnModificar").attr("disabled", "true");
    $("#btnBorrar").attr("disabled", "true");
    $("#btnSalir").attr("disabled", "true");
    
    $("#operacion").val("1");
    
    // Solicitar código automático
    $.post("solicita_gencodigo", {campo: "cli_id", tabla: "cliente"})
            .done(function (data) {
                $("#txtcodigo").val(data);
            });
}

function modificar() 
{
    // Habilitar campos de entrada para edición
    $("#txtnombre").removeAttr("disabled");
    $("#txtapellido").removeAttr("disabled");
    $("#txtci").removeAttr("disabled");
    $("#txtdireccion").removeAttr("disabled");
    
    // Habilitar y deshabilitar botones
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnAgregar").attr("disabled", "true");
    $("#btnModificar").attr("disabled", "true");
    $("#btnBorrar").attr("disabled", "true");
    $("#btnSalir").attr("disabled", "true");
    
    $("#operacion").val("2");
    $("#txtnombre").select();
}

function borrar() 
{
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnAgregar").attr("disabled", "true");
    $("#btnModificar").attr("disabled", "true");
    $("#btnBorrar").attr("disabled", "true");
    $("#btnSalir").attr("disabled", "true");
    
    $("#operacion").val("3");
    grabar();
}

function cancelar() 
{
    clear_text();
    // Deshabilitar campos de entrada
    $("#txtnombre").attr("disabled", "true");
    $("#txtapellido").attr("disabled", "true");
    $("#txtci").attr("disabled", "true");
    $("#txtdireccion").attr("disabled", "true");
    
    // Restaurar botones
    $("#btnGrabar").attr("disabled", "true");
    $("#btnCancelar").attr("disabled", "true");
    $("#btnAgregar").removeAttr("disabled");
    $("#btnModificar").removeAttr("disabled");
    $("#btnBorrar").removeAttr("disabled");
    $("#btnSalir").removeAttr("disabled");
    
    get_datos("");
}

function clear_text()
{
    $("#txtcodigo").val("");
    $("#txtnombre").val("");
    $("#txtapellido").val("");
    $("#txtci").val("");
    $("#txtdireccion").val("");
}

function grabar() 
{
    var nombre = $.trim($("#txtnombre").val());
    var apellido = $.trim($("#txtapellido").val());
    var ci = $.trim($("#txtci").val());
    var direccion = $.trim($("#txtdireccion").val());

    if (nombre === "" || apellido === "" || ci === "" || direccion === "") 
    {
        alertify.alert('DEBES LLENAR TODOS LOS CAMPOS');
    } else 
    {
        var sql = "";
        var men = "";
        var conf = "";
        
        if ($("#operacion").val() === "1") // agregar
        {
            sql = "insert into cliente(cli_id, cli_nom, cli_ape, cli_ci, cli_direcc) values(" + 
                  $("#txtcodigo").val() + ", '" + 
                  nombre + "', '" + 
                  apellido + "', " + 
                  ci + ", '" + 
                  direccion + "')";
            conf = "¿DESEA GUARDAR EL NUEVO CLIENTE?";
            men = "EL CLIENTE FUE REGISTRADO CON ÉXITO";
        }
        
        if ($("#operacion").val() === "2") // editar
        {
            sql = "update cliente set " + 
                  "cli_nom = '" + nombre + "', " +
                  "cli_ape = '" + apellido + "', " +
                  "cli_ci = " + ci + ", " +
                  "cli_direcc = '" + direccion + "' " +
                  "where cli_id = " + $("#txtcodigo").val();
            conf = "¿DESEA MODIFICAR ESTE CLIENTE?";
            men = "EL CLIENTE FUE MODIFICADO CON ÉXITO";
        }
        
        if ($("#operacion").val() === "3") // borrar
        {
            conf = "¿DESEA ELIMINAR ESTE CLIENTE?";
            sql = "delete from cliente where cli_id = " + $("#txtcodigo").val();
            men = "EL CLIENTE FUE ELIMINADO CON ÉXITO";
        }
        
        alertify.confirm(conf, function (e) 
        {
            if (e) 
            {
                $.post("enviosqlBoot", {sql: sql, men: men})
                    .done(function (data) {
                        alertify.alert(data);
                        cancelar();
                    });
            }
        });
    }
}

function get_datos(filtro)
{
    var sql = "SELECT * FROM cliente WHERE cli_nom LIKE '%" + filtro + "%' OR cli_ape LIKE '%" + filtro + "%' ORDER BY cli_ape, cli_nom";
    $.post("extraer/get_cliente", {sql: sql})
        .done(function (data) {
            $("#grilla tbody").html(data);
        });
}

function seleccion(parent) 
{
    parent.find("td").each(function(index)
    {
        switch(index) {
            case 0:
                $("#txtcodigo").val($(this).text());
                break;
            case 1:
                $("#txtnombre").val($(this).text());
                break;
            case 2:
                $("#txtapellido").val($(this).text());
                break;
            case 3:
                $("#txtci").val($(this).text());
                break;
            case 4:
                $("#txtdireccion").val($(this).text());
                break;
        }
    });
}

$(function () 
{
    get_datos("");
});