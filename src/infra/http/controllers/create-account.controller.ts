import { Body, Controller, Post, ConflictException, HttpCode, UsePipes, BadRequestException } from "@nestjs/common";
import { z } from 'zod'
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { RegisterStudentUseCase } from "@/domain/forum/application/usecases/register-student";
import { StudentAlreadyExistsError } from "@/domain/forum/application/usecases/errors/student-already-exists-error";
import { Public } from "@/infra/auth/public";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerStudent.execute({
      name, email, password
    })

    if (result.isLeft()) {
      const error = result.value

      // qual classe originou o erro?
      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message) // status 409
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}