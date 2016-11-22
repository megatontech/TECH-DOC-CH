--
-- Dropping stored procedure sp_kft_SelectAll : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_kft_SelectAll]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_kft_SelectAll]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_kft_SelectAll
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:34
-- Description:	This stored procedure is intended for selecting all rows from kft table
-- ==========================================================================================
Create Procedure sp_kft_SelectAll
As
Begin
	Select 
		[id],
		[khid],
		[guid]
	From kft
End

GO


--
-- Dropping stored procedure sp_kft_SelectRow : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_kft_SelectRow]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_kft_SelectRow]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_kft_SelectRow
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:34
-- Description:	This stored procedure is intended for selecting a specific row from kft table
-- ==========================================================================================
Create Procedure sp_kft_SelectRow
	@id int
As
Begin
	Select 
		[id],
		[khid],
		[guid]
	From kft
	Where
		[id] = @id
End

GO


--
-- Dropping stored procedure sp_kft_Insert : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_kft_Insert]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_kft_Insert]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_kft_Insert
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:34
-- Description:	This stored procedure is intended for inserting values to kft table
-- ==========================================================================================
Create Procedure sp_kft_Insert
	@khid nvarchar(50),
	@guid uniqueidentifier
As
Begin
	Insert Into kft
		([khid],[guid])
	Values
		(@khid,@guid)

	Declare @ReferenceID int
	Select @ReferenceID = @@IDENTITY

	Return @ReferenceID

End

GO


--
-- Dropping stored procedure sp_kft_Update : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_kft_Update]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_kft_Update]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_kft_Update
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:34
-- Description:	This stored procedure is intended for updating kft table
-- ==========================================================================================
Create Procedure sp_kft_Update
	@id int,
	@khid nvarchar(50),
	@guid uniqueidentifier
As
Begin
	Update kft
	Set
		[khid] = @khid,
		[guid] = @guid
	Where		
		[id] = @id

End

GO


--
-- Dropping stored procedure sp_kft_DeleteRow : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_kft_DeleteRow]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_kft_DeleteRow]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_kft_DeleteRow
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:34
-- Description:	This stored procedure is intended for deleting a specific row from kft table
-- ==========================================================================================
Create Procedure sp_kft_DeleteRow
	@id int
As
Begin
	Delete kft
	Where
		[id] = @id

End

GO
