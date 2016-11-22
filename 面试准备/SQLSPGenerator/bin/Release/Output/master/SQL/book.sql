--
-- Dropping stored procedure sp_book_SelectAll : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_book_SelectAll]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_book_SelectAll]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_book_SelectAll
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:47
-- Description:	This stored procedure is intended for selecting all rows from book table
-- ==========================================================================================
Create Procedure sp_book_SelectAll
As
Begin
	Select 
		[bookNo],
		[bookName]
	From book
End

GO


--
-- Dropping stored procedure sp_book_SelectRow : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_book_SelectRow]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_book_SelectRow]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_book_SelectRow
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:47
-- Description:	This stored procedure is intended for selecting a specific row from book table
-- ==========================================================================================
Create Procedure sp_book_SelectRow
	@bookNo int
As
Begin
	Select 
		[bookNo],
		[bookName]
	From book
	Where
		[bookNo] = @bookNo
End

GO


--
-- Dropping stored procedure sp_book_Insert : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_book_Insert]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_book_Insert]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_book_Insert
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:47
-- Description:	This stored procedure is intended for inserting values to book table
-- ==========================================================================================
Create Procedure sp_book_Insert
	@bookName varchar(500)
As
Begin
	Insert Into book
		([bookName])
	Values
		(@bookName)

	Declare @ReferenceID int
	Select @ReferenceID = @@IDENTITY

	Return @ReferenceID

End

GO


--
-- Dropping stored procedure sp_book_Update : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_book_Update]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_book_Update]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_book_Update
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:47
-- Description:	This stored procedure is intended for updating book table
-- ==========================================================================================
Create Procedure sp_book_Update
	@bookNo int,
	@bookName varchar(500)
As
Begin
	Update book
	Set
		[bookName] = @bookName
	Where		
		[bookNo] = @bookNo

End

GO


--
-- Dropping stored procedure sp_book_DeleteRow : 
--

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[sp_book_DeleteRow]') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROCEDURE [dbo].[sp_book_DeleteRow]
  
GO

-- ==========================================================================================
-- Entity Name:	sp_book_DeleteRow
-- Author:	Mehdi Keramati
-- Create date:	2013/3/7 9:42:47
-- Description:	This stored procedure is intended for deleting a specific row from book table
-- ==========================================================================================
Create Procedure sp_book_DeleteRow
	@bookNo int
As
Begin
	Delete book
	Where
		[bookNo] = @bookNo

End

GO
