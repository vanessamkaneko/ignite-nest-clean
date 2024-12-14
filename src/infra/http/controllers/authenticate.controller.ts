import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { z } from 'zod'
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/usecases/authenticate-student";
import { WrongCredentialsError } from "@/domain/forum/application/usecases/errors/wrong-credentials-error";
import { Public } from "@/infra/auth/public";

// defines the structure and validation rules for the data
const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})

// creates a TypeScript type based on the schema -> this step is needed because TypeScript expects a type or interface in method parameters
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(
    private authenticateStudent: AuthenticateStudentUseCase
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema)) // valida as infos recebidas de acordo c/ o schema
  async handle(@Body() body: AuthenticateBodySchema) {

    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password
    })

    if (result.isLeft()) {
      const error = result.value

      // qual classe originou o erro?
      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message) // status 401
        default:
          throw new BadRequestException(error.message) // status 400
      } 
    }

    const { accessToken } = result.value

    return { access_token: accessToken }
  }
}