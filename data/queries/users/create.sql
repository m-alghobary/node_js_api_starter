INSERT INTO [Users]
    ([name] ,[image] ,[email] ,[password] ,[jobTitle] ,[phone] ,[gender] ,[roleId], [partnerId])
VALUES
    (@name, @image, @email, @pass, @job, @phone, @gender, @roleId, @partnerId);
SELECT SCOPE_IDENTITY() AS id;