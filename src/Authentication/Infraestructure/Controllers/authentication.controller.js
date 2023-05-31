/**
 * This class represents the controller for authentication-related operations.
 * It handles login, session validation, and logout functionality.
 */

export default class AuthenticationController {
  constructor(AuthenticationUseCases) {
    this.AuthenticationUseCases = AuthenticationUseCases
  }

  /**
   * Handles the login operation.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - Returns the token session or an error if the credentials are invalid.
   */
  logIn = async (req, res) => {
    const tokenSession = await this.AuthenticationUseCases.createSession(
      req.body
    )
    if (tokenSession instanceof Error)
      return res.status(400).json({ Message: 'Valida tus Credenciales ' })
    return res.status(200).json(tokenSession)
  }

  /**
   * Handles the session validation operation.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next function to continue the request flow.
   */
  validateSession = async (req, res, next) => {
    const isValidSession = await this.AuthenticationUseCases.validateSession(
      req.headers.authorization
    )
    if (isValidSession instanceof Error)
      return res.status(403).json(isValidSession.message)
    req.userSession = {
      userUUID: isValidSession.userUUID,
      userType: isValidSession.userType,
    }
    next()
  }

  /**
   * Handles the logout operation.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - Returns a success message or an error if the session could not be closed.
   */
  logOut = async (req, res) => {
    const isClosedSession = await this.AuthenticationUseCases.deleteSession(
      req.headers.authorization
    )
    if (isClosedSession instanceof Error)
      return res.status(400).json(isClosedSession.message)
    return res.status(200).json(isClosedSession)
  }
}
