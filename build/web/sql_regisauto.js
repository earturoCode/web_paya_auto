function agregar() 
{
    // Habilitar campos de entrada
    $("#txtmodelo").removeAttr("disabled");
    $("#txtcolor").removeAttr("disabled");
    $("#txtversion").removeAttr("disabled");
    $("#txtmotor").removeAttr("disabled");
    $("#txtserie").removeAttr("disabled");
    $("#txtplaca").removeAttr("disabled");
    $("#txtkm").removeAttr("disabled");
    $("#txtestado").removeAttr("disabled");
    $("#cboMarca").removeAttr("disabled");
    
    // Habilitar y deshabilitar botones  
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnAgregar").attr("disabled", "true");
    $("#btnModificar").attr("disabled", "true");
    $("#btnBorrar").attr("disabled", "true");
    $("#btnSalir").attr("disabled", "true");
    
    $("#operacion").val("1");
    
    // Solicitar código automático
    $.post("solicita_gencodigo", {campo: "aut_id", tabla: "autos"})
            .done(function (data) {
                $("#txtcodigo").val(data);
            });
}

function modificar() 
{
    // Habilitar campos de entrada para edición
    $("#txtmodelo").removeAttr("disabled");
    $("#txtcolor").removeAttr("disabled");
    $("#txtversion").removeAttr("disabled");
    $("#txtmotor").removeAttr("disabled");
    $("#txtserie").removeAttr("disabled");
    $("#txtplaca").removeAttr("disabled");
    $("#txtkm").removeAttr("disabled");
    $("#txtestado").removeAttr("disabled");
    $("#cboMarca").removeAttr("disabled");
    
    // Habilitar y deshabilitar botones
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnAgregar").attr("disabled", "true");
    $("#btnModificar").attr("disabled", "true");
    $("#btnBorrar").attr("disabled", "true");
    $("#btnSalir").attr("disabled", "true");
    
    $("#operacion").val("2");
    $("#txtmodelo").select();
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
    $("#txtmodelo").attr("disabled", "true");
    $("#txtcolor").attr("disabled", "true");
    $("#txtversion").attr("disabled", "true");
    $("#txtmotor").attr("disabled", "true");
    $("#txtserie").attr("disabled", "true");
    $("#txtplaca").attr("disabled", "true");
    $("#txtkm").attr("disabled", "true");
    $("#txtestado").attr("disabled", "true");
    $("#cboMarca").attr("disabled", "true");
    
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
    $("#txtmodelo").val("");
    $("#txtcolor").val("");
    $("#txtversion").val("");
    $("#txtmotor").val("");
    $("#txtserie").val("");
    $("#txtplaca").val("");
    $("#txtkm").val("");
    $("#txtestado").val("");
    $("#cboMarca").val("0");
}

function grabar() 
{
    var modelo = $.trim($("#txtmodelo").val());
    var placa = $.trim($("#txtplaca").val());
    var km = $.trim($("#txtkm").val());
    var estado = $.trim($("#txtestado").val());
    var marca = $("#cboMarca").val();

    if (modelo === "" || placa === "" || km === "" || estado === "" || marca === "0") 
    {
        alertify.alert('DEBES LLENAR TODOS LOS CAMPOS OBLIGATORIOS');
    } else 
    {
        var sql = "";
        var men = "";
        var conf = "";
        
        if ($("#operacion").val() === "1") // agregar
        {
            sql = "insert into autos(aut_id, mar_id, aut_modelo, aut_color, aut_versio, aut_motor, aut_serie, aut_placa, aut_km, aut_estado) values(" + 
                  $("#txtcodigo").val() + ", " + 
                  marca + ", '" + 
                  modelo + "', '" + 
                  $("#txtcolor").val() + "', " + 
                  ($("#txtversion").val() || "NULL") + ", '" + 
                  $("#txtmotor").val() + "', '" + 
                  $("#txtserie").val() + "', '" + 
                  placa + "', " + 
                  km + ", '" + 
                  estado + "')";
            conf = "¿DESEA GUARDAR EL NUEVO AUTO?";
            men = "EL AUTO FUE REGISTRADO CON ÉXITO";
        }
        
        if ($("#operacion").val() === "2") // editar
        {
            sql = "update autos set " + 
                  "mar_id = " + marca + ", " +
                  "aut_modelo = '" + modelo + "', " +
                  "aut_color = '" + $("#txtcolor").val() + "', " +
                  "aut_versio = " + ($("#txtversion").val() || "NULL") + ", " +
                  "aut_motor = '" + $("#txtmotor").val() + "', " +
                  "aut_serie = '" + $("#txtserie").val() + "', " +
                  "aut_placa = '" + placa + "', " +
                  "aut_km = " + km + ", " +
                  "aut_estado = '" + estado + "' " +
                  "where aut_id = " + $("#txtcodigo").val();
            conf = "¿DESEA MODIFICAR ESTE AUTO?";
            men = "EL AUTO FUE MODIFICADO CON ÉXITO";
        }
        
        if ($("#operacion").val() === "3") // borrar
        {
            conf = "¿DESEA ELIMINAR ESTE AUTO?";
            sql = "delete from autos where aut_id = " + $("#txtcodigo").val();
            men = "EL AUTO FUE ELIMINADO CON ÉXITO";
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
    var sql = "SELECT a.*, m.mar_nom FROM autos a INNER JOIN marcas m ON a.mar_id = m.mar_id WHERE a.aut_modelo LIKE '%" + filtro + "%' OR a.aut_placa LIKE '%" + filtro + "%' ORDER BY a.aut_modelo";
    $.post("extraer/get_autos", {sql: sql})
        .done(function (data) {
            $("#grilla tbody").html(data);
        });
}

function cargar_marcas()
{
    var sql = "SELECT * FROM marcas ORDER BY mar_nom";
    $.post("extraer/get_marcas_combo", {sql: sql})
        .done(function (data) {
            $("#cboMarca").html(data);
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
                $("#cboMarca").val($(this).text());
                break;
            case 2:
                $("#txtmodelo").val($(this).text());
                break;
            case 3:
                $("#txtcolor").val($(this).text());
                break;
            case 4:
                $("#txtversion").val($(this).text());
                break;
            case 5:
                $("#txtmotor").val($(this).text());
                break;
            case 6:
                $("#txtserie").val($(this).text());
                break;
            case 7:
                $("#txtplaca").val($(this).text());
                break;
            case 8:
                $("#txtkm").val($(this).text());
                break;
            case 9:
                $("#txtestado").val($(this).text());
                break;
        }
    });
}

$(function () 
{
    get_datos("");
    cargar_marcas();
});