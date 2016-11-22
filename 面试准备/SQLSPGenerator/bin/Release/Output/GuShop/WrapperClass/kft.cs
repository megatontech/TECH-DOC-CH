using System;
using System.Data;
using System.Data.SqlClient;
using System.ComponentModel;
using NovinMedia.Data;

namespace NovinMedia.Data.Layer
{
    [DataObject(true)]
    public class kft
    {
		[DataObjectMethod(DataObjectMethodType.Fill)]
		public DataSet SelectAll()
        {
            DbObject dbo = new DbObject();
            SqlParameter[] parameters = new SqlParameter[]
                {
 
                };
            return dbo.RunProcedure("sp_kft_SelectAll", parameters, "kft");
        }

		[DataObjectMethod(DataObjectMethodType.Fill)]
		public DataSet SelectRow(int id)
        {
            DbObject dbo = new DbObject();
            SqlParameter[] parameters = new SqlParameter[]
                {
					new SqlParameter("id",id) 
                };
            return dbo.RunProcedure("sp_kft_SelectRow", parameters, "kft");
        }

		[DataObjectMethod(DataObjectMethodType.Insert)]
		public int InsertRow(string khid,string guid)
		{
			int RowsAffected = 0;
			int Result = 0;
			DbObject dbo = new DbObject();
			SqlParameter[] parameters = new SqlParameter[]
				{
					new SqlParameter("khid",khid),
					new SqlParameter("guid",guid) 
				};
			Result = dbo.RunProcedure("sp_kft_Insert", parameters, out RowsAffected);
			return Result;
        }

		[DataObjectMethod(DataObjectMethodType.Update)]
		public int UpdateRow(int id,string khid,string guid)
		{
			int RowsAffected = 0;
			int Result = 0;
			DbObject dbo = new DbObject();
			SqlParameter[] parameters = new SqlParameter[]
				{
					new SqlParameter("id",id),
					new SqlParameter("khid",khid),
					new SqlParameter("guid",guid) 
				};
			Result = dbo.RunProcedure("sp_kft_Update", parameters, out RowsAffected);
			return Result;
        }

		[DataObjectMethod(DataObjectMethodType.Delete)]
		public int DeleteRow(int id)
		{
			int RowsAffected = 0;
			int Result = 0;
			DbObject dbo = new DbObject();
			SqlParameter[] parameters = new SqlParameter[]
				{
					new SqlParameter("id",id) 
				};
			Result = dbo.RunProcedure("sp_kft_DeleteRow", parameters, out RowsAffected);
			return Result;
        }
    }
}