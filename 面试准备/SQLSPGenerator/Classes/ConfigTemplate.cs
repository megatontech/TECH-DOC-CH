using System.Xml.Serialization;

namespace SP_Gen.Classes
{
    [XmlRoot("StoredProcedureGeneratorConfigFile", Namespace = "http://www.barnamenevis.org", IsNullable = false)]
    public class ConfigTemplate
    {
        #region "General Settings"        
        public bool GenerateWrapperClass = false;
        #endregion

        #region "SQL Script Settings"
        public string AuthorName = string.Empty;
        public bool PassNullAsDefaultParamaeterValue;
        public string StoredProceduresPrefix = string.Empty;
        public bool AutoSaveScript = false;
        public bool GenerateSelectAllProc = true;
        public bool GenerateSelectRowProc = true;
        public bool GenerateInsertProc = true;
        public bool GenerateUpdateProc = true;
        public bool GenerateDeleteRowProc = true;
        #endregion

        #region "C# Wrapper Class Settings"
        public bool WrapperClass_GenerateStaticMethods = true;
        public string WrapperClass_NameSpace = "NovinMedia.Data";
        public bool AutoSaveWrapperClass = false;
        #endregion
    }
}