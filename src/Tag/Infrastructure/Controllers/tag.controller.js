export default class TagController {
  constructor(tagUseCases) {
    this.tagUseCases = tagUseCases
  }

  getTags = async (req, res) => {
    const tags = await this.tagUseCases.getTags(req.query)
    if (tags instanceof Error) return res.status(404).json(tags.message)
    return res.status(200).json(tags)
  }

  getTag = async (req, res) => {
    const tag = await this.tagUseCases.findTag(req.params.id)
    if (tag instanceof ReferenceError) return res.status(404).json(tag.message)
    return res.status(200).json(tag)
  }

  createTag = async (req, res) => {
    const tag = await this.tagUseCases.createTag(req.body)
    if (tag instanceof Error) return res.status(400).json(tag.message)
    return res.status(201).json(tag)
  }

  deleteTag = async (req, res) => {
    const tagDeleted = await this.tagUseCases.deleteTag(req.params.id)
    if (tagDeleted instanceof Error)
      return res.status(400).json(tagDeleted.message)
    return res.status(200).json(tagDeleted)
  }

  updateTag = async (req, res) => {
    const updatedtag = await this.tagUseCases.updateTag({
      uuid: req.params.id,
      ...req.body,
    })
    return res.status(200).json(updatedtag)
  }
}
