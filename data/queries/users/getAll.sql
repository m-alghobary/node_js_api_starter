SELECT [id], [name], [email], [jobTitle], [phone], [gender], [role], [roleId], [partner], [partnerId]
FROM [V_Users]
WHERE [deletedAt] IS NULL
ORDER BY [createdAt] DESC;