const USER = {
  id: 1,
  name: 'Mock de Prueba',
  email: 'user@mock.com',
  password: '$2b$10$pXt057X3HHCM6FVVFvk1keluTrjRexEuAV8eLtDtrdh92liGKdHLW',
  userType: 'Admin',
  uuid: 'e252e0f0-946c-480c-b969-25f8ed89ab4a',
}

let USERS = [USER]
export default class MockUserRepository {
  /**
   * Retrieves all users.
   * @param {Object} params - Additional parameters for filtering users (not used in this implementation).
   * @returns {Array} - Array of all users.
   */
  getAll = (params) => {
    return USERS
  }

  /**
   * Retrieves a single user by UUID.
   * @param {string} uuid - The UUID of the user to find.
   * @returns {Object|Error} - The found user object or an error if the user is not found.
   */
  findOne = async (uuid) => {
    const userFound = USERS.find((USER) => USER.uuid === uuid)

    if (userFound) {
      return userFound
    }

    return new Error('User not found')
  }

  /**
   * Creates a new user.
   * @param {Object} user - The user object to create.
   * @returns {Object|Error} - The created user object or an error if there was an unexpected error.
   */
  createOne = async (user) => {
    try {
      const { password, ...newUser } = user
      USERS.push({ id: USERS.length + 1, ...newUser })
      return newUser
    } catch (error) {
      return new Error('Unexpected error')
    }
  }

  /**
   * Updates a user by UUID.
   * @param {string} uuid - The UUID of the user to update.
   * @param {Object} fieldToUpdate - The fields to update on the user.
   * @returns {Object} - The updated user object.
   */
  updateOne = async (uuid, fieldToUpdate) => {
    const userToUpdate = USERS.find((USER) => USER.uuid === uuid)
    const userUpdated = Object.assign(userToUpdate, fieldToUpdate)
    return userUpdated
  }

  /**
   * Deletes a user by UUID.
   * @param {string} uuid - The UUID of the user to delete.
   * @returns {string} - The UUID of the deleted user.
   */
  deleteOne = async (uuid) => {
    const USERSFILTER = USERS.filter((USER) => USER.uuid !== uuid)
    USERS = USERSFILTER
    return uuid
  }
}
