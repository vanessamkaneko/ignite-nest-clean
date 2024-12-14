import { BadRequestException, Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { DeleteQuestionUseCase } from "@/domain/forum/application/usecases/delete-question.usecase";

const deleteQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string()
})

const bodyValidationPipe = new ZodValidationPipe(deleteQuestionBodySchema)

type DeleteQuestionBodySchema = z.infer<typeof deleteQuestionBodySchema>

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(
    private deleteQuestion: DeleteQuestionUseCase
  ) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteQuestion.execute({
      authorId: userId,
      questionId
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}