const TAGTASK = {
  uuid: '22321lj-dfdsf-dsfsdfs-3213-323212',
  taskID: 1,
  taskUUID: '22321lj-dfdsf-dsfsdfs-3213-323212',
  tagID: 2,
  tagUUID: '22321lj-dfdsf-dsfsdfs-3213-323212'
}

let TAGSTASK = [TAGTASK]

export class MocktagtaskRepository {
  getAll = async (uuidTask) => {
    return TAGSTASK
  }

  findOne = async (uuid) => {
    return TAGSTASK.filter((TAGTASK) => TAGSTASK.uuid === uuid)
  }

  createOne = async (tagtask) => {
    TAGSTASK.push(tagtask)
    return tagtask
  }

  deleteOne = async (uuid) => {
    const TAGSTASKFILTERED = TAGSTASK.filter((USER) => USER.uuid !== uuid)
    TAGSTASK = TAGSTASKFILTERED
    return uuid
  }
}
