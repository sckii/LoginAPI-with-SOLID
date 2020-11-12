import User from '../models/users'

export default {
  render(user: User) {
    return {
      id: user.id,
    }
  }
}