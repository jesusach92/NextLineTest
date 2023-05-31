export default class TagController {
  constructor(tagUseCases) {
    this.tagUseCases = tagUseCases
  }

  /**
   * Retrieves all tags.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} The response containing the tags.
   */
  getTags = async (req, res) => {
    const tags = await this.tagUseCases.getTags(req.query)
    if (tags instanceof Error) return res.status(404).json(tags.message)
    return res.status(200).json(tags)
  }

  /**
   * Retrieves a specific tag by UUID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} The response containing the tag.
   */
  getTag = async (req, res) => {
    const tag = await this.tagUseCases.findTag(req.params.id)
    if (tag instanceof ReferenceError) return res.status(404).json(tag.message)
    return res.status(200).json(tag)
  }

  /**
   * Creates a new tag.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} The response containing the created tag.
   */
  createTag = async (req, res) => {
    const tag = await this.tagUseCases.createTag(req.body)
    if (tag instanceof Error) return res.status(400).json(tag.message)
    return res.status(201).json(tag)
  }

  /**
   * Deletes a tag by UUID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} The response containing the deleted tag.
   */
  deleteTag = async (req, res) => {
    const tagDeleted = await this.tagUseCases.deleteTag(req.params.id)
    if (tagDeleted instanceof Error)
      return res.status(400).json(tagDeleted.message)
    return res.status(200).json(tagDeleted)
  }

  /**
   * Updates a tag by UUID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} The response containing the updated tag.
   */
  updateTag = async (req, res) => {
    const updatedTag = await this.tagUseCases.updateTag({
      uuid: req.params.id,
      ...req.body,
    })
    return res.status(200).json(updatedTag)
  }
}
