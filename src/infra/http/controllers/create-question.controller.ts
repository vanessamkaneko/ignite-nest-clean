import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateQuestionUseCase } from "@/domain/forum/application/usecases/create-question";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid())
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionController {
  constructor(
    private createQuestion: CreateQuestionUseCase
  ) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateQuestionBodySchema, @CurrentUser() user: UserPayload) {
    const { title, content, attachments } = body
    const userId = user.sub

    this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments
    })
  }
}