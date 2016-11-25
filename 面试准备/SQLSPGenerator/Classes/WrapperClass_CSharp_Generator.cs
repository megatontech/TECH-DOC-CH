using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using SP_Gen.Properties;

namespace SP_Gen.Classes
{
    class WrapperClass_CSharp_Generator
    {
        #region "Data Layer Generation Methods"

        public static string CreateSelectAllMethod(string MethodName, string TableName, DataRow[] Columns, bool StaticMethod)
        {
            string code = string.Empty;
            string ParametersList = string.Empty;
            string SqlCommandsList = string.Empty;

            #region "Create Parameters List"

            string strStatic = (StaticMethod ? "static " : "");

            string Prefix = Session.LoadFromSession("Prefix").ToString();
            String strSpName = Prefix + TableName + "_SelectAll";
            code = "\t\t";
            code += string.Format(Resources.ReturnDatasetMethodTemplate,
                                  strStatic,
                                  MethodName,
                                  ParametersList,
                                  SqlCommandsList,
                                  strSpName,
                                  TableName,
                                  "[DataObjectMethod(DataObjectMethodType.Fill)]\r\n\t\t");
            #endregion            
            return code;
        }

        public static string CreateSelectRowMethod(string MethodName, string TableName, DataRow[] Columns, bool StaticMethod)
        {
            string code = string.Empty;
            string ParametersList = string.Empty;
            string SqlCommandsList = string.Empty;

            #region "Parameter Definition"

            bool firstParam = true;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIdentity"].ToString()) != 0 || int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                    }
                    else
                    {
                        ParametersList += ",";
                        SqlCommandsList += ",\r\n";
                    }

                    ParametersList += TranslatoToCSharpType(row["DATA_TYPE"].ToString()) + " " + row["COLUMN_NAME"].ToString();
                    SqlCommandsList += "\t\t\t\t\t" + string.Format(Resources.SqlParameterTemplate, row["COLUMN_NAME"].ToString(), row["COLUMN_NAME"].ToString());
                }
            }
            #endregion


            string strStatic = (StaticMethod ? "static " : "");
            string Prefix = Session.LoadFromSession("Prefix").ToString();
            String strSpName = Prefix + TableName + "_SelectRow";
            code = "\t\t";
            code += string.Format(Resources.ReturnDatasetMethodTemplate,
                                  strStatic,
                                  MethodName,
                                  ParametersList,
                                  SqlCommandsList,
                                  strSpName,
                                  TableName,
                                  "[DataObjectMethod(DataObjectMethodType.Fill)]\r\n\t\t");
            
