using System;
using System.Data;
using System.Data.SqlClient;
using System.ComponentModel;
using NovinMedia.Data;

namespace NovinMedia.Data.Layer
{
    [DataObject(true)]
    public class book
    {
		[DataObjectMethod(DataObjectMethodType.Fill)]
		public DataSet SelectAll()
        {
            DbObject dbo = new DbObject();
            SqlParameter[] parameters = new SqlParameter[]
                {
 
                };
            return dbo.RunProcedure("sp_book_SelectAll", parameters, "book");
        }

		[DataObjectMethod(DataObjectMethodType.Fill)]
		public DataSet SelectRow(int bookNo)
        {
            DbObject dbo = new DbObject();
            SqlParameter[] parameters = new SqlParameter[]
                {
					new SqlParameter("bookNo",bookNo) 
                };
            return dbo.RunProcedure("sp_book_SelectRow", parameters, "book");
        }

		[DataObjectMethod(DataObjectMethodType.Insert)]
		public int InsertRow(string bookName)
		{
			int RowsAffected = 0;
			int Result = 0;
			DbObject dbo = new DbObject();
			SqlParameter[] parameters = new SqlParameter[]
				{
					new SqlParameter("bookName",bookName) 
				};
			Result = dbo.RunProcedure("sp_book_Insert", parameters, out RowsAffected);
			return Result;
        }

		[DataObjectMethod(DataObjectMethodType.Update)]
		public int UpdateRow(int bookNo,string bookName)
		{
			int RowsAffected = 0;
			int Result = 0;
			DbObject dbo = new DbObject();
			SqlParameter[] parameters = new SqlParameter[]
				{
					new SqlParameter("bookNo",bookNo),
					new SqlParameter("bookName",bookName) 
				};
			Result = dbo.RunProcedure("sp_book_Update", parameters, out RowsAffected);
			return Result;
        }

		[DataObjectMethod(DataObjectMethodType.Delete)]
		public int DeleteRow(int bookNo)
		{
			int RowsAffected = 0;
			int Result = 0;
			DbObject dbo = new DbObject();
			SqlParameter[] parameters = new SqlParameter[]
				{
					new SqlParameter("bookNo",bookNo) 
				};
			Result = dbo.RunProcedure("sp_book_DeleteRow", parameters, out RowsAffected);
			return Result;
        }
    }
}