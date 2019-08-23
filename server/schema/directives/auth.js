import {
  SchemaDirectiveVisitor,
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from 'apollo-server-express'
import { defaultFieldResolver } from "graphql"

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (root, args, context, info) => {

      // console.log(this.args)

      // if (!context || !context.headers) {
      //   throw new AuthenticationError('User not authenticated')
      // }

      return await resolve.apply(this, [root, args, context, info])
    }
  }
}

export default AuthDirective