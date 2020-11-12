import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)

export default {
  passwordHash(passord: string) {
    const hash = bcrypt.hashSync(passord, salt)
  
    return hash
  },

  passwordCheck(passord: string, passwordHashed: string) {
    return bcrypt.compareSync(passord, passwordHashed)
  }
}