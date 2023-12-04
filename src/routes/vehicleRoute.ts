import express from 'express'
import { regVehicle } from '../controllers'
import multer from 'multer'

export const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/images')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/register', upload.single('file'), regVehicle)