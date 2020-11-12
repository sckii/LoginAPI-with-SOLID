import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import Logged from '../models/logged'
import { Profile } from '../models/profile'
import User from '../models/users'

export default {
  async create(req: Request, res: Response) {
    const {
      description,
      currentTime,
      userId
    } = req.body

    const profileRepository = getRepository(Profile)

    const profile = profileRepository.create({
      currentTime,
      description,
      userId
    })

    await profileRepository.save(profile)
    return res.json(profile)
  },

  async index(req: Request, res: Response) {
    const {
      token,
    } = req.body

    if(token === null) return false

    const loggedRepository = getRepository(Logged)

    const logged = await loggedRepository.findOneOrFail({
      token
    })
  
    if(logged.token.length > 0) {
      return res.json({userLogged: true, userId: logged.userId})
    } else return res.json({userLogged: false})

  },

  async getProfile(req: Request, res: Response) {
    const {
      token
    } = req.query

    
    const profileRepository = getRepository(Profile)
    const loggedRepository = getRepository(Logged)
    const userRepository = getRepository(User)
    
    const logged = await loggedRepository.findOneOrFail({
      token: `${token}`
    })
    
    const profile = await profileRepository.findOneOrFail({
      userId: logged.userId
    })
    
    const userName = await userRepository.findOneOrFail({
      id: logged.userId
    })

    return res.json({
      user: userName.username,
      description: profile.description
    })
  },

  async update(req: Request, res: Response) {
    const {
      token,
      description
    } = req.body

    const loggedRepository = getRepository(Logged)
    const profileRepository = getRepository(Profile)
  
    const logged = await loggedRepository.findOneOrFail({
      token: `${token}`
    })

    await profileRepository.update(
      { id: logged.profileId},
      { description: description }
    )
    
    return res.sendStatus(200)
  }
}