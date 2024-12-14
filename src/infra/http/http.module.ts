import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { DatabaseModule } from "../database/database.module";
import { CreateQuestionUseCase } from "@/domain/forum/application/usecases/create-question";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/usecases/fetch-recent-questions";
import { RegisterStudentUseCase } from "@/domain/forum/application/usecases/register-student";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/usecases/authenticate-student";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { GetQuestionBySlugController } from "./controllers/get-question-by-slug.controller";
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/usecases/get-question-by-slug.usecase";
import { EditQuestionController } from "./controllers/edit-question.controller";
import { EditQuestionUseCase } from "@/domain/forum/application/usecases/edit-question.usecase";
import { DeleteQuestionController } from "./controllers/delete-question.controller";
import { DeleteQuestionUseCase } from "@/domain/forum/application/usecases/delete-question.usecase";
import { AnswerQuestionController } from "./controllers/answer-question.controller";
import { AnswerQuestionUseCase } from "@/domain/forum/application/usecases/answer-question.usecase";
import { EditAnswerController } from "./controllers/edit-answer.controller";
import { EditAnswerUseCase } from "@/domain/forum/application/usecases/edit-answer.usecase";
import { DeleteAnswerController } from "./controllers/delete-answer.controller";
import { DeleteAnswerUseCase } from "@/domain/forum/application/usecases/delete-answer.usecase";
import { FetchQuestionAnswersController } from "./controllers/fetch-question-answers.controller";
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/usecases/fetch-question-answers";
import { ChooseQuestionBestAnswerController } from "./controllers/choose-question-best-answer.controller";
import { ChooseQuestionBestAnswerUseCase } from "@/domain/forum/application/usecases/choose-question-best-answer";
import { CommentOnQuestionController } from "./controllers/comment-on-question.controller";
import { CommentOnQuestionUseCase } from "@/domain/forum/application/usecases/comment-on-question";
import { DeleteQuestionCommentUseCase } from "@/domain/forum/application/usecases/delete-question-comment";
import { DeleteQuestionCommentController } from "./controllers/delete-question-comment.controller";
import { CommentOnAnswerController } from "./controllers/comment-on-answer.controller";
import { CommentOnAnswerUseCase } from "@/domain/forum/application/usecases/comment-on-answer";
import { DeleteAnswerCommentController } from "./controllers/delete-answer-comment.controller";
import { DeleteAnswerCommentUseCase } from "@/domain/forum/application/usecases/delete-answer-comment";
import { FetchQuestionCommentsController } from "./controllers/fetch-question-comments.controller";
import { FetchQuestionCommentsUseCase } from "@/domain/forum/application/usecases/fetch-question-comments";
import { FetchAnswerCommentsController } from "./controllers/fetch-answer-comments.controller";
import { FetchAnswerCommentsUseCase } from "@/domain/forum/application/usecases/fetch-answer-comments";
import { UploadAttachmentController } from "./controllers/upload-attachment.controller";
import { StorageModule } from "../storage/storage.module";
import { UploadAndCreateAttachmentUseCase } from "@/domain/forum/application/usecases/upload-and-create-attachment";

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    StorageModule
  ],
  controllers: [
    CreateAccountController, 
    AuthenticateController, 
    CreateQuestionController, 
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionCommentsUseCase,
    FetchAnswerCommentsUseCase,
    UploadAndCreateAttachmentUseCase
  ]
})
export class HttpModule {}