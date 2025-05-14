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
    $.post("solicita_gencodigo", {campo: "ven_id", tabla: "vendedor"})
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
            sql = "insert into vendedor(ven_id, ven_nom, ven_ape, ven_ci, ven_direcc) values(" + 
                  $("#txtcodigo").val() + ", '" + 
                  nombre + "', '" + 
                  apellido + "', " + 
                  ci + ", '" + 
                  direccion + "')";
            conf = "¿DESEA GUARDAR EL NUEVO VENDEDOR?";
            men = "EL VENDEDOR FUE REGISTRADO CON ÉXITO";
        }
        
        if ($("#operacion").val() === "2") // editar
        {
            sql = "update vendedor set " + 
                  "ven_nom = '" + nombre + "', " +
                  "ven_ape = '" + apellido + "', " +
                  "ven_ci = " + ci + ", " +
                  "ven_direcc = '" + direccion + "' " +
                  "where ven_id = " + $("#txtcodigo").val();
            conf = "¿DESEA MODIFICAR ESTE VENDEDOR?";
            men = "EL VENDEDOR FUE MODIFICADO CON ÉXITO";
        }
        
        if ($("#operacion").val() === "3") // borrar
        {
            conf = "¿DESEA ELIMINAR ESTE VENDEDOR?";
            sql = "delete from vendedor where ven_id = " + $("#txtcodigo").val();
            men = "EL VENDEDOR FUE ELIMINADO CON ÉXITO";
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
    var sql = "SELECT * FROM vendedor WHERE ven_nom LIKE '%" + filtro + "%' OR ven_ape LIKE '%" + filtro + "%' ORDER BY ven_ape, ven_nom";
    $.post("extraer/get_vendedor", {sql: sql})
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