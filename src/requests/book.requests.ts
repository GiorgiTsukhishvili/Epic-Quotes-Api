import { body } from 'express-validator'

export const bookStoreRequest = [
  body('nameKa').notEmpty().withMessage('Name (ka) is required'),
  body('nameEn').notEmpty().withMessage('Name (en) is required'),
  body('tags').notEmpty().withMessage('Tags are required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('authorKa').notEmpty().withMessage('Author (ka) is required'),
  body('authorEn').notEmpty().withMessage('Author (en) is required'),
  body('descriptionKa').notEmpty().withMessage('Description (ka) is required'),
  body('descriptionEn').notEmpty().withMessage('Description (en) is required'),
  body('image').custom((_, { req }) => {
    if (!req.file) {
      throw new Error('Profile image is required')
    }
    return true
  }),
  body('budget').notEmpty().withMessage('Budget is required'),
]

export const bookUpdateRequest = [
  body('image').custom((value, { req }) => {
    if (typeof value === 'string') {
      return true
    }
    if (!req.file) {
      throw new Error('Profile image is required')
    }

    return true
  }),
  body('nameKa').notEmpty().withMessage('Name (ka) is required'),
  body('nameEn').notEmpty().withMessage('Name (en) is required'),
  body('tags').notEmpty().withMessage('Tags are required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('authorKa').notEmpty().withMessage('Author (ka) is required'),
  body('authorEn').notEmpty().withMessage('Author (en) is required'),
  body('descriptionKa').notEmpty().withMessage('Description (ka) is required'),
  body('descriptionEn').notEmpty().withMessage('Description (en) is required'),
]
