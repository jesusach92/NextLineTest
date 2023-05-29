import { v4 } from 'uuid'

export class UUIDUtils {
  generate = () => {
    return v4()
  }
}