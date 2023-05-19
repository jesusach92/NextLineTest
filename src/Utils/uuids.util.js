import { v4 } from 'uuid'

export class UUIDUtils {
  generateUUID = () => {
    return v4()
  }
}
