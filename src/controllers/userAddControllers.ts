import { error } from 'console'
import {Request, Response} from 'express'
import { getRepository, Not } from 'typeorm'
import Logged from '../models/logged'
import { Profile } from '../models/profile'
import User from '../models/users'
import passwordValidations from '../utils/passwordValidations'
import tokenCreation from '../utils/tokenCreation'

export default {
  async create(req: Request, res: Response) {
    const {
      username,
      email,
      password,
      currentTime,
    } = req.body

    
    const passwordHashed = passwordValidations.passwordHash(password)
    
    const usernameRepository = getRepository(User)
    const profileRepository = getRepository(Profile)
    const loggedRepository = getRepository(Logged)

    const token = tokenCreation.create()
    
    const userFind = await usernameRepository.findOne({
      username: username,
    })
    const emailFind = await usernameRepository.findOne({
      email: email,
    })

    if(userFind) {
      return res.json({ usernameExist: true })
    }
    if(emailFind) {
      return res.json({ emailExist: true })
    }

    const user = usernameRepository.create({
      username,
      email,
      password: passwordHashed,
      currentTime,
    })

    await usernameRepository.save(user)

    const idFind = await usernameRepository.findOneOrFail({
      email: email,
    })
    const userId = idFind.id

    const profileAdd = profileRepository.create({
      description: " ",
	    currentTime: new Date().getTime(),
	    userId
    })

    await profileRepository.save(profileAdd)

    const profile = await profileRepository.findOneOrFail({
      userId: userId
    })

    const profileId = profile.userId

    const logged = loggedRepository.create({
      currentTime: new Date().getTime(),
      profileId,
      userId,
      token: token
    })

    await loggedRepository.save(logged)
    
    return res.json({ 
      userCreated: true,
      token: token
    })

  }
}