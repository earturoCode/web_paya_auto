package extraer;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import programas.bdconexion;

@WebServlet(urlPatterns = {"/extraer/get_vendedor"})
public class get_vendedor extends HttpServlet {
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            bdconexion cn = new bdconexion();
            try {
                try {
                    cn.crearConexion();
                } catch (Exception ex) {
                    Logger.getLogger(get_vendedor.class.getName()).log(Level.SEVERE, null, ex);
                }
                
                ResultSet rs = cn.consultar(request.getParameter("sql"));
                while(rs.next()){
                    out.println("<tr onclick=\"seleccion($(this));\">");
                    
                    out.println("<td>");
                    out.println(rs.getString("ven_id"));
                    out.println("</td>");
                    
                    out.println("<td>");
                    out.println(rs.getString("ven_nom"));
                    out.println("</td>");
                    
                    out.println("<td>");
                    out.println(rs.getString("ven_ape"));
                    out.println("</td>");
                    
                    out.println("<td>");
                    out.println(rs.getString("ven_ci"));
                    out.println("</td>");
                    
                    out.println("<td>");
                    out.println(rs.getString("ven_direcc"));
                    out.println("</td>");
                    
                    out.println("</tr>");
                }
            } catch (SQLException ex) {
                Logger.getLogger(get_vendedor.class.getName()).log(Level.SEVERE, null, ex);
                out.println(ex.getMessage());
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Servlet para obtener datos de clientes";
    }// </editor-fold>
}