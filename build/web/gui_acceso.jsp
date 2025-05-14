<%@page contentType="text/html; charset=iso-8859-1"
session="true" language="java" import="java.util.*" %>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Acceso al Sistema Web</title>
  <link rel="shortcut icon" href="graficos/llaves.png">
  <!-- Bootstrap 5 CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(to right, #cde9d4, #a0d1b4);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      border-radius: 20px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
    .avatar {
      width: 120px;
      border-radius: 50%;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card p-4">
          <div class="text-center">
            <img src="graficos/auto-splassh-unscreen.gif" alt="Logo" class="avatar mb-3">
            <h3 class="mb-4">Playa De Autos 2.0</h3>
          </div>

          <form action="sql_acceso.jsp" method="post">
            <div class="mb-3 text-danger text-center">
              <%=request.getParameter("error") != null ? request.getParameter("error") : ""%>
            </div>

            <div class="mb-3">
              <label for="usuario" class="form-label"><b>Usuario</b></label>
              <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Ingrese Usuario" required>
            </div>

            <div class="mb-3">
              <label for="clave" class="form-label"><b>Contraseña</b></label>
              <input type="password" class="form-control" id="clave" name="clave" placeholder="Ingrese Contraseña" required>
            </div>

            <div class="d-grid">
              <button type="submit" class="btn btn-success rounded-pill">Ingresar</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS (opcional) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

