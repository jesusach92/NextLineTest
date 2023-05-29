const TASK = {
  id: '1',
  uuid: 'dsadsa-dsadsad-213cdsd-13cdsf-213322-dfdf',
  title: 'Tarea Prueba',
  description: 'Está es una tarea para Testing',
  status: 'PENDING',
  dueDate: '2023-05-20 22:07:41.437',
  isPublic: false,
  createdBy: 'e252e0f0-946c-480c-b969-25f8ed89ab4a',
}

export default class MockTaskRepository {
  getAll = async (params) => {
    const tasks = [TASK, TASK, TASK, TASK]
    return tasks
  }

  findOne = async (uuid) => {
    return TASK
  }

  createOne = async (task) => {
    return task
  }

  updateOne = async (uuid, fieldToUpdate) => {
    const updatedtask = Object.assign(TASK, fieldToUpdate)

    return updatedtask
  }

  deleteOne = async (uuid) => {
    return uuid
  }
}
