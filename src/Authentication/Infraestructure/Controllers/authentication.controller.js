export class AuthenticationController {
  constructor(AuthenticationUseCases) {
    this.AuthenticationUseCases = AuthenticationUseCases
  }

  logIn = async (req, res) => {
    const tokenSession = await this.AuthenticationUseCases.createSession(
      req.body
    )
    if (tokenSession instanceof Error)
      return res.status(400).json({ Message: 'Valida tus Credenciales ' })
    return res.status(200).json(tokenSession)
  }

  validateSession = async (req, res, next) => {
    const isValidSession = await this.AuthenticationUseCases.validateSession(
      req.headers.authorization
    )
    if (isValidSession instanceof Error)
      return res.status(403).json('No tienes una sesion valida')
    next()
  }

  logOut = async (req, res) => {
    const isClosedSession = await this.AuthenticationUseCases.deleteSession(
      req.headers.authorization
    )
    if (isClosedSession instanceof Error)
      return res.status(400).json('No se cerro la sesion')
    return res.status(200).json(isClosedSession)
  }
}
