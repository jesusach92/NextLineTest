export class TagTaskController {
  constructor(tagtaskUseCases) {
    this.tagtaskUseCases = tagtaskUseCases
  }

  getTagsTask = async (req, res) => {
    const tagtasks = await this.tagtaskUseCases.getTagsofATasks(req.params.id)
    if (tagtasks instanceof Error)
      return res.status(404).json({
        Message: `No se encontraron Etiquetas de la Tarea :  ${req.params.id}`
      })
    return res.status(200).json(tagtasks)
  }

  createOne = async (req, res, next) => {
    const tagtask = await this.tagtaskUseCases.createtagtask(req.body)
    if (tagtask instanceof Error)
      return res.status(400).json('No se logro Agregar la Etiqueta a La Tarea')
    return res.status(200).json(tagtask)
  }

  deleteOne = async (req, res) => {
    const tagtaskDeleted = await this.tagtaskUseCases.deletetagtask(
      req.params.id
    )
    if (tagtaskDeleted instanceof Error)
      return res.status(400).json('No se logro Quitar la Etiqueta a La Tarea')
    return res.status(200).json(tagtaskDeleted)
  }
}
