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
    $("#cboMarcas").removeAttr("disabled");
    
    // Habilitar y deshabilitar botones  
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnAgregar").attr("disabled", "true");
    $("#btnModificar").attr("disabled", "true");
    $("#btnBorrar").attr("disabled", "true");
    $("#btnSalir").attr("disabled", "true");
    
    $("#operacion").val("1");
    
    // Limpiar los campos antes de solicitar código
    clear_text();
    
    // Solicitar código automático
    $.post("solicita_gencodigo", {campo: "aut_id", tabla: "autos"})
            .done(function (data) {
                $("#txtcodigo").val(data);
            });
}

function modificar() 
{
    // Verificar si hay un registro seleccionado
    if ($("#txtcodigo").val() === "") {
        alertify.alert("Debe seleccionar un auto para modificar");
        return;
    }
    
    // Habilitar campos de entrada para edición
    $("#txtmodelo").removeAttr("disabled");
    $("#txtcolor").removeAttr("disabled");
    $("#txtversion").removeAttr("disabled");
    $("#txtmotor").removeAttr("disabled");
    $("#txtserie").removeAttr("disabled");
    $("#txtplaca").removeAttr("disabled");
    $("#txtkm").removeAttr("disabled");
    $("#txtestado").removeAttr("disabled");
    $("#cboMarcas").removeAttr("disabled");
    
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
    // Verificar si hay un registro seleccionado
    if ($("#txtcodigo").val() === "") {
        alertify.alert("Debe seleccionar un auto para eliminar");
        return;
    }
    
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
    $("#cboMarcas").attr("disabled", "true");
    
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
    $("#cboMarcas").val("0");
}

function grabar() 
{
    var modelo = $.trim($("#txtmodelo").val());
    var placa = $.trim($("#txtplaca").val());
    var km = $.trim($("#txtkm").val());
    var estado = $.trim($("#txtestado").val());
    var marca = $("#cboMarcas").val();

    if (modelo === "" || placa === "" || km === "" || estado === "" || marca === "0") 
    {
        alertify.alert('DEBES LLENAR TODOS LOS CAMPOS OBLIGATORIOS');
    } else 
    {
        var sql = "";
        var men = "";
        var conf = "";
        
        // Preparar los valores para SQL
        var color = $.trim($("#txtcolor").val()) || "''";
        var version = $.trim($("#txtversion").val());
        version = version === "" ? "NULL" : version;

        var motor = $.trim($("#txtmotor").val()) || "''";
        var serie = $.trim($("#txtserie").val()) || "''";
        
        if ($("#operacion").val() === "1") // agregar
        {
            sql = "INSERT INTO autos(aut_id, mar_id, aut_modelo, aut_color, aut_versio, aut_motor, aut_serie, aut_placa, aut_km, aut_estado) VALUES(" + 
                  $("#txtcodigo").val() + ", " + 
                  marca + ", '" + 
                  modelo + "', '" + 
                  color + "', " + 
                  version + ", '" + 
                  motor + "', '" + 
                  serie + "', '" + 
                  placa + "', " + 
                  km + ", '" + 
                  estado + "')";
            conf = "¿DESEA GUARDAR EL NUEVO AUTO?";
            men = "EL AUTO FUE REGISTRADO CON ÉXITO";
        }
        
        if ($("#operacion").val() === "2") // editar
        {
            sql = "UPDATE autos SET " + 
                  "mar_id = " + marca + ", " +
                  "aut_modelo = '" + modelo + "', " +
                  "aut_color = '" + color + "', " +
                  "aut_versio = " + version + ", " +
                  "aut_motor = '" + motor + "', " +
                  "aut_serie = '" + serie + "', " +
                  "aut_placa = '" + placa + "', " +
                  "aut_km = " + km + ", " +
                  "aut_estado = '" + estado + "' " +
                  "WHERE aut_id = " + $("#txtcodigo").val();
            conf = "¿DESEA MODIFICAR ESTE AUTO?";
            men = "EL AUTO FUE MODIFICADO CON ÉXITO";
        }
        
        if ($("#operacion").val() === "3") // borrar
        {
            conf = "¿DESEA ELIMINAR ESTE AUTO?";
            sql = "DELETE FROM autos WHERE aut_id = " + $("#txtcodigo").val();
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
                    })
                    .fail(function(xhr, status, error) {
                        alertify.alert("Error al procesar la solicitud: " + error);
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
        })
        .fail(function(xhr, status, error) {
            alertify.alert("Error al cargar los datos: " + error);
        });
}

function seleccion(parent) 
{
    // Obtener todas las celdas de la fila seleccionada
    var celdas = parent.find("td");
    
    // Asignar valores a los campos del formulario
    $("#txtcodigo").val($(celdas[0]).text().trim());
    $("#cboMarcas").val($(celdas[1]).text().trim());
    $("#txtmodelo").val($(celdas[2]).text().trim());
    $("#txtcolor").val($(celdas[3]).text().trim());
    $("#txtversion").val($(celdas[4]).text().trim());
    $("#txtmotor").val($(celdas[5]).text().trim());
    $("#txtserie").val($(celdas[6]).text().trim());
    $("#txtplaca").val($(celdas[7]).text().trim());
    $("#txtkm").val($(celdas[8]).text().trim());
    $("#txtestado").val($(celdas[9]).text().trim());
    

}

$(function () 
{
    // Cargar datos al iniciar
    get_datos("");
    
    // Agregar evento para buscar al presionar Enter en el campo de búsqueda
    $("#txtbuscador").keypress(function(e) {
        if(e.which == 13) { // Enter key
            get_datos($(this).val());
            $(this).val('');
        }
    });
});