SELECT COUNT(*) AS Emails
FROM [Users]
WHERE [Email] = @email AND [deletedAt] IS NULL