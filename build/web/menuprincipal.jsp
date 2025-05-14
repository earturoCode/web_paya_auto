<%@ page session="true" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ include file="controles/chequearsesion.jsp" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="programas.bdconexion" %>

<%
    String usuariodelacceso = (String) sesionOk.getAttribute("usuario");
    String nivel = (String) sesionOk.getAttribute("nivel");
%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>MENU PLAYA DE AUTOS</title>
    <link rel="shortcut icon" href="graficos/checklist.png">
    
    <!-- CSS -->
    <link rel="stylesheet" href="estetica/bootstrap.min.css">
    <link rel="stylesheet" href="estetica/menuresponsive.css">
      <style>
    body {
      background: linear-gradient(to right, #cde9d4, #a0d1b4);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      height: 100vh;
      display: flex;
    }
  </style>
</head>
<body>
    <div class="container">
        <header>
            <nav class="navbar" style="background-color: #0d7a34">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="menuprincipal.jsp">
                            <img src="graficos/formenu.png" width="50" alt="Logo" />
                        </a>
                    </div>
                    <div class="collapse navbar-collapse" id="menu">
                        <!-- REFERENCIALES -->
                        <ul class="navbar-nav">
                            <li class="dropdown">
                                <a class="dropdown-toggle" href="#">
                                    <!-- <span class="glyphicon glyphicon-credit-card"></span> --> REFERENCIALES <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <% if ("1".equals(nivel)) { %>
                                    <li><a href="registro_cliente.jsp"><img src="graficos/Cliente.png" width="20" height="20" /> CLIENTES</a></li>
                                    <% } %>
                                    <li><a href="registro_vendedor.jsp"><img src="graficos/Vendedor.png" width="20" height="20" /> VENDEDORES</a></li>
                                    <li><a href="registro_autos.jsp"><img src="graficos/Auto.png" width="20" height="20" /> AUTOS</a></li>
                                </ul>
                            </li>
                        </ul>

                        <!-- GESTION DE VENTAS -->
                        <ul class="navbar-nav">
                            <li class="dropdown">
                                <a class="dropdown-toggle" href="#">
                                   <!-- <span class="glyphicon glyphicon-credit-card"></span> --> GESTION DE VENTAS <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <% if ("1".equals(nivel)) { %>
                                    <li><a href="gui_contrato.jsp"><img src="graficos/contract.png" width="20" height="20" />CONTRATOS</a></li>
                                    <% } %>
                                </ul>
                            </li>
                        </ul>

                        <!-- LISTADOS -->
                        <ul class="navbar-nav">
                            <li class="dropdown">
                                <a class="dropdown-toggle" href="#">
                                   <!--  <span class="glyphicon glyphicon-credit-card"></span> --> LISTADOS <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <% if ("1".equals(nivel)) { %>
                                    <li><a href="listacliente.jsp"><img src="graficos/listar_cliente.png" width="20" height="20" /> LISTAR CLIENTES</a></li>
                                    <% } %>
                                    <li><a href="listavendedores.jsp"><img src="graficos/listar_vendedor.png" width="20" height="20" /> LISTAR VENDEDORES</a></li>
                                    <li><a href="listaautos.jsp"><img src="graficos/listar_autos.png" width="20" height="20" /> LISTAR AUTOS</a></li>
                                    <li><a href="listacontratos.jsp"><img src="graficos/listar_contrato.png" width="20" height="20" /> LISTAR CONTRATOS</a></li>
                                </ul>
                            </li>
                        </ul>

                        <!-- AYUDA -->
                        <ul class="navbar-nav">
                            <li class="dropdown">
                                <a class="dropdown-toggle" href="#">
                                  <!--  <span class="glyphicon glyphicon-credit-card"></span> --> AYUDA <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="interactiva.chm" title="INTERACTIVA"><img src="graficos/Interactiva.png" width="20" height="20" /> Interactiva</a></li>
                                    <li><a href="manual.pdf" title="MANUAL"><img src="graficos/Manual.png" width="20" height="20" /> Manual</a></li>
                                </ul>
                            </li>
                        </ul>

                        <!-- USUARIO Y SALIR -->
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                <a class="dropdown-toggle" href="#">
                                     <%= usuariodelacceso %> <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="gui_acceso.jsp"><img src="graficos/Salir.png" width="20" height="20" /> SALIR</a></li>
                                    <% if ("1".equals(nivel)) { %>
                                    <li><a href="xxx.jsp"><img src="graficos/Crear_usuario.png" width="20" height="20" /> CREAR NUEVO USUARIO</a></li>
                                    <% } %>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </header>
    </div>

    <!-- JS -->
    <script src="js/jquery-1.12.2.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/menuresponsive.js"></script>
</body>
</html>
