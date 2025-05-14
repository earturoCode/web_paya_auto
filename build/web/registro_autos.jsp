<%@include file="controles/chequearsesion.jsp" %>
<%
    String vusuario = (String) sesionOk.getAttribute("usuario");
%>

<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="imagenes/auto.png" rel="shortcut icon">
        
        <link rel="stylesheet" type="text/css" href="estetica/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="estetica/alertify.core.css">
        <link rel="stylesheet" type="text/css" href="estetica/alertify.default.css">
        
        <title>Registro de Autos</title>
    </head>
    <body>
        <h1>Registro de Autos</h1>
        <div class="container" style="padding-top: 15px;">
            <div class="row">
                <div class="col-md-12">

                    <form id="formulario" class="form-horizontal" role="form">
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="codigo">Código</label> 
                            </div>
                            <div class="col-md-2">
                                <input type="text" name="txtcodigo" id="txtcodigo" class="form-control" placeholder="Autoincrementable" disabled/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="marca">Marca</label> 
                            </div>
                            <div class="col-md-4">
                                <select name="cboMarca" id="cboMarca" class="form-control" disabled="">
                                    <option value="0">Seleccione una marca</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="modelo">Modelo</label> 
                            </div>
                            <div class="col-md-4">
                                <input type="text" name="txtmodelo" id="txtmodelo" class="form-control" placeholder="Ingrese modelo" disabled=""/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="color">Color</label> 
                            </div>
                            <div class="col-md-4">
                                <input type="text" name="txtcolor" id="txtcolor" class="form-control" placeholder="Ingrese color" disabled=""/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="version">Versión</label> 
                            </div>
                            <div class="col-md-4">
                                <input type="text" name="txtversion" id="txtversion" class="form-control" placeholder="Ingrese versión" disabled=""/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="motor">Motor</label> 
                            </div>
                            <div class="col-md-4">
                                <input type="text" name="txtmotor" id="txtmotor" class="form-control" placeholder="Ingrese motor" disabled=""/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="serie">Nº de Serie</label> 
                            </div>
                            <div class="col-md-4">
                                <input type="text" name="txtserie" id="txtserie" class="form-control" placeholder="Ingrese número de serie" disabled=""/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="placa">Placa</label> 
                            </div>
                            <div class="col-md-4">
                                <input type="text" name="txtplaca" id="txtplaca" class="form-control" placeholder="Ingrese placa" disabled=""/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="km">Kilometraje</label> 
                            </div>
                            <div class="col-md-4">
                                <input type="number" name="txtkm" id="txtkm" class="form-control" placeholder="Ingrese kilometraje" disabled=""/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <label class="control-label" for="estado">Estado</label> 
                            </div>
                            <div class="col-md-4">
                                <input type="text" name="txtestado" id="txtestado" class="form-control" placeholder="Ingrese estado" disabled=""/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            
                            <div class="col-md-2">
                                <input id="btnAgregar" type="button" class="form-control btn-primary" value="Agregar" onclick="agregar();"/>
                            </div>
                            <div class="col-md-2">
                                <input id="btnModificar" type="button" class="form-control btn-warning" value="Modificar" onclick="modificar();"/>
                            </div>
                            <div class="col-md-2">
                                <input id="btnBorrar" type="button" class="form-control btn-danger" value="Borrar" onclick="borrar();"/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-2">
                                <input id="btnCancelar" type="button" class="form-control btn-info" value="Cancelar" disabled="" onclick="cancelar();"/>
                            </div>
                            <div class="col-md-2">
                                <input id="btnGrabar" type="button" class="form-control btn-success" value="Grabar" disabled="" onclick="grabar();"/>
                            </div>
                            <div class="col-md-2">
                                <a href="menuprincipal.jsp"><input id="btnSalir" type="button" class="form-control btn-default" value="Salir"></a>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-4">
                                <input type="text" name="txtbuscador" id="txtbuscador" class="form-control" placeholder="Ingrese datos a buscar"/>
                            </div>
                            <div class="col-md-2">
                                <input id="btnBuscar" type="button" class="form-control btn-primary" value="Buscar" onclick="get_datos($('#txtbuscador').val());$('#txtbuscador').val('');">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-9">
                                <table class="table table-hover" id="grilla">
                                    <thead>
                                        <tr>
                                            <th class="warning">Código</th>
                                            <th class="warning">Marca ID</th>
                                            <th class="warning">Modelo</th>
                                            <th class="warning">Color</th>
                                            <th class="warning">Versión</th>
                                            <th class="warning">Motor</th>
                                            <th class="warning">Serie</th>
                                            <th class="warning">Placa</th>
                                            <th class="warning">KM</th>
                                            <th class="warning">Estado</th>
                                        </tr>
                                    
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <input type="hidden" id="operacion"/>
                    </form>
                </div>
            </div>
        </div>
        <script src="js/jquery-1.12.2.min.js"></script> 
        <script src="js/bootstrap.min.js"></script> 
        <script src="js/alertify.js"></script> 
        
        <script src="sql_regisauto.js"></script>
    </body>
</html>