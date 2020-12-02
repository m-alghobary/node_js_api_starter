UPDATE [Users]
SET [name] = @name, 
    [email] = @email,
    [jobTitle] = @job,
    [phone] = @phone,
    [gender] = @gender,
    [roleId] = @roleId,
    [partnerId] = @partnerId
WHERE [id] = @userId;