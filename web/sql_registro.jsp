<%@ page session="true" %>
<%@ page language="java" import="java.sql.*"  %>

<jsp:useBean id="conexion" class="programas.bdconexion" scope="page" />
<jsp:useBean id="dataSource" class="programas.enviosentenciasql" scope="page"/>

<%
    try {
        // Crear objeto de conexi�n al DB
        Connection cn = conexion.crearConexion();
        // Asignar conexi�n al objeto manejador de datos
        dataSource.setConexion(cn);
        
        // Obtener par�metros del formulario
        String nombre = request.getParameter("nombre");
        String login = request.getParameter("login");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");
        String nivel = request.getParameter("nivel");
        
        // Validaciones b�sicas
        if (nombre == null || nombre.trim().isEmpty() ||
            login == null || login.trim().isEmpty() ||
            password == null || password.trim().isEmpty() ||
            confirmPassword == null || confirmPassword.trim().isEmpty() ||
            nivel == null || nivel.trim().isEmpty()) {
            
            response.sendRedirect("gui_signup.jsp?error=Todos los campos son obligatorios");
            return;
        }
        
        // Validar que las contrase�as coincidan
        if (!password.equals(confirmPassword)) {
            response.sendRedirect("gui_signup.jsp?error=Las contrase�as no coinciden");
            return;
        }
        
        // Validar longitud m�nima de contrase�a
        if (password.length() < 6) {
            response.sendRedirect("gui_signup.jsp?error=La contrase�a debe tener al menos 6 caracteres");
            return;
        }
        
        // Validar nivel de usuario
        if (!nivel.equals("1") && !nivel.equals("2")) {
            response.sendRedirect("gui_signup.jsp?error=Tipo de usuario no v�lido");
            return;
        }
        
        // Verificar si el usuario ya existe
        String checkSql = "SELECT COUNT(*) as total FROM usuarios WHERE usu_login = '" + login.trim() + "'";
        ResultSet rs = dataSource.obtenerDato(checkSql);
        
        if (rs.next() && rs.getInt("total") > 0) {
            response.sendRedirect("gui_signup.jsp?error=El nombre de usuario ya existe. Elija otro.");
            return;
        }
        
        // Insertar nuevo usuario (SIN MD5 para coincidir con tu sistema actual)
        String insertSql = "INSERT INTO usuarios (usu_nombre, usu_login, usu_pass, usu_nivel, usu_estado) VALUES ('" + 
                          nombre.trim() + "', '" + 
                          login.trim() + "', '" + 
                          password + "', " + 
                          nivel + ", 'activo')";
        
        // Ejecutar la inserci�n
        dataSource.actualizarDato(insertSql);
        
        // Si llegamos aqu� sin excepci�n, el registro fue exitoso
        response.sendRedirect("gui_signup.jsp?success=Usuario registrado exitosamente. Ahora puede iniciar sesion.");
        
        // Cerrar conexi�n
        if (cn != null) cn.close();
        
    } catch (Exception e) {
        response.sendRedirect("gui_signup.jsp?error=Error interno del servidor: " + e.getMessage());
        e.printStackTrace();
    }
%>