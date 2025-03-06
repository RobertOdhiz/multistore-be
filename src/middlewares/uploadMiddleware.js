import createMulterInstance from "../helpers/multer";

const upload = createMulterInstance();

export const uploadMiddleware = upload.fields([
  { name: 'productImage', maxCount: 50 },
]);