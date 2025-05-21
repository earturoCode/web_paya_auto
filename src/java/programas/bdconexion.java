package programas;

import com.mysql.jdbc.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.swing.JOptionPane;

public class bdconexion
{

    public Statement sentencia;
    public Connection conexion = null;
    
     //public Connection cn;
     public java.sql.Statement st;
     public ResultSet rs;
     
    public bdconexion() 
    {
    }
    
    public Connection crearConexion()  throws Exception 
    {

    String driver = "com.mysql.jdbc.Driver";
    String url = "jdbc:mysql://localhost/playa_auto";
    String user = "root";
    String password = "";
    
        
        Class.forName(driver).newInstance();
           
        Connection connection = DriverManager.getConnection(url, user, password);
        conexion = DriverManager.getConnection(url, user, password);
        
        //cn = DriverManager.getConnection(url, user, password);
        
        return connection;
    }
    
    public void cerrarConexion(Connection connection)  throws Exception 
    {
        connection.close();
    }
    
    public void actualizar(String sql) throws SQLException
    {
        st = conexion.createStatement();
        st.executeUpdate(sql);
    }
    
     public ResultSet consultar(String sql) throws SQLException{
        st = conexion.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
        rs = st.executeQuery(sql);
        return rs;
    }
     
     public void listar_datos(String sql) 
    {

        try {
            st = conexion.createStatement();
            rs = st.executeQuery(sql);
        } catch (Exception e) 
        {
            JOptionPane.showMessageDialog(null, "error al listar datos" + e);
        }
    } 

    public void cerrarConexion() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
