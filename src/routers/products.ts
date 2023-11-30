import { Router } from 'express';

import { createSingleProduct, deleteSingleProducts, getAllProducts, getFilteredProducts, getSingleProductsBySlug, updateSingleProduct } from '../controller/products';
import { upload } from '../middlewares/uploadFile';

import { createProductValidation, updateProductValidation } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';

const router = Router();

router.get('/', getAllProducts);
router.get('/:slug', getSingleProductsBySlug);
router.post('/', upload.single('image'), /*createProductValidation, runValidation,*/ createSingleProduct);
router.put('/:slug', /*createProductValidation, runValidation,*/ updateSingleProduct);
router.delete('/:slug', deleteSingleProducts);
router.get('/filtered-products', getFilteredProducts);

export default router;