            return code;
        }

        public static string CreateDeleteRowMethod(string MethodName, string TableName, DataRow[] Columns, bool StaticMethod)
        {
            string code = string.Empty;
            string ParametersList = string.Empty;
            string SqlCommandsList = string.Empty;

            #region "Parameter Definition"

            bool firstParam = true;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIdentity"].ToString()) != 0 || int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                    }
                    else
                    {
                        ParametersList += ",";
                        SqlCommandsList += ",\r\n";
                    }

                    ParametersList += TranslatoToCSharpType(row["DATA_TYPE"].ToString()) + " " + row["COLUMN_NAME"].ToString();
                    SqlCommandsList += "\t\t\t\t\t" + string.Format(Resources.SqlParameterTemplate, row["COLUMN_NAME"].ToString(), row["COLUMN_NAME"].ToString());
                }
            }
            #endregion


            string strStatic = (StaticMethod ? "static " : "");
            string Prefix = Session.LoadFromSession("Prefix").ToString();
            String strSpName = Prefix + TableName + "_DeleteRow";
            code = "\t\t";
            code += string.Format(Resources.ReturnScalarMethodTemplate,
                                  strStatic,
                                  MethodName,
                                  ParametersList,
                                  SqlCommandsList,
                                  strSpName,                                  
                                  "[DataObjectMethod(DataObjectMethodType.Delete)]\r\n\t\t");           
            return code;
        }

        public static string CreateUpdateRowMethod(string MethodName, string TableName, DataRow[] Columns, bool StaticMethod)
        {
            string code = string.Empty;
            string ParametersList = string.Empty;
            string SqlCommandsList = string.Empty;

            #region "Parameter Definition"

            bool firstParam = true;

            foreach (DataRow row in Columns)
            {
                if (firstParam == true)
                {
                    firstParam = false;
                }
                else
                {
                    ParametersList += ",";
                    SqlCommandsList += ",\r\n";
                }

                ParametersList += TranslatoToCSharpType(row["DATA_TYPE"].ToString()) + " " + row["COLUMN_NAME"].ToString();
                SqlCommandsList += "\t\t\t\t\t" + string.Format(Resources.SqlParameterTemplate, row["COLUMN_NAME"].ToString(), row["COLUMN_NAME"].ToString());
            }
            #endregion


            string strStatic = (StaticMethod ? "static " : "");
            string Prefix = Session.LoadFromSession("Prefix").ToString();
            String strSpName = Prefix + TableName + "_Update";
            code = "\t\t";
            code += string.Format(Resources.ReturnScalarMethodTemplate,
                                  strStatic,
                                  MethodName,
                                  ParametersList,
                                  SqlCommandsList,
                                  strSpName,
                                  "[DataObjectMethod(DataObjectMethodType.Update)]\r\n\t\t");
            return code;
        }

        public static string CreateInsertRowMethod(string MethodName, string TableName, DataRow[] Columns, bool StaticMethod)
        {
            string code = string.Empty;
            string ParametersList = string.Empty;
            string SqlCommandsList = string.Empty;

            #region "Parameter Definition"

            bool firstParam = true;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIdentity"].ToString()) == 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                    }
                    else
                    {
                        ParametersList += ",";
                        SqlCommandsList += ",\r\n";
                    }

                    ParametersList += TranslatoToCSharpType(row["DATA_TYPE"].ToString()) + " " + row["COLUMN_NAME"].ToString();
                    SqlCommandsList += "\t\t\t\t\t" + string.Format(Resources.SqlParameterTemplate, row["COLUMN_NAME"].ToString(), row["COLUMN_NAME"].ToString());
                }
            }
            #endregion


            string strStatic = (StaticMethod ? "static " : "");
            string Prefix = Session.LoadFromSession("Prefix").ToString();
            String strSpName = Prefix + TableName + "_Insert";
            code = "\t\t";
            code += string.Format(Resources.ReturnScalarMethodTemplate,
                                  strStatic,
                                  MethodName,
                                  ParametersList,
                                  SqlCommandsList,
                                  strSpName,
                                  "[DataObjectMethod(DataObjectMethodType.Insert)]\r\n\t\t");
            return code;
        }
        #endregion

        public static string TranslatoToCSharpType(string type)
        {
            string result = string.Empty;

            switch (type)
            {
                case "char":
                case "varchar":
                case "nchar":
                case "nvarchar":
                case "text":
                case "ntext":
                    {
                        result = "string";
                        break;
                    }
                case "bit":
                    {
                        result = "bool";
                        break;
                    }
                case "int":
                    {
                        result = "int";
                        break;
                    }
                case "tinyint":
                    {
                        result = "byte";
                        break;
                    }
                case "bigint":
                    {
                        result = "long";
                        break;
                    }
                case "smallint":
                    {
                        result = "short";
                        break;
                    }

                case "datetime":
                    {
                        result = "DateTime";
                        break;
                    }
                case "float":                
                    {
                        result = "float";
                        break;
                    }
                case "real":
                    {
                        result = "double";
                        break;
                    }
                case "numeric":
                    {
                        result = "float";
                        break;
                    }
                default:
                    {
                        result = "string";
                        break;
                    }
            }
            return result;

        }

    }
}
