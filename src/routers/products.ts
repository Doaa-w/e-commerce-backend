import { Router } from 'express';

import { createSingleProduct, deleteSingleProducts, getAllProducts, getFilteredProducts, getSingleProductsBySlug, updateSingleProduct } from '../controller/products';
import { upload } from '../middlewares/uploadFile';

import { isAdmin, isLoggedIn } from '../middlewares/auth';
import { createProductValidation, updateProductValidation } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';

const router = Router();

router.get('/', getAllProducts);
router.get('/:slug', getSingleProductsBySlug);
router.get('/filtered-products', getFilteredProducts);
router.post('/', isLoggedIn, isAdmin, /*createProductValidation, runValidation,*/ upload.single('image'), createSingleProduct);
router.put('/:slug', isLoggedIn, isAdmin, /*createProductValidation, runValidation,*/ updateSingleProduct);
router.delete('/:slug', isLoggedIn, isAdmin, deleteSingleProducts);

export default router;