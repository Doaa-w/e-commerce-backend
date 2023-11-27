import {check , ValidationChain} from 'express-validator'

export const categoryValidations: ValidationChain[] =[
check('name')
.trim()
.notEmpty()
.withMessage('provid name for the category')
]

export const createProductValidation: ValidationChain[] =[
check('name')
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
check('category')
.trim()
.notEmpty()
.withMessage('provid a category')
.isMongoId()
.withMessage('ID is not correct'),
]

const updateProductValidation : ValidationChain[]=[
    check('name')
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
    check('category')
    .trim()
    .notEmpty()
    .withMessage('provid a category')
    .isMongoId()
    .withMessage('ID is not correct'), 
]

export const userValidation: ValidationChain[]=[
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
]