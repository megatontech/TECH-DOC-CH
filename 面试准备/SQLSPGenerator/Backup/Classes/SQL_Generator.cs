using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Text;
using SP_Gen.Properties;

namespace SP_Gen.Classes
{
    class SQL_Generator
    {
        #region "Stored Procedure Generation Methods"

        public static string CreateDeleteRowSP(string spName, string TableName, DataRow[] Columns)
        {
            string SQL = string.Empty;

            SQL = String.Format(Resources.DropProcedure, spName);
            SQL += "\r\n\r\n";

            SQL += "-- ==========================================================================================";
            SQL += "\r\n-- Entity Name:\t" + spName;
            string AuthorName = Session.LoadFromSession("AuthorName").ToString();
            if (AuthorName != string.Empty)
            {
                SQL += "\r\n-- Author:\t" + AuthorName;
            }
            SQL += "\r\n-- Create date:\t" + DateTime.Now;
            SQL += "\r\n-- Description:\tThis stored procedure is intended for deleting a specific row from " +
                   TableName + " table";
            SQL +=
                "\r\n-- ==========================================================================================\r\n";

            #region "Header Definition"

            SQL += "Create Procedure " + spName + "\r\n";

            #endregion

            #region "Parameter Definition"

            bool firstParam = true;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIdentity"].ToString()) != 0 || int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                        SQL += "\t";
                    }
                    else
                    {
                        SQL += ",\r\n\t";
                    }

                    SQL += "@" + row["COLUMN_NAME"].ToString() + " ";

                    if (row["DATA_TYPE"].ToString().ToLower().Contains("char"))
                    {
                        string Length = (row["CHARACTER_MAXIMUM_LENGTH"].ToString().Equals("-1")
                                             ? "MAX"
                                             : row["CHARACTER_MAXIMUM_LENGTH"].ToString());
                        SQL += row["DATA_TYPE"].ToString() + "(" + Length + ")";
                    }
                    else if (row["DATA_TYPE"].ToString().ToLower().Contains("numeric"))
                    {
                        SQL += string.Format("numeric({0:G},{1:G})",
                            row["NUMERIC_PRECISION"].ToString(),
                            row["NUMERIC_SCALE"].ToString());
                    }
                    else
                    {
                        SQL += row["DATA_TYPE"].ToString();
                    }
                }
            }

            #endregion

            #region "Delete Command / Header Definition"

            SQL += "\r\nAs\r\nBegin\r\n";
            SQL += "\tDelete " + TableName + "\r\n";

            #endregion

            #region "Primary Key Column Detection"

            string pkColumn = string.Empty;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    pkColumn = row["COLUMN_NAME"].ToString();
                    break;
                }
            }

            #endregion

            #region "Delete Command / Where Clause Definition"

            firstParam = true;

            SQL += "\tWhere\r\n";

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIdentity"].ToString()) != 0 || int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                        SQL += "\t\t";
                    }
                    else
                    {
                        SQL += "\r\n\t\tand ";
                    }
                    SQL += QualifyFieldName(row["COLUMN_NAME"].ToString()) + " = " + "@" + row["COLUMN_NAME"].ToString();
                }
            }
            SQL += "\r\n";

            #endregion

            SQL += "\r\nEnd\r\n\r\nGO\r\n";

            return SQL;
        }

        public static string CreateInsertSP(string spName, string TableName, DataRow[] Columns)
        {
            string SQL = string.Empty;

            SQL = String.Format(Resources.DropProcedure, spName);
            SQL += "\r\n\r\n";

            SQL += "-- ==========================================================================================";
            SQL += "\r\n-- Entity Name:\t" + spName;
            string AuthorName = Session.LoadFromSession("AuthorName").ToString();
            if (AuthorName != string.Empty)
            {
                SQL += "\r\n-- Author:\t" + AuthorName;
            }
            SQL += "\r\n-- Create date:\t" + DateTime.Now.ToString();
            SQL += "\r\n-- Description:\tThis stored procedure is intended for inserting values to " + TableName +
                   " table";
            SQL +=
                "\r\n-- ==========================================================================================\r\n";

            #region "Header Definition"

            SQL += "Create Procedure " + spName + "\r\n";

            #endregion

            #region "Parameter Definition"

            bool firstParam = true;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIdentity"].ToString()) == 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                        SQL += "\t";
                    }
                    else
                    {
                        SQL += ",\r\n\t";
                    }

                    SQL += "@" + row["COLUMN_NAME"] + " ";

                    if (row["DATA_TYPE"].ToString().ToLower().Contains("char"))
                    {
                        string Length = (row["CHARACTER_MAXIMUM_LENGTH"].ToString().Equals("-1")
                                             ? "MAX"
                                             : row["CHARACTER_MAXIMUM_LENGTH"].ToString());
                        SQL += row["DATA_TYPE"].ToString() + "(" + Length + ")";
                    }
                    else if (row["DATA_TYPE"].ToString().ToLower().Contains("numeric"))
                    {
                        SQL += string.Format("numeric({0:G},{1:G})",
                            row["NUMERIC_PRECISION"].ToString(),
                            row["NUMERIC_SCALE"].ToString());
                    }
                    else
                    {
                        SQL += row["DATA_TYPE"].ToString();
                    }
                    bool NullParamDefaultValues = bool.Parse(Session.LoadFromSession("NullParamDefaultValues").ToString());
                    if (row["IS_NULLABLE"].ToString().ToLower() == "yes" && NullParamDefaultValues == true)
                    {
                        SQL += " = NULL";
                    }
                }
            }
            #endregion

            #region "Insert Command / Header Definition"

            SQL += "\r\nAs\r\nBegin\r\n";
            SQL += "\tInsert Into " + TableName + "\r\n\t\t(";

            #endregion

            #region "Insert Command / Target Columns Definition"

            firstParam = true;
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
                        SQL += ",";
                    }

                    SQL += QualifyFieldName(row["COLUMN_NAME"].ToString());
                }
            }
            SQL += ")\r\n\tValues\r\n\t\t(";

            #endregion

            #region "Insert Command / Supplying Values Definition"

            firstParam = true;

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
                        SQL += ",";
                    }
                    SQL += "@" + row["COLUMN_NAME"].ToString();
                }
            }
            SQL += ")\r\n";

            #endregion

            #region "Return Identity , if any identity columns found"

            bool identityExists = false;
            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIdentity"].ToString()) != 0)
                {
                    identityExists = true;
                    break;
                }
            }
            if (identityExists == true)
            {
                SQL += "\r\n\tDeclare @ReferenceID int";
                SQL += "\r\n\tSelect @ReferenceID = @@IDENTITY\r\n";
            }

            #endregion

            #region "Primary Key Column Detection"

            string pkColumn = string.Empty;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    pkColumn = row["COLUMN_NAME"].ToString();
                    break;
                }
            }

            #endregion

            if (identityExists == true)
            {
                SQL += "\r\n\tReturn @ReferenceID\r\n";
            }

            SQL += "\r\nEnd\r\n\r\nGO\r\n";

            return SQL;
        }

        public static string CreateSelectAllSP(string spName, string TableName, DataRow[] Columns)
        {
            string SQL = string.Empty;

            SQL = String.Format(Resources.DropProcedure, spName);
            SQL += "\r\n\r\n";

            SQL += "-- ==========================================================================================";
            SQL += "\r\n-- Entity Name:\t" + spName;
            string AuthorName = Session.LoadFromSession("AuthorName").ToString();
            if (AuthorName != string.Empty)
            {
                SQL += "\r\n-- Author:\t" + AuthorName;
            }
            SQL += "\r\n-- Create date:\t" + DateTime.Now.ToString();
            SQL += "\r\n-- Description:\tThis stored procedure is intended for selecting all rows from " + TableName +
                   " table";
            SQL +=
                "\r\n-- ==========================================================================================\r\n";

            #region "Header Definition"

            SQL += "Create Procedure " + spName + "\r\n";

            #endregion

            #region "Parameter Definition"

            bool firstParam = true;

            #endregion

            #region "Select Command / Header Definition"

            SQL += "As\r\nBegin\r\n";
            SQL += "\tSelect " + "\r\n";

            #endregion

            #region "Primary Key Column Detection"

            string pkColumn = string.Empty;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    pkColumn = row["COLUMN_NAME"].ToString();
                    break;
                }
            }

            #endregion

            #region "Select Command / Columns List Definition"

            firstParam = true;
            foreach (DataRow row in Columns)
            {
                //if (int.Parse(row["IsIdentity"].ToString()) == 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                    }
                    else
                    {
                        SQL += ",\r\n";
                    }
                    SQL += "\t\t" + QualifyFieldName(row["COLUMN_NAME"].ToString());

                }
            }
            //SQL += ")\r\n\tValues\r\n\t\t(";

            #endregion

            SQL += "\r\n\tFrom " + TableName;

            SQL += "\r\nEnd\r\n\r\nGO\r\n";

            return SQL;
        }

        public static string CreateSelectRowSP(string spName, string TableName, DataRow[] Columns)
        {
            string SQL = string.Empty;

            SQL = String.Format(Resources.DropProcedure, spName);
            SQL += "\r\n\r\n";

            SQL += "-- ==========================================================================================";
            SQL += "\r\n-- Entity Name:\t" + spName;
            string AuthorName = Session.LoadFromSession("AuthorName").ToString();
            if (AuthorName != string.Empty)
            {
                SQL += "\r\n-- Author:\t" + AuthorName;
            }
            SQL += "\r\n-- Create date:\t" + DateTime.Now.ToString();
            SQL += "\r\n-- Description:\tThis stored procedure is intended for selecting a specific row from " +
                   TableName + " table";
            SQL +=
                "\r\n-- ==========================================================================================\r\n";

            #region "Header Definition"

            SQL += "Create Procedure " + spName + "\r\n";

            #endregion

            #region "Parameter Definition"

            bool firstParam = true;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIdentity"].ToString()) != 0 || int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                        SQL += "\t";
                    }
                    else
                    {
                        SQL += ",\r\n\t";
                    }

                    SQL += "@" + row["COLUMN_NAME"].ToString() + " ";

                    if (row["DATA_TYPE"].ToString().ToLower().Contains("char"))
                    {
                        string Length = (row["CHARACTER_MAXIMUM_LENGTH"].ToString().Equals("-1")
                                             ? "MAX"
                                             : row["CHARACTER_MAXIMUM_LENGTH"].ToString());
                        SQL += row["DATA_TYPE"].ToString() + "(" + Length + ")";
                    }
                    else
                    {
                        SQL += row["DATA_TYPE"].ToString();
                    }
                }
            }
            #endregion

            #region "Select Command / Header Definition"

            SQL += "\r\nAs\r\nBegin\r\n";
            SQL += "\tSelect " + "\r\n";

            #endregion

            #region "Primary Key Column Detection"

            string pkColumn = string.Empty;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    pkColumn = row["COLUMN_NAME"].ToString();
                    break;
                }
            }

            #endregion

            #region "Select Command / Columns List Definition"

            firstParam = true;
            foreach (DataRow row in Columns)
            {
                //if (int.Parse(row["IsIdentity"].ToString()) == 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                    }
                    else
                    {
                        SQL += ",\r\n";
                    }
                    SQL += "\t\t" + QualifyFieldName(row["COLUMN_NAME"].ToString());

                }
            }

            #endregion

            SQL += "\r\n\tFrom " + TableName;

            #region "Select Command / Where Clause Definition"

            firstParam = true;

            SQL += "\r\n\tWhere\r\n";

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIdentity"].ToString()) != 0 || int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                        SQL += "\t\t";
                    }
                    else
                    {
                        SQL += "\r\n\t\tand ";
                    }
                    SQL += QualifyFieldName(row["COLUMN_NAME"].ToString()) + " = " + "@" + row["COLUMN_NAME"].ToString();
                }
            }

            #endregion

            SQL += "\r\nEnd\r\n\r\nGO\r\n";

            return SQL;
        }

        public static string CreateUpdateSP(string spName, string TableName, DataRow[] Columns)
        {
            string SQL = string.Empty;

            SQL = String.Format(Resources.DropProcedure, spName);
            SQL += "\r\n\r\n";

            SQL += "-- ==========================================================================================";
            SQL += "\r\n-- Entity Name:\t" + spName;
            string AuthorName = Session.LoadFromSession("AuthorName").ToString();
            if (AuthorName != string.Empty)
            {
                SQL += "\r\n-- Author:\t" + AuthorName;
            }
            SQL += "\r\n-- Create date:\t" + DateTime.Now.ToString();
            SQL += "\r\n-- Description:\tThis stored procedure is intended for updating " + TableName + " table";
            SQL +=
                "\r\n-- ==========================================================================================\r\n";

            #region "Header Definition"

            SQL += "Create Procedure " + spName + "\r\n";

            #endregion

            #region "Parameter Definition"

            bool firstParam = true;

            foreach (DataRow row in Columns)
            {
                if (firstParam == true)
                {
                    firstParam = false;
                    SQL += "\t";
                }
                else
                {
                    SQL += ",\r\n\t";
                }

                SQL += "@" + row["COLUMN_NAME"].ToString() + " ";

                if (row["DATA_TYPE"].ToString().ToLower().Contains("char"))
                {
                    string Length = (row["CHARACTER_MAXIMUM_LENGTH"].ToString().Equals("-1")
                                         ? "MAX"
                                         : row["CHARACTER_MAXIMUM_LENGTH"].ToString());
                    SQL += row["DATA_TYPE"].ToString() + "(" + Length + ")";
                }
                else if (row["DATA_TYPE"].ToString().ToLower().Contains("numeric"))
                {
                    SQL += string.Format("numeric({0:G},{1:G})",
                        row["NUMERIC_PRECISION"].ToString(),
                        row["NUMERIC_SCALE"].ToString());
                }
                else
                {
                    SQL += row["DATA_TYPE"].ToString();
                }
            }
            #endregion

            #region "Update Command / Header Definition"

            SQL += "\r\nAs\r\nBegin\r\n";
            SQL += "\tUpdate " + TableName + "\r\n\tSet\r\n\t\t";

            #endregion

            #region "Primary Key Column Detection"

            string pkColumn = string.Empty;

            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIndex"].ToString()) != 0)
                {
                    pkColumn = row["COLUMN_NAME"].ToString();
                    break;
                }
            }

            #endregion

            #region "Update Command / Setting Values Definition"

            firstParam = true;
            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIndex"].ToString()) == 0 && int.Parse(row["IsIdentity"].ToString()) == 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                    }
                    else
                    {
                        SQL += ",\r\n\t\t";
                    }

                    SQL += QualifyFieldName(row["COLUMN_NAME"].ToString()) + " = @" + row["COLUMN_NAME"].ToString();
                }
            }
            SQL += "\r\n\tWhere\t\t";

            #endregion

            #region "Update Command / Where Clause Definition"

            firstParam = true;
            foreach (DataRow row in Columns)
            {
                if (int.Parse(row["IsIndex"].ToString()) != 0 || int.Parse(row["IsIdentity"].ToString()) != 0)
                {
                    if (firstParam == true)
                    {
                        firstParam = false;
                        SQL += "\r\n\t\t";
                    }
                    else
                    {
                        SQL += "\r\n\t\tand ";
                    }

                    SQL += QualifyFieldName(row["COLUMN_NAME"].ToString()) + " = @" + row["COLUMN_NAME"].ToString();
                }
            }
            SQL += "\r\n";

            #endregion

            SQL += "\r\nEnd\r\n\r\nGO\r\n";

            return SQL;
        }

        private static string QualifyFieldName(string FieldName)
        {
            return "[" + FieldName + "]";
        }


        #endregion

    }
}
