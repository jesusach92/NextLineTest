const USER = {
  id: 1,
  name: 'Mock de Prueba',
  email: 'user@mock.com',
  password: '$2b$10$pXt057X3HHCM6FVVFvk1keluTrjRexEuAV8eLtDtrdh92liGKdHLW',
  userType: 'Admin',
  uuid: 'e252e0f0-946c-480c-b969-25f8ed89ab4a'
}

let USERS = [USER]
export class MockUserRepository {
  getAll = (params) => {
    return USERS
  }

  findOne = async (uuid) => {
    const userFound = USERS.find((USER) => USER.uuid === uuid)
    if (userFound) {
      return userFound
    }
    return new Error('Usuario no Encontrado')
  }

  createOne = async (user) => {
    try {
      const { password, ...newUser } = user
      USERS.push({ id: USERS.length + 1, ...newUser })
      return newUser
    } catch (error) {
      return new Error('Error Inesperado')
    }
  }

  updateOne = async (uuid, fieldToUpdate) => {
    const userToUpdate = USERS.find((USER) => USER.uuid === uuid)
    const userUpdated = Object.assign(userToUpdate, fieldToUpdate)
    return userUpdated
  }

  deleteOne = async (uuid) => {
    const USERSFILTER = USERS.filter((USER) => USER.uuid !== uuid)
    USERS = USERSFILTER
    return uuid
  }
}
