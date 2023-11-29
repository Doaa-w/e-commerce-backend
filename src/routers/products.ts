import { Router } from 'express';

import { createSingleProduct, deleteSingleProducts, getAllProducts, getSingleProductsBySlug, updateSingleProduct } from '../controller/products';
import { upload } from '../middlewares/uploadFile';

// import { createProductValidation, updateProductValidation } from '../validation/vaildations';
// import { runValidation } from '../validation/runValidation';

const router = Router();

router.get('/', getAllProducts);
router.get('/:slug', getSingleProductsBySlug);
router.post('/', upload.single('image'), /*createProductValidation, runValidation,*/ createSingleProduct);
router.put('/:slug', /*createProductValidation, runValidation,*/ updateSingleProduct);
router.delete('/:slug', deleteSingleProducts);

export default router;