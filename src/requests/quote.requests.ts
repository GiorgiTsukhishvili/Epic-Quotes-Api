import { body } from 'express-validator'

export const quoteStoreRequest = [
  body('id').notEmpty().withMessage('ID is required'),
  body('quoteEn').notEmpty().withMessage('English quote is required'),
  body('quoteKa').notEmpty().withMessage('Georgian quote is required'),
  body('image').custom((_, { req }) => {
    if (!req.file) {
      throw new Error('Profile image is required')
    }
    return true
  }),
]

export const quoteUpdateRequest = [
  body('id').notEmpty().withMessage('Quote Id is required'),
  ...quoteStoreRequest,
]
