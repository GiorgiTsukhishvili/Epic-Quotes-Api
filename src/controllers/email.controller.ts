import { Request, Response } from 'express'
import { Email } from '../models/email.model'
import { transporter } from '../config/nodemailer'
import { verificationEmailTemplate } from '../templates/verification-email.template'
import { emailTranslations } from '../translations/email'
import logger from '../config/winston'
import redisClient from '../config/redis'
import { HttpRequests } from '../enums/httpRequests.enum'

export const addEmail = async (req: Request, res: Response) => {
  try {
    const user = req.user as { userId: string; name: string }

    const email = req.body.email

    const lang: 'ka' | 'en' = req.body.lang ?? 'en'

    const verificationToken = crypto.randomUUID()

    await Email.create(email, +user.userId)

    await redisClient.set(verificationToken, email, { EX: 1800, NX: true })

    // Generate a temporary signed URL for email verification (30 minutes expiration)
    const baseUrl = `${process.env.FRONT_URL}/${lang}`
    const verificationLink = new URL(baseUrl)

    verificationLink.searchParams.append(
      'register-link',
      `${process.env.APP_URL}/api/v1/verify/${verificationToken}`
    )

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Verification',
      html: verificationEmailTemplate(
        lang,
        verificationLink,
        user.name,
        emailTranslations[lang]['email-verification-text'],
        emailTranslations[lang]['email-verify-button'],
        emailTranslations[lang]['email-verification']
      ),
    })

    res
      .status(HttpRequests.HTTP_CREATED)
      .json({ message: 'Email was add successfully' })
  } catch (err) {
    logger.error(err)
    res.status(HttpRequests.HTTP_OK).send('Could not add email')
  }
}

export const makeEmailPrimary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Email.makePrimary(+id)

    res.status(HttpRequests.HTTP_OK).json({ message: 'Email was made primary' })
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_OK)
      .send(
        (err as { message: string }).message ?? 'Could not make email primary'
      )
  }
}

export const deleteEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Email.delete(+id)

    res.status(HttpRequests.HTTP_OK).json({ message: 'Email was deleted' })
  } catch (err) {
    logger.error(err)
    res.status(HttpRequests.HTTP_OK).send('Could not fetch email')
  }
}
