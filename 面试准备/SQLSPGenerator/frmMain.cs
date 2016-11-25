using System;
using System.Data;
using System.IO;
using System.Text;
using System.Windows.Forms;
using NovinMedia.Data;
using SP_Gen.Classes;
using SP_Gen.Properties;

namespace SP_Gen
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();

            LoadSettings();

            tpWrapperClass.Enabled = bool.Parse(Session.LoadFromSession("GenerateWrapperClass").ToString());

            SetFieldsEnabled(false);
            txtServerName.Focus();
        }

        #region "Helper Methods"

        private string GetConnectionString()
        {
            string connStr = string.Empty;

            if (rbSQLServer.Checked == true)
            {
                connStr =
                    string.Format("Server={0:G};Database=master;User ID={1:G};Password={2:G};Trusted_Connection=False;",
                                  txtServerName.Text, txtUsername.Text, txtPassword.Text);
            }
            else
                connStr =
                    string.Format("Data Source={0:G};Initial Catalog=master;Integrated Security=SSPI;",
                                  txtServerName.Text);

            return connStr;
        }

        private string GetConnectionString(string DatabaseName)
        {
            string connStr = string.Empty;

            if (rbSQLServer.Checked == true)
            {
                connStr =
                    string.Format("Server={0:G};Database={1:G};User ID={2:G};Password={3:G};Trusted_Connection=False;",
                                  txtServerName.Text, DatabaseName, txtUsername.Text, txtPassword.Text);
            }
            else
                connStr =
                    string.Format("Data Source={0:G};Initial Catalog={1:G};Integrated Security=SSPI;",
                                  txtServerName.Text, DatabaseName);

            return connStr;
        }


        private string GetServerVersion()
        {
            string connStr = GetConnectionString();
            DbObject dbo = new DbObject(connStr);

            DataSet dsServer = dbo.RunQuery("SELECT SERVERPROPERTY('ProductVersion') as ServerVersion", "Server");

            string version = string.Empty;

            if (dsServer.Tables[0].Rows.Count > 0)
            {
                char[] seperatores = { '.' };
                string[] tmpVersion = dsServer.Tables[0].Rows[0]["ServerVersion"].ToString().Split(seperatores);
                version = tmpVersion[0];
            }
            return version;
        }

        private void LoadSettings()
        {
            ConfigTemplate ct = ConfigUtils.ReadConfig();


            Session.SaveInSession("Prefix", ct.StoredProceduresPrefix);
            Session.SaveInSession("AuthorName", ct.AuthorName);
            Session.SaveInSession("NullParamDefaultValues", ct.PassNullAsDefaultParamaeterValue);
            Session.SaveInSession("GenerateWrapperClass", ct.GenerateWrapperClass);
            Session.SaveInSession("WrapperClass_GenerateStaticMethods", ct.WrapperClass_GenerateStaticMethods);
            Session.SaveInSession("WrapperClass_NameSpace", ct.WrapperClass_NameSpace);

            Session.SaveInSession("AutoSaveWrapperClass", ct.AutoSaveWrapperClass);
            Session.SaveInSession("AutoSaveScript", ct.AutoSaveScript);

            Session.SaveInSession("GenerateDeleteRowProc", ct.GenerateDeleteRowProc);
            Session.SaveInSession("GenerateInsertProc", ct.GenerateInsertProc);
            Session.SaveInSession("GenerateSelectAllProc", ct.GenerateSelectAllProc);
            Session.SaveInSession("GenerateSelectRowProc", ct.GenerateSelectRowProc);
            Session.SaveInSession("GenerateUpdateProc", ct.GenerateUpdateProc);

        }

        private void SetFieldsEnabled(bool Enabled)
        {
            lblUsername.Enabled = Enabled;
            lblPassword.Enabled = Enabled;
            txtUsername.Enabled = Enabled;
            txtPassword.Enabled = Enabled;
        }

        private string CreateDirectory(string DatabaseName, string FolderName)
        {
            string appPath = Path.GetDirectoryName(Application.ExecutablePath);

            string targetDir = appPath + "\\Output\\" + DatabaseName + "\\" + FolderName;

            if (Directory.Exists(targetDir) == false)
            {
                Directory.CreateDirectory(targetDir);
            }
            return targetDir;
        }

        private void SaveToFile(string Filename, string Contents)
        {
            File.WriteAllText(Filename, Contents, Encoding.UTF8);
        }

        private void GenerateSQL(string DatabaseName, string tableName, DataRow[] rows)
        {
            string Prefix = Session.LoadFromSession("Prefix").ToString();

            bool GenerateSelectAll = bool.Parse(Session.LoadFromSession("GenerateSelectAllProc").ToString());
            bool GenerateSelectRow = bool.Parse(Session.LoadFromSession("GenerateSelectRowProc").ToString());
            bool GenerateInsert = bool.Parse(Session.LoadFromSession("GenerateInsertProc").ToString());
            bool GenerateUpdate = bool.Parse(Session.LoadFromSession("GenerateUpdateProc").ToString());
            bool GenerateDelete = bool.Parse(Session.LoadFromSession("GenerateDeleteRowProc").ToString());

            if (GenerateSelectAll)
            {
                txtSQL.Document.Text = SQL_Generator.CreateSelectAllSP(Prefix + tableName + "_SelectAll", tableName, rows);
                txtSQL.Document.Text += "\r\n\r\n";
            }

            if (GenerateSelectRow)
            {
                txtSQL.Document.Text += SQL_Generator.CreateSelectRowSP(Prefix + tableName + "_SelectRow", tableName, rows);
                txtSQL.Document.Text += "\r\n\r\n";
            }

            if (GenerateInsert)
            {
                txtSQL.Document.Text += SQL_Generator.CreateInsertSP(Prefix + tableName + "_Insert", tableName, rows);
                txtSQL.Document.Text += "\r\n\r\n";
            }

            if (GenerateUpdate)
            {
                txtSQL.Document.Text += SQL_Generator.CreateUpdateSP(Prefix + tableName + "_Update", tableName, rows);
                txtSQL.Document.Text += "\r\n\r\n";
            }

            if (GenerateDelete)
            {
                txtSQL.Document.Text += SQL_Generator.CreateDeleteRowSP(Prefix + tableName + "_DeleteRow", tableName, rows);
            }

            bool AutoSaveScript = bool.Parse(Session.LoadFromSession("AutoSaveScript").ToString());
            if (AutoSaveScript == true)
            {
                string databaseName = tvEntities.SelectedNode.Parent.Text;
                string scriptFileName = CreateDirectory(databaseName, "SQL") + "\\" + tableName + ".sql";
                SaveToFile(scriptFileName, txtSQL.Document.Text);
            }
        }

        private void GenerateWrapperClassCSharp(string tableName, DataRow[] rows)
        {
            bool WrapperClass_GenerateStaticMethods =
                bool.Parse(Session.LoadFromSession("WrapperClass_GenerateStaticMethods").ToString());

            bool GenerateSelectAll = bool.Parse(Session.LoadFromSession("GenerateSelectAllProc").ToString());
            bool GenerateSelectRow = bool.Parse(Session.LoadFromSession("GenerateSelectRowProc").ToString());
            bool GenerateInsert = bool.Parse(Session.LoadFromSession("GenerateInsertProc").ToString());
            bool GenerateUpdate = bool.Parse(Session.LoadFromSession("GenerateUpdateProc").ToString());
            bool GenerateDelete = bool.Parse(Session.LoadFromSession("GenerateDeleteRowProc").ToString());

            string methods = string.Empty;

            if (GenerateSelectAll)
            {
                methods =
                    WrapperClass_CSharp_Generator.CreateSelectAllMethod("SelectAll", tableName, rows,
                                                                        WrapperClass_GenerateStaticMethods);
                methods += "\r\n\r\n";
            }
            if (GenerateSelectRow)
            {
                methods +=
                    WrapperClass_CSharp_Generator.CreateSelectRowMethod("SelectRow", tableName, rows,
                                                                        WrapperClass_GenerateStaticMethods);
                methods += "\r\n\r\n";
            }

            if (GenerateInsert)
            {
                methods +=
                    WrapperClass_CSharp_Generator.CreateInsertRowMethod("InsertRow", tableName, rows,
                                                                        WrapperClass_GenerateStaticMethods);
                methods += "\r\n\r\n";
            }

            if (GenerateUpdate)
            {
                methods +=
                    WrapperClass_CSharp_Generator.CreateUpdateRowMethod("UpdateRow", tableName, rows,
                                                                        WrapperClass_GenerateStaticMethods);
                methods += "\r\n\r\n";
            }

            if (GenerateDelete)
            {
                methods +=
                    WrapperClass_CSharp_Generator.CreateDeleteRowMethod("DeleteRow", tableName, rows,
                                                                        WrapperClass_GenerateStaticMethods);
            }

            string WrapperClass_NameSpace = Session.LoadFromSession("WrapperClass_NameSpace").ToString();
            txtWrapperClass.Document.Text = string.Format(Resources.WrapperClass_CSharp_Template,
                                                          WrapperClass_NameSpace,
                                                          tableName,
                                                          methods);

            bool autoSaveWrapperClass = bool.Parse(Session.LoadFromSession("AutoSaveWrapperClass").ToString());
            if (autoSaveWrapperClass == true)
            {
                string databaseName = tvEntities.SelectedNode.Parent.Text;
                string codeFileName = CreateDirectory(databaseName, "WrapperClass") + "\\" + tableName + ".cs";
                SaveToFile(codeFileName, txtWrapperClass.Document.Text);
            }
        }


        #endregion

        #region "Form Related Methods"

        private void btnConnect_Click(object sender, EventArgs e)
        {
            string connStr = GetConnectionString();
            DbObject dbo = new DbObject(connStr);

            string databasesQuery = string.Empty;
            string serverVersion = GetServerVersion();
            if (int.Parse(serverVersion) <= 8)
            {
                databasesQuery = Resources.strDatabasesList2000;
            }
            else
            {
                databasesQuery = Resources.strDatabasesList2005;
            }

            //try
            {
                DataSet dsDatabases = dbo.RunQuery(databasesQuery, "Databases");

                tvEntities.Nodes.Clear();

                //TreeGenerator.GenerateTreeView(tvEntities, dsDatabases);

                foreach (DataRow parentRow in dsDatabases.Tables[0].Rows)
                {
                    tvEntities.Nodes.Add(parentRow["Text"].ToString());
                }
                if (tvEntities.Nodes.Count > 0)
                {
                    foreach (TreeNode dbNode in tvEntities.Nodes)
                    {
                        DataSet dsTables = dbo.RunQuery(string.Format(Resources.strTablesList, dbNode.Text), "Tables");
                        foreach (DataRow tableRow in dsTables.Tables[0].Rows)
                        {
                            TreeNode node = new TreeNode(tableRow["Table_Name"].ToString(), 1, 1);
                            dbNode.Nodes.Add(node);
                        }
                    }
                }
            }
            //catch (Exception ex)
            //{
            //    MessageBox.Show(ex.Message);
            //}
        }

        private void btnCopySQL_Click(object sender, EventArgs e)
        {
            if (txtSQL.Document.Text != string.Empty)
            {
                Clipboard.Clear();
                Clipboard.SetText(txtSQL.Document.Text);
            }
        }

        private void rbSQLServer_CheckedChanged(object sender, EventArgs e)
        {
            SetFieldsEnabled(rbSQLServer.Checked);
        }

        private void rbWindows_CheckedChanged(object sender, EventArgs e)
        {
            SetFieldsEnabled(!rbWindows.Checked);
        }

        private void tbtnGenerate_Click(object sender, EventArgs e)
        {
            if (tvEntities.SelectedNode != null && tvEntities.SelectedNode.Level == 1)
            {
                if (tvEntities.SelectedNode != null)
                {
                    string connStr = GetConnectionString();
                    DbObject dbo = new DbObject(connStr);

                    string dbName = tvEntities.SelectedNode.Parent.Text;
                    string tableName = tvEntities.SelectedNode.Text;

                    string x = string.Format(Resources.strTablesAndColumns, dbName);
                    DataSet dsTablesAndColumns = dbo.RunQuery(x, "TablesAndColumns");
                    DataRow[] rows = dsTablesAndColumns.Tables[0].Select("Table_Name = '" + tableName + "'");

                    GenerateSQL(dbName, tableName, rows);
                    bool GenerateWrapperClass = bool.Parse(Session.LoadFromSession("GenerateWrapperClass").ToString());
                    if (GenerateWrapperClass == true)
                        GenerateWrapperClassCSharp(tableName, rows);
                }
            }
        }

        private void tvEntities_AfterSelect(object sender, TreeViewEventArgs e)
        {
            tbtnGenerate.Enabled = tvEntities.SelectedNode.Level == 1;
        }

        private void mnuOptions_Click(object sender, EventArgs e)
        {
            frmOptions _frmOptions = new frmOptions();
            _frmOptions.ShowDialog();
            LoadSettings();
            bool GenerateWrapperClass = bool.Parse(Session.LoadFromSession("GenerateWrapperClass").ToString());
            tpWrapperClass.Enabled = GenerateWrapperClass;
        }

        private void mnuExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void tsWrapperClass_Click(object sender, EventArgs e)
        {
            if (txtWrapperClass.Document.Text != string.Empty)
            {
                Clipboard.Clear();
                Clipboard.SetText(txtWrapperClass.Document.Text);
            }
        }

        #endregion

        private void btnRunSQL_Click(object sender, EventArgs e)
        {
            try
            {
                if (txtSQL.Document.Text != string.Empty)
                {
                    string[] seperators = new string[] { "GO" };
                    string[] commands = txtSQL.Document.Text.Split(seperators, StringSplitOptions.None);
                    string dbName = tvEntities.SelectedNode.Parent.Text;
                    string connStr = GetConnectionString(dbName);
                    DbObject dbo = new DbObject(connStr);

                    foreach (string command in commands)
                    {
                        dbo.RunQuery(command, "tmp");
                    }
                }
            }
            catch (Exception exp)
            {
                MessageBox.Show(exp.Message);
            }
        }
    }
}