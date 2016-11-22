using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections;
using System.Windows.Forms;

/// <summary>
/// Summary description for TreeGenerator
/// </summary>
public class TreeGenerator
{
    //private SqlConnection dbCon;

    public TreeGenerator(string StoredProcedureName)
    {
        //
        // TODO: Add constructor logic here
        //
        //storedProcedureName = StoredProcedureName;

        //dbCon = new SqlConnection(ConfigurationManager.ConnectionStrings["DB_Connection"].ToString());
        //dbCon.Open();
    }


    public static void GenerateTreeView(TreeView Tree, DataSet ds)
    {
        /*
        OleDbConnection dbCon = new OleDbConnection("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + Server.MapPath("~/TreeView/Data/Tree.mdb"));
        dbCon.Open();

        OleDbDataAdapter adapter = new OleDbDataAdapter("SELECT * FROM Links", dbCon);
        DataSet ds = new DataSet();
        adapter.Fill(ds);
         */

        ds.Relations.Add("NodeRelation", ds.Tables[0].Columns["ID"], ds.Tables[0].Columns["ParentID"]);

        foreach (DataRow dbRow in ds.Tables[0].Rows)
        {
            if (dbRow.IsNull("ParentID"))
            {
                TreeNode node = CreateNode(dbRow["Text"].ToString(), true, dbRow["ID"].ToString());
                Tree.Nodes.Add(node);
                RecursivelyPopulate(dbRow, node);
            }
        }
    }

    private static void RecursivelyPopulate(DataRow dbRow, TreeNode node)
    {
        foreach (DataRow childRow in dbRow.GetChildRows("NodeRelation"))
        {
            TreeNode childNode = CreateNode(childRow["Text"].ToString(), true, childRow["ID"].ToString());
            node.Nodes.Add(childNode);
            RecursivelyPopulate(childRow, childNode);
        }
    }

    private static TreeNode CreateNode(string text, bool expanded, string id)
    {
        TreeNode node = new TreeNode(text);
        node.ImageIndex = 0;
        return node;
    }

}

   