namespace SP_Gen
{
    partial class frmMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmMain));
            Draco.Controls.CodeEditor.Windows.Forms.LineMarginRender lineMarginRender1 = new Draco.Controls.CodeEditor.Windows.Forms.LineMarginRender();
            Draco.Controls.CodeEditor.Windows.Forms.LineMarginRender lineMarginRender2 = new Draco.Controls.CodeEditor.Windows.Forms.LineMarginRender();
            Draco.Controls.CodeEditor.Windows.Forms.LineMarginRender lineMarginRender3 = new Draco.Controls.CodeEditor.Windows.Forms.LineMarginRender();
            this.gbConnection = new System.Windows.Forms.GroupBox();
            this.txtServerName = new System.Windows.Forms.TextBox();
            this.btnConnect = new System.Windows.Forms.Button();
            this.ilAll = new System.Windows.Forms.ImageList(this.components);
            this.txtPassword = new System.Windows.Forms.TextBox();
            this.lblPassword = new System.Windows.Forms.Label();
            this.txtUsername = new System.Windows.Forms.TextBox();
            this.lblUsername = new System.Windows.Forms.Label();
            this.rbSQLServer = new System.Windows.Forms.RadioButton();
            this.rbWindows = new System.Windows.Forms.RadioButton();
            this.lblAuthenticationMode = new System.Windows.Forms.Label();
            this.lblServerName = new System.Windows.Forms.Label();
            this.ilTree = new System.Windows.Forms.ImageList(this.components);
            this.msMain = new System.Windows.Forms.MenuStrip();
            this.mnuFile = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuOptions = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem1 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuExit = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuHelp = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuAbout = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStrip1 = new System.Windows.Forms.ToolStrip();
            this.toolStripButton1 = new System.Windows.Forms.ToolStripButton();
            this.scMain = new System.Windows.Forms.SplitContainer();
            this.tsEntitiesList = new System.Windows.Forms.ToolStrip();
            this.tbtnGenerate = new System.Windows.Forms.ToolStripButton();
            this.tvEntities = new System.Windows.Forms.TreeView();
            this.tcCodeArea = new System.Windows.Forms.TabControl();
            this.tpSQL = new System.Windows.Forms.TabPage();
            this.tsCode = new System.Windows.Forms.ToolStrip();
            this.btnCopySQL = new System.Windows.Forms.ToolStripButton();
            this.btnRunSQL = new System.Windows.Forms.ToolStripButton();
            this.tpWrapperClass = new System.Windows.Forms.TabPage();
            this.tsWrapperClass = new System.Windows.Forms.ToolStrip();
            this.tsbCopyCodeToClipBoard = new System.Windows.Forms.ToolStripButton();
            this.txtSQL = new Draco.Controls.CodeEditor.Windows.Forms.CodeEditorControl();
            this.SQL_SyntaxDocument = new Draco.Controls.CodeEditor.Syntax.SyntaxDocument(this.components);
            this.txtWrapperClass = new Draco.Controls.CodeEditor.Windows.Forms.CodeEditorControl();
            this.WrapperClass_SyntaxDocument = new Draco.Controls.CodeEditor.Syntax.SyntaxDocument(this.components);
            this.codeEditorControl1 = new Draco.Controls.CodeEditor.Windows.Forms.CodeEditorControl();
            this.gbConnection.SuspendLayout();
            this.msMain.SuspendLayout();
            this.toolStrip1.SuspendLayout();
            this.scMain.Panel1.SuspendLayout();
            this.scMain.Panel2.SuspendLayout();
            this.scMain.SuspendLayout();
            this.tsEntitiesList.SuspendLayout();
            this.tcCodeArea.SuspendLayout();
            this.tpSQL.SuspendLayout();
            this.tsCode.SuspendLayout();
            this.tpWrapperClass.SuspendLayout();
            this.tsWrapperClass.SuspendLayout();
            this.SuspendLayout();
            // 
            // gbConnection
            // 
            this.gbConnection.Controls.Add(this.txtServerName);
            this.gbConnection.Controls.Add(this.btnConnect);
            this.gbConnection.Controls.Add(this.txtPassword);
            this.gbConnection.Controls.Add(this.lblPassword);
            this.gbConnection.Controls.Add(this.txtUsername);
            this.gbConnection.Controls.Add(this.lblUsername);
            this.gbConnection.Controls.Add(this.rbSQLServer);
            this.gbConnection.Controls.Add(this.rbWindows);
            this.gbConnection.Controls.Add(this.lblAuthenticationMode);
            this.gbConnection.Controls.Add(this.lblServerName);
            this.gbConnection.Location = new System.Drawing.Point(12, 33);
            this.gbConnection.Name = "gbConnection";
            this.gbConnection.Size = new System.Drawing.Size(545, 113);
            this.gbConnection.TabIndex = 0;
            this.gbConnection.TabStop = false;
            this.gbConnection.Text = "Database Connection";
            // 
            // txtServerName
            // 
            this.txtServerName.Location = new System.Drawing.Point(125, 24);
            this.txtServerName.Name = "txtServerName";
            this.txtServerName.Size = new System.Drawing.Size(247, 21);
            this.txtServerName.TabIndex = 10;
            // 
            // btnConnect
            // 
            this.btnConnect.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.btnConnect.ImageIndex = 0;
            this.btnConnect.ImageList = this.ilAll;
            this.btnConnect.Location = new System.Drawing.Point(379, 22);
            this.btnConnect.Name = "btnConnect";
            this.btnConnect.Size = new System.Drawing.Size(156, 23);
            this.btnConnect.TabIndex = 9;
            this.btnConnect.Text = "Connect";
            this.btnConnect.UseVisualStyleBackColor = true;
            this.btnConnect.Click += new System.EventHandler(this.btnConnect_Click);
            // 
            // ilAll
            // 
            this.ilAll.ImageStream = ((System.Windows.Forms.ImageListStreamer)(resources.GetObject("ilAll.ImageStream")));
            this.ilAll.TransparentColor = System.Drawing.Color.Transparent;
            this.ilAll.Images.SetKeyName(0, "connect16.gif");
            this.ilAll.Images.SetKeyName(1, "table16.gif");
            // 
            // txtPassword
            // 
            this.txtPassword.Location = new System.Drawing.Point(435, 75);
            this.txtPassword.Name = "txtPassword";
            this.txtPassword.Size = new System.Drawing.Size(100, 21);
            this.txtPassword.TabIndex = 8;
            // 
            // lblPassword
            // 
            this.lblPassword.AutoSize = true;
            this.lblPassword.Location = new System.Drawing.Point(376, 78);
            this.lblPassword.Name = "lblPassword";
            this.lblPassword.Size = new System.Drawing.Size(57, 13);
            this.lblPassword.TabIndex = 7;
            this.lblPassword.Text = "Password:";
            // 
            // txtUsername
            // 
            this.txtUsername.Location = new System.Drawing.Point(272, 75);
            this.txtUsername.Name = "txtUsername";
            this.txtUsername.Size = new System.Drawing.Size(100, 21);
            this.txtUsername.TabIndex = 6;
            // 
            // lblUsername
            // 
            this.lblUsername.AutoSize = true;
            this.lblUsername.Location = new System.Drawing.Point(212, 78);
            this.lblUsername.Name = "lblUsername";
            this.lblUsername.Size = new System.Drawing.Size(59, 13);
            this.lblUsername.TabIndex = 5;
            this.lblUsername.Text = "Username:";
            // 
            // rbSQLServer
            // 
            this.rbSQLServer.AutoSize = true;
            this.rbSQLServer.Location = new System.Drawing.Point(125, 76);
            this.rbSQLServer.Name = "rbSQLServer";
            this.rbSQLServer.Size = new System.Drawing.Size(79, 17);
            this.rbSQLServer.TabIndex = 4;
            this.rbSQLServer.TabStop = true;
            this.rbSQLServer.Text = "SQL Server";
            this.rbSQLServer.UseVisualStyleBackColor = true;
            this.rbSQLServer.CheckedChanged += new System.EventHandler(this.rbSQLServer_CheckedChanged);
            // 
            // rbWindows
            // 
            this.rbWindows.AutoSize = true;
            this.rbWindows.Checked = true;
            this.rbWindows.Location = new System.Drawing.Point(125, 53);
            this.rbWindows.Name = "rbWindows";
            this.rbWindows.Size = new System.Drawing.Size(68, 17);
            this.rbWindows.TabIndex = 3;
            this.rbWindows.TabStop = true;
            this.rbWindows.Text = "Windows";
            this.rbWindows.UseVisualStyleBackColor = true;
            this.rbWindows.CheckedChanged += new System.EventHandler(this.rbWindows_CheckedChanged);
            // 
            // lblAuthenticationMode
            // 
            this.lblAuthenticationMode.AutoSize = true;
            this.lblAuthenticationMode.Location = new System.Drawing.Point(6, 55);
            this.lblAuthenticationMode.Name = "lblAuthenticationMode";
            this.lblAuthenticationMode.Size = new System.Drawing.Size(110, 13);
            this.lblAuthenticationMode.TabIndex = 2;
            this.lblAuthenticationMode.Text = "Authentication Mode:";
            // 
            // lblServerName
            // 
            this.lblServerName.AutoSize = true;
            this.lblServerName.Location = new System.Drawing.Point(42, 25);
            this.lblServerName.Name = "lblServerName";
            this.lblServerName.Size = new System.Drawing.Size(73, 13);
            this.lblServerName.TabIndex = 0;
            this.lblServerName.Text = "Server Name:";
            // 
            // ilTree
            // 
            this.ilTree.ImageStream = ((System.Windows.Forms.ImageListStreamer)(resources.GetObject("ilTree.ImageStream")));
            this.ilTree.TransparentColor = System.Drawing.Color.Transparent;
            this.ilTree.Images.SetKeyName(0, "db16.gif");
            this.ilTree.Images.SetKeyName(1, "table16.gif");
            // 
            // msMain
            // 
            this.msMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuFile,
            this.mnuHelp});
            this.msMain.Location = new System.Drawing.Point(0, 0);
            this.msMain.Name = "msMain";
            this.msMain.RenderMode = System.Windows.Forms.ToolStripRenderMode.System;
            this.msMain.Size = new System.Drawing.Size(815, 24);
            this.msMain.TabIndex = 3;
            this.msMain.Text = "menuStrip1";
            // 
            // mnuFile
            // 
            this.mnuFile.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuOptions,
            this.toolStripMenuItem1,
            this.mnuExit});
            this.mnuFile.Name = "mnuFile";
            this.mnuFile.Size = new System.Drawing.Size(35, 20);
            this.mnuFile.Text = "File";
            // 
            // mnuOptions
            // 
            this.mnuOptions.Name = "mnuOptions";
            this.mnuOptions.Size = new System.Drawing.Size(111, 22);
            this.mnuOptions.Text = "Options";
            this.mnuOptions.Click += new System.EventHandler(this.mnuOptions_Click);
            // 
            // toolStripMenuItem1
            // 
            this.toolStripMenuItem1.Name = "toolStripMenuItem1";
            this.toolStripMenuItem1.Size = new System.Drawing.Size(108, 6);
            // 
            // mnuExit
            // 
            this.mnuExit.Name = "mnuExit";
            this.mnuExit.Size = new System.Drawing.Size(111, 22);
            this.mnuExit.Text = "Exit";
            this.mnuExit.Click += new System.EventHandler(this.mnuExit_Click);
            // 
            // mnuHelp
            // 
            this.mnuHelp.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuAbout});
            this.mnuHelp.Name = "mnuHelp";
            this.mnuHelp.Size = new System.Drawing.Size(40, 20);
            this.mnuHelp.Text = "Help";
            // 
            // mnuAbout
            // 
            this.mnuAbout.Name = "mnuAbout";
            this.mnuAbout.Size = new System.Drawing.Size(115, 22);
            this.mnuAbout.Text = "About...";
            // 
            // toolStrip1
            // 
            this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripButton1});
            this.toolStrip1.Location = new System.Drawing.Point(3, 3);
            this.toolStrip1.Name = "toolStrip1";
            this.toolStrip1.RenderMode = System.Windows.Forms.ToolStripRenderMode.System;
            this.toolStrip1.Size = new System.Drawing.Size(511, 25);
            this.toolStrip1.TabIndex = 6;
            this.toolStrip1.Text = "toolStrip1";
            // 
            // toolStripButton1
            // 
            this.toolStripButton1.Image = ((System.Drawing.Image)(resources.GetObject("toolStripButton1.Image")));
            this.toolStripButton1.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton1.Name = "toolStripButton1";
            this.toolStripButton1.Size = new System.Drawing.Size(164, 22);
            this.toolStripButton1.Text = "Copy SQL ScriptTo Clipboard";
            // 
            // scMain
            // 
            this.scMain.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
                        | System.Windows.Forms.AnchorStyles.Left)
                        | System.Windows.Forms.AnchorStyles.Right)));
            this.scMain.Location = new System.Drawing.Point(12, 152);
            this.scMain.Name = "scMain";
            // 
            // scMain.Panel1
            // 
            this.scMain.Panel1.Controls.Add(this.tsEntitiesList);
            this.scMain.Panel1.Controls.Add(this.tvEntities);
            // 
            // scMain.Panel2
            // 
            this.scMain.Panel2.Controls.Add(this.tcCodeArea);
            this.scMain.Size = new System.Drawing.Size(791, 352);
            this.scMain.SplitterDistance = 262;
            this.scMain.TabIndex = 1;
            // 
            // tsEntitiesList
            // 
            this.tsEntitiesList.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tbtnGenerate});
            this.tsEntitiesList.Location = new System.Drawing.Point(0, 0);
            this.tsEntitiesList.Name = "tsEntitiesList";
            this.tsEntitiesList.RenderMode = System.Windows.Forms.ToolStripRenderMode.System;
            this.tsEntitiesList.Size = new System.Drawing.Size(262, 25);
            this.tsEntitiesList.TabIndex = 3;
            this.tsEntitiesList.Text = "tsEntitiesList";
            // 
            // tbtnGenerate
            // 
            this.tbtnGenerate.Enabled = false;
            this.tbtnGenerate.Image = ((System.Drawing.Image)(resources.GetObject("tbtnGenerate.Image")));
            this.tbtnGenerate.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tbtnGenerate.Name = "tbtnGenerate";
            this.tbtnGenerate.Size = new System.Drawing.Size(164, 22);
            this.tbtnGenerate.Text = "Generate Stored Procedures";
            this.tbtnGenerate.Click += new System.EventHandler(this.tbtnGenerate_Click);
            // 
            // tvEntities
            // 
            this.tvEntities.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
                        | System.Windows.Forms.AnchorStyles.Left)
                        | System.Windows.Forms.AnchorStyles.Right)));
            this.tvEntities.ImageIndex = 0;
            this.tvEntities.ImageList = this.ilTree;
            this.tvEntities.Location = new System.Drawing.Point(0, 25);
            this.tvEntities.Name = "tvEntities";
            this.tvEntities.SelectedImageIndex = 0;
            this.tvEntities.Size = new System.Drawing.Size(262, 323);
            this.tvEntities.TabIndex = 2;
            this.tvEntities.AfterSelect += new System.Windows.Forms.TreeViewEventHandler(this.tvEntities_AfterSelect);
            // 
            // tcCodeArea
            // 
            this.tcCodeArea.Controls.Add(this.tpSQL);
            this.tcCodeArea.Controls.Add(this.tpWrapperClass);
            this.tcCodeArea.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tcCodeArea.Location = new System.Drawing.Point(0, 0);
            this.tcCodeArea.Name = "tcCodeArea";
            this.tcCodeArea.SelectedIndex = 0;
            this.tcCodeArea.Size = new System.Drawing.Size(525, 352);
            this.tcCodeArea.TabIndex = 0;
            // 
            // tpSQL
            // 
            this.tpSQL.Controls.Add(this.txtSQL);
            this.tpSQL.Controls.Add(this.tsCode);
            this.tpSQL.Location = new System.Drawing.Point(4, 22);
            this.tpSQL.Name = "tpSQL";
            this.tpSQL.Padding = new System.Windows.Forms.Padding(3);
            this.tpSQL.Size = new System.Drawing.Size(517, 326);
            this.tpSQL.TabIndex = 0;
            this.tpSQL.Text = "SQL Script";
            this.tpSQL.UseVisualStyleBackColor = true;
            // 
            // tsCode
            // 
            this.tsCode.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.btnCopySQL,
            this.btnRunSQL});
            this.tsCode.Location = new System.Drawing.Point(3, 3);
            this.tsCode.Name = "tsCode";
            this.tsCode.RenderMode = System.Windows.Forms.ToolStripRenderMode.System;
            this.tsCode.Size = new System.Drawing.Size(511, 25);
            this.tsCode.TabIndex = 6;
            this.tsCode.Text = "toolStrip1";
            // 
            // btnCopySQL
            // 
            this.btnCopySQL.Image = ((System.Drawing.Image)(resources.GetObject("btnCopySQL.Image")));
            this.btnCopySQL.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnCopySQL.Name = "btnCopySQL";
            this.btnCopySQL.Size = new System.Drawing.Size(167, 22);
            this.btnCopySQL.Text = "Copy SQL Script To Clipboard";
            this.btnCopySQL.Click += new System.EventHandler(this.btnCopySQL_Click);
            // 
            // btnRunSQL
            // 
            this.btnRunSQL.Image = ((System.Drawing.Image)(resources.GetObject("btnRunSQL.Image")));
            this.btnRunSQL.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnRunSQL.Name = "btnRunSQL";
            this.btnRunSQL.Size = new System.Drawing.Size(172, 22);
            this.btnRunSQL.Text = "Run SQL Script Against Server";
            this.btnRunSQL.Click += new System.EventHandler(this.btnRunSQL_Click);
            // 
            // tpWrapperClass
            // 
            this.tpWrapperClass.Controls.Add(this.txtWrapperClass);
            this.tpWrapperClass.Controls.Add(this.tsWrapperClass);
            this.tpWrapperClass.Location = new System.Drawing.Point(4, 22);
            this.tpWrapperClass.Name = "tpWrapperClass";
            this.tpWrapperClass.Padding = new System.Windows.Forms.Padding(3);
            this.tpWrapperClass.Size = new System.Drawing.Size(517, 326);
            this.tpWrapperClass.TabIndex = 1;
            this.tpWrapperClass.Text = "C# Wrapper Class";
            this.tpWrapperClass.UseVisualStyleBackColor = true;
            // 
            // tsWrapperClass
            // 
            this.tsWrapperClass.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsbCopyCodeToClipBoard});
            this.tsWrapperClass.Location = new System.Drawing.Point(3, 3);
            this.tsWrapperClass.Name = "tsWrapperClass";
            this.tsWrapperClass.RenderMode = System.Windows.Forms.ToolStripRenderMode.System;
            this.tsWrapperClass.Size = new System.Drawing.Size(511, 25);
            this.tsWrapperClass.TabIndex = 8;
            this.tsWrapperClass.Text = "toolStrip1";
            this.tsWrapperClass.Click += new System.EventHandler(this.tsWrapperClass_Click);
            // 
            // tsbCopyCodeToClipBoard
            // 
            this.tsbCopyCodeToClipBoard.Image = ((System.Drawing.Image)(resources.GetObject("tsbCopyCodeToClipBoard.Image")));
            this.tsbCopyCodeToClipBoard.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCopyCodeToClipBoard.Name = "tsbCopyCodeToClipBoard";
            this.tsbCopyCodeToClipBoard.Size = new System.Drawing.Size(143, 22);
            this.tsbCopyCodeToClipBoard.Text = "Copy Code To Clipboard";
            // 
            // txtSQL
            // 
            this.txtSQL.ActiveView = Draco.Controls.CodeEditor.Windows.Forms.CodeEditor.ActiveView.BottomRight;
            this.txtSQL.AutoListPosition = null;
            this.txtSQL.AutoListSelectedText = "a123";
            this.txtSQL.AutoListVisible = false;
            this.txtSQL.CopyAsRTF = false;
            this.txtSQL.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtSQL.Document = this.SQL_SyntaxDocument;
            this.txtSQL.InfoTipCount = 1;
            this.txtSQL.InfoTipPosition = null;
            this.txtSQL.InfoTipSelectedIndex = 1;
            this.txtSQL.InfoTipVisible = false;
            lineMarginRender1.Bounds = new System.Drawing.Rectangle(19, 0, 19, 16);
            this.txtSQL.LineMarginRender = lineMarginRender1;
            this.txtSQL.Location = new System.Drawing.Point(3, 28);
            this.txtSQL.LockCursorUpdate = false;
            this.txtSQL.Name = "txtSQL";
            this.txtSQL.Saved = false;
            this.txtSQL.ShowScopeIndicator = false;
            this.txtSQL.Size = new System.Drawing.Size(511, 295);
            this.txtSQL.SmoothScroll = false;
            this.txtSQL.SplitviewH = -4;
            this.txtSQL.SplitviewV = -4;
            this.txtSQL.TabGuideColor = System.Drawing.Color.FromArgb(((int)(((byte)(244)))), ((int)(((byte)(243)))), ((int)(((byte)(234)))));
            this.txtSQL.TabIndex = 7;
            this.txtSQL.Text = "km";
            this.txtSQL.WhitespaceColor = System.Drawing.SystemColors.ControlDark;
            // 
            // SQL_SyntaxDocument
            // 
            this.SQL_SyntaxDocument.Lines = new string[] {
        ""};
            this.SQL_SyntaxDocument.MaxUndoBufferSize = 1000;
            this.SQL_SyntaxDocument.Modified = false;
            this.SQL_SyntaxDocument.SyntaxFile = "SQLServer2k.syn";
            this.SQL_SyntaxDocument.UndoStep = 0;
            // 
            // txtWrapperClass
            // 
            this.txtWrapperClass.ActiveView = Draco.Controls.CodeEditor.Windows.Forms.CodeEditor.ActiveView.BottomRight;
            this.txtWrapperClass.AutoListPosition = null;
            this.txtWrapperClass.AutoListSelectedText = "a123";
            this.txtWrapperClass.AutoListVisible = false;
            this.txtWrapperClass.CopyAsRTF = false;
            this.txtWrapperClass.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtWrapperClass.Document = this.WrapperClass_SyntaxDocument;
            this.txtWrapperClass.InfoTipCount = 1;
            this.txtWrapperClass.InfoTipPosition = null;
            this.txtWrapperClass.InfoTipSelectedIndex = 1;
            this.txtWrapperClass.InfoTipVisible = false;
            lineMarginRender2.Bounds = new System.Drawing.Rectangle(19, 0, 19, 16);
            this.txtWrapperClass.LineMarginRender = lineMarginRender2;
            this.txtWrapperClass.Location = new System.Drawing.Point(3, 28);
            this.txtWrapperClass.LockCursorUpdate = false;
            this.txtWrapperClass.Name = "txtWrapperClass";
            this.txtWrapperClass.Saved = false;
            this.txtWrapperClass.ShowScopeIndicator = false;
            this.txtWrapperClass.Size = new System.Drawing.Size(511, 295);
            this.txtWrapperClass.SmoothScroll = false;
            this.txtWrapperClass.SplitviewH = -4;
            this.txtWrapperClass.SplitviewV = -4;
            this.txtWrapperClass.TabGuideColor = System.Drawing.Color.FromArgb(((int)(((byte)(244)))), ((int)(((byte)(243)))), ((int)(((byte)(234)))));
            this.txtWrapperClass.TabIndex = 9;
            this.txtWrapperClass.WhitespaceColor = System.Drawing.SystemColors.ControlDark;
            // 
            // WrapperClass_SyntaxDocument
            // 
            this.WrapperClass_SyntaxDocument.Lines = new string[] {
        ""};
            this.WrapperClass_SyntaxDocument.MaxUndoBufferSize = 1000;
            this.WrapperClass_SyntaxDocument.Modified = false;
            this.WrapperClass_SyntaxDocument.SyntaxFile = "CSharp.syn";
            this.WrapperClass_SyntaxDocument.UndoStep = 0;
            // 
            // codeEditorControl1
            // 
            this.codeEditorControl1.ActiveView = Draco.Controls.CodeEditor.Windows.Forms.CodeEditor.ActiveView.BottomRight;
            this.codeEditorControl1.AutoListPosition = null;
            this.codeEditorControl1.AutoListSelectedText = "a123";
            this.codeEditorControl1.AutoListVisible = false;
            this.codeEditorControl1.CopyAsRTF = false;
            this.codeEditorControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.codeEditorControl1.Document = this.WrapperClass_SyntaxDocument;
            this.codeEditorControl1.InfoTipCount = 1;
            this.codeEditorControl1.InfoTipPosition = null;
            this.codeEditorControl1.InfoTipSelectedIndex = 1;
            this.codeEditorControl1.InfoTipVisible = false;
            lineMarginRender3.Bounds = new System.Drawing.Rectangle(19, 0, 19, 16);
            this.codeEditorControl1.LineMarginRender = lineMarginRender3;
            this.codeEditorControl1.Location = new System.Drawing.Point(3, 28);
            this.codeEditorControl1.LockCursorUpdate = false;
            this.codeEditorControl1.Name = "codeEditorControl1";
            this.codeEditorControl1.Saved = false;
            this.codeEditorControl1.ShowScopeIndicator = false;
            this.codeEditorControl1.Size = new System.Drawing.Size(511, 292);
            this.codeEditorControl1.SmoothScroll = false;
            this.codeEditorControl1.SplitviewH = -4;
            this.codeEditorControl1.SplitviewV = -4;
            this.codeEditorControl1.TabGuideColor = System.Drawing.Color.FromArgb(((int)(((byte)(244)))), ((int)(((byte)(243)))), ((int)(((byte)(234)))));
            this.codeEditorControl1.TabIndex = 7;
            this.codeEditorControl1.Text = "km";
            this.codeEditorControl1.WhitespaceColor = System.Drawing.SystemColors.ControlDark;
            // 
            // frmMain
            // 
            this.AcceptButton = this.btnConnect;
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(815, 512);
            this.Controls.Add(this.scMain);
            this.Controls.Add(this.gbConnection);
            this.Controls.Add(this.msMain);
            this.Font = new System.Drawing.Font("Tahoma", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(178)));
            this.Name = "frmMain";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Stored Procedure Generator Wizard";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.gbConnection.ResumeLayout(false);
            this.gbConnection.PerformLayout();
            this.msMain.ResumeLayout(false);
            this.msMain.PerformLayout();
            this.toolStrip1.ResumeLayout(false);
            this.toolStrip1.PerformLayout();
            this.scMain.Panel1.ResumeLayout(false);
            this.scMain.Panel1.PerformLayout();
            this.scMain.Panel2.ResumeLayout(false);
            this.scMain.ResumeLayout(false);
            this.tsEntitiesList.ResumeLayout(false);
            this.tsEntitiesList.PerformLayout();
            this.tcCodeArea.ResumeLayout(false);
            this.tpSQL.ResumeLayout(false);
            this.tpSQL.PerformLayout();
            this.tsCode.ResumeLayout(false);
            this.tsCode.PerformLayout();
            this.tpWrapperClass.ResumeLayout(false);
            this.tpWrapperClass.PerformLayout();
            this.tsWrapperClass.ResumeLayout(false);
            this.tsWrapperClass.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox gbConnection;
        private System.Windows.Forms.Label lblServerName;
        private System.Windows.Forms.RadioButton rbSQLServer;
        private System.Windows.Forms.RadioButton rbWindows;
        private System.Windows.Forms.Label lblAuthenticationMode;
        private System.Windows.Forms.Label lblPassword;
        private System.Windows.Forms.TextBox txtUsername;
        private System.Windows.Forms.Label lblUsername;
        private System.Windows.Forms.Button btnConnect;
        private System.Windows.Forms.TextBox txtPassword;
        private System.Windows.Forms.SplitContainer scMain;
        private System.Windows.Forms.TreeView tvEntities;
        private System.Windows.Forms.ImageList ilAll;
        private System.Windows.Forms.ToolStrip tsEntitiesList;
        private System.Windows.Forms.ToolStripButton tbtnGenerate;
        private System.Windows.Forms.TextBox txtServerName;
        private System.Windows.Forms.ImageList ilTree;
        private Draco.Controls.CodeEditor.Syntax.SyntaxDocument WrapperClass_SyntaxDocument;
        private System.Windows.Forms.MenuStrip msMain;
        private System.Windows.Forms.ToolStripMenuItem mnuFile;
        private System.Windows.Forms.ToolStripMenuItem mnuOptions;
        private System.Windows.Forms.ToolStripSeparator toolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem mnuExit;
        private System.Windows.Forms.TabControl tcCodeArea;
        private System.Windows.Forms.TabPage tpSQL;
        private Draco.Controls.CodeEditor.Windows.Forms.CodeEditorControl txtSQL;
        private System.Windows.Forms.ToolStrip tsCode;
        private System.Windows.Forms.ToolStripButton btnCopySQL;
        private System.Windows.Forms.TabPage tpWrapperClass;
        private Draco.Controls.CodeEditor.Windows.Forms.CodeEditorControl txtWrapperClass;
        private System.Windows.Forms.ToolStrip tsWrapperClass;
        private System.Windows.Forms.ToolStripButton tsbCopyCodeToClipBoard;
        private Draco.Controls.CodeEditor.Windows.Forms.CodeEditorControl codeEditorControl1;
        private System.Windows.Forms.ToolStrip toolStrip1;
        private System.Windows.Forms.ToolStripButton toolStripButton1;
        private Draco.Controls.CodeEditor.Syntax.SyntaxDocument SQL_SyntaxDocument;
        private System.Windows.Forms.ToolStripMenuItem mnuHelp;
        private System.Windows.Forms.ToolStripMenuItem mnuAbout;
        private System.Windows.Forms.ToolStripButton btnRunSQL;



    }
}

