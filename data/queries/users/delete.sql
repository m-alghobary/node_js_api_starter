UPDATE [Users] SET [deletedAt] = GETDATE()
WHERE id = @userId;