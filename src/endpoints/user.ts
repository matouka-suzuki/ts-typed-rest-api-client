import { Request, Method } from '../request'
import {User} from '../responses/user'

interface Query {
  identifier: string
}

interface Header {
  "x-some-header-field": string
}

/**
 * GET /user
 * let r = new GetUser({identifier: xxx},{"x-some-header-field" : "aaa"})
 * r.call().then().catch()
 */
export class GetUser extends Request<Query, User.User, Headers> {

  path(): string {
    return "/user"
  }

  method(): Method {
    return "get"
  }

  params(): any {
    const {identifier} = this.query
    return {
      "user-identifier": identifier
    }
  }
}