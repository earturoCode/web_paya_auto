
package programas;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JComboBox;
import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

public class Metodo 
{
     
    public static void cargarTabla(JTable tabla, Object[] datos){
        DefaultTableModel modelo = (DefaultTableModel) tabla.getModel();
        modelo.addRow(datos);
    }
    
    public static void limpiarTabla(JTable tabla){
        DefaultTableModel modelo = (DefaultTableModel) tabla.getModel();
        modelo.setRowCount(0);
    }
    
    public static void eliminarFila(JTable tabla, int fila){
        DefaultTableModel modelo = (DefaultTableModel) tabla.getModel();
        modelo.removeRow(fila);
    }
    
    public static String gencod(String campo, String tabla)
    {
        String cod = "";
        
        bdconexion cn = new bdconexion();
        try {
            try {
                cn.crearConexion();
            } catch (Exception ex) {
                Logger.getLogger(Metodo.class.getName()).log(Level.SEVERE, null, ex);
            }
        
            ResultSet codigo = cn.consultar("select IFNULL(max("+campo+"),0)+1 as codigo from "+tabla);
            codigo.next();
            cod = codigo.getString("codigo");
        } catch (SQLException ex) {
            Logger.getLogger(Metodo.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return cod;
    }
    
    public static boolean evitarDuplicado(String tabla, String campoBD, String dato, String pk, String codigo){
        
        bdconexion cn = new bdconexion();
        try {
            try {
                cn.crearConexion();
            } catch (Exception ex) {
                Logger.getLogger(Metodo.class.getName()).log(Level.SEVERE, null, ex);
            }
            ResultSet duplicado = cn.consultar("select * from "+tabla+" where upper("+campoBD+") = '"+dato.toUpperCase()+"' and "+pk+" != "+codigo);
            return duplicado.isBeforeFirst();
        } catch (SQLException ex) {
            Logger.getLogger(Metodo.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return false;
    }
 
    public static void cargarCombo(JComboBox combo, String campos, String tabla)
    {
        bdconexion cn = new bdconexion();
        
        try {
            try {
                cn.crearConexion();
            } catch (Exception ex) {
                Logger.getLogger(Metodo.class.getName()).log(Level.SEVERE, null, ex);
            }
            System.out.println("select "+campos+" as datos from "+tabla);
            ResultSet datos = cn.consultar("select "+campos+" as datos from "+tabla);
            combo.removeAllItems();
            if(datos.isBeforeFirst()){
                while(datos.next()){
                    combo.addItem(datos.getString("datos"));
                }
            }else{
                JOptionPane.showMessageDialog(null, "NO HAY REGISTROS EN "+tabla.toUpperCase());
            }
        } catch (SQLException ex) {
            Logger.getLogger(Metodo.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static String formatoFecha(Date fecha){
        String salida=null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        salida = sdf.format(fecha);
        return salida;
    }
}
