import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import Logged from '../models/logged'
import { Profile } from '../models/profile'
import User from '../models/users'
import passwordValidations from '../utils/passwordValidations'
import tokenCreation from '../utils/tokenCreation'

export default {
  async login(req: Request, res: Response) {
    const {
      username,
      password
    } = req.body

    const usernameRepository = getRepository(User)
    const loggedRepostitoty = getRepository(Logged)
    const profileReposiory = getRepository(Profile)

    
    const token = tokenCreation.create()

    const user = await usernameRepository.find({
      username
    })
    
    if(user.length === 0) {return ( 
      res.json({ usernameCheck: false })
    )}
    user.map( async data => {
      if(data.username.includes(username)) {
        const passwordValidate = passwordValidations.passwordCheck(password, data.password)

        if(passwordValidate) {
          const profile = await profileReposiory.findOneOrFail({
            userId: data.id
          })

          const profileId = profile.id

          const logged = loggedRepostitoty.create({
            currentTime: new Date().getTime(),
            profileId,
            userId: data.id,
            token: token
          })

          await loggedRepostitoty.save(logged)

          return res.json({ token: token })
        } else return res.json({ passwordCheck: false })
      }
    })
  },

  async delete(req: Request, res: Response){
    const {
      id
    } = req.query

    const loggedRepostitoty = getRepository(Logged)

    const converted = parseInt(`${id}`)

    const logged = await loggedRepostitoty.findOneOrFail({
      userId: converted
    })

    await loggedRepostitoty.delete(logged)

    return res.json({ logout : logged.token})
  }
}