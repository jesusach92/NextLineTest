export class TagController {
  constructor(tagUseCases) {
    this.tagUseCases = tagUseCases
  }

  getTags = async (req, res) => {
    console.log(req.userSession)
    const tags = await this.tagUseCases.getTags(req.query)
    return res.status(200).json(tags)
  }

  getTag = async (req, res) => {
    const tag = await this.tagUseCases.findTag(req.params.id)
    return res.status(200).json(tag)
  }

  createTag = async (req, res) => {
    const taguuid = await this.tagUseCases.createTag(req.body)
    return res.status(201).json(taguuid)
  }

  deleteTag = async (req, res) => {
    const tagDeleted = await this.tagUseCases.deleteTag(req.params.id)
    return res.status(200).json(tagDeleted)
  }

  updateTag = async (req, res) => {
    const updatedtag = await this.tagUseCases.updateTag(req.body)
    return res.status(200).json(updatedtag)
  }
}
