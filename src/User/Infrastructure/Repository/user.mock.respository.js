
const USER = {
  id:1, 
  name:'Jesus', 
  email:'jesus@nextLine.com', 
  password: '12345', 
  userType: 'User'
}


export class MockUserReposiroty {


  
  getAll =  ({ params }) => {
    try {
      const Taks =  [USER,USER,USER]
      return Taks
    } catch (e) {
      throw new Error('Error Desconocido')
    }
  }

  findOne = async () => {}

  createOne =async(user) => 
  {
    try {  
      const {password, ...newUser} = user
      return newUser   
    } catch (error) {
      return new Error('Error Inesperado')
    }
  }

  updateOne = async () => {}

  deleteOne = async () => {}
}
