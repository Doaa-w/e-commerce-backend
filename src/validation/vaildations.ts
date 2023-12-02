import { check, ValidationChain } from 'express-validator';

export const categoryValidations: ValidationChain[] =[
check('name')
.trim()
.notEmpty()
.isLength({min: 2})
.withMessage('provid name for the category the name should be more than 2 characters')
]

export const createProductValidation: ValidationChain[] =[
check('title')
.trim()
.notEmpty()
.withMessage('provid name for the product') ,
check('description')
.trim()
.notEmpty()
.withMessage('provid description for the product'),
check('price')
.trim()
.notEmpty()
.withMessage('provid price for the product')
.isInt({ min:2})
.withMessage('must be a number') ,
check('image')
.notEmpty()
.withMessage('provid an image for the product'),
check('category')
.trim()
.notEmpty()
.withMessage('provid the category')
.isMongoId()
.withMessage('ID is not correct'),
check('sold')
.trim()
.notEmpty()
.optional()
]

export const updateProductValidation: ValidationChain[] = [
    check('title')
    .trim()
    .notEmpty()
    .withMessage('provid name for the product'),
    check('description')
    .trim()
    .notEmpty()
    .withMessage('provid description for the product'),
    check('price')
    .trim()
    .notEmpty()
    .withMessage('provid price for the product')
    .isInt({ min: 2 })
    .withMessage('must be a number'),
    check('category')
    .trim()
    .notEmpty()
    .withMessage('provid a category')
    .isMongoId()
    .withMessage('ID is not correct'), 
]

export const userValidation: ValidationChain[] = [
    check('first_name')
    .trim()
    .notEmpty()
    .withMessage('first name is required'),
    check('last_name')
    .trim()
    .notEmpty()
    .withMessage('last name is required'),
    check('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email adress is not correct pleass provid another email'),
    check('password')
    .trim()
    .notEmpty()
    .withMessage('passwoed is required')
    .isLength({min:5 })
    .withMessage('password must to be more than 5 characters')
]