using System;
using System.Windows.Forms;
using SP_Gen.Classes;

namespace SP_Gen
{
    public partial class frmOptions : Form
    {
        public frmOptions()
        {
            InitializeComponent();


            ConfigTemplate ct = ConfigUtils.ReadConfig();

            txtAuthorName.Text = ct.AuthorName;
            txtPrefix.Text = ct.StoredProceduresPrefix;
            chkNullParamDefaultValues.Checked = ct.PassNullAsDefaultParamaeterValue;

            chkGenerateWrapperClass.Checked = ct.GenerateWrapperClass;
            txtNamespace.Text = ct.WrapperClass_NameSpace;
            chkStaticMethods.Checked = ct.WrapperClass_GenerateStaticMethods;

            chkAutosaveSqlScript.Checked = ct.AutoSaveScript;
            chkAutosaveWrapperClass.Checked = ct.AutoSaveWrapperClass;

            cbDelete.Checked = ct.GenerateDeleteRowProc;
            cbInsert.Checked = ct.GenerateInsertProc;
            cbSelectAll.Checked = ct.GenerateSelectAllProc;
            cbSelectRow.Checked = ct.GenerateSelectRowProc;
            cbUpdate.Checked = ct.GenerateUpdateProc;
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            ConfigTemplate ct = ConfigUtils.ReadConfig();

            ct.AuthorName = txtAuthorName.Text;
            ct.StoredProceduresPrefix = txtPrefix.Text;
            ct.PassNullAsDefaultParamaeterValue = chkNullParamDefaultValues.Checked;
            ct.GenerateWrapperClass = chkGenerateWrapperClass.Checked;
            ct.WrapperClass_NameSpace = txtNamespace.Text;
            ct.WrapperClass_GenerateStaticMethods = chkStaticMethods.Checked;
            ct.AutoSaveScript = chkAutosaveSqlScript.Checked;
            ct.AutoSaveWrapperClass = chkAutosaveWrapperClass.Checked;

            ct.GenerateDeleteRowProc = cbDelete.Checked;
            ct.GenerateInsertProc = cbInsert.Checked;
            ct.GenerateSelectAllProc = cbSelectAll.Checked;
            ct.GenerateSelectRowProc = cbSelectRow.Checked;
            ct.GenerateUpdateProc = cbUpdate.Checked;


            ConfigUtils.WriteConfig(ct);

            Close();
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}