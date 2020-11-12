import { Router } from 'express'
import userAddControllers from './controllers/userAddControllers'
import userLoginController from './controllers/userLoginController'
import userProfileController from './controllers/userProfileController'

const routes = Router()

//userAdd
routes.post('/user', userAddControllers.create)

//logged?
routes.post('/login', userLoginController.login)
routes.delete('/logout', userLoginController.delete)

//profile
routes.post('/profile', userProfileController.create)
routes.post('/logged', userProfileController.index)
routes.get('/profile', userProfileController.getProfile)
routes.put('/profile', userProfileController.update)


export default routes