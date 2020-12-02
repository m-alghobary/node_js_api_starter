const multer = require('multer');

module.exports = (dist) => {
	const types = ['image/png', 'image/jpg', 'image/jpeg'];
	const maxFileSize = 1024 * 1024 * 2; // 2MB

	return multer({
		storage: multer.diskStorage({
			destination: dist,
			filename(req, file, cb) {
				const fileName = `${Date.now()}-${file.originalname}`;
				cb(null, fileName);
			},
		}),
		limits: {
			fileSize: maxFileSize,
			files: 1,
		},
		fileFilter(req, file, cb) {
			// allow image files
			if (!types.includes(file.mimetype)) {
				cb(null, false);
			} else {
				cb(null, true);
			}
		},
	});
};
