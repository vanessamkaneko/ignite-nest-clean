import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions.repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers.repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments.repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments.repository";
import { IQuestionsRepository } from "@/domain/forum/application/repositories/IQuestions.repository";
import { IStudentsRepository } from "@/domain/forum/application/repositories/IStudents.repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students.repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments.repository";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments.repository";
import { IQuestionCommentsRepository } from "@/domain/forum/application/repositories/IQuestionComments.repository";
import { IQuestionAttachmentsRepository } from "@/domain/forum/application/repositories/IQuestionAttachments.repository";
import { IAnswerCommentsRepository } from "@/domain/forum/application/repositories/IAnswerComments.repository";
import { IAnswerAttachmentsRepository } from "@/domain/forum/application/repositories/IAnswerAttachments.repository";
import { IAnswersRepository } from "@/domain/forum/application/repositories/IAnswers.repository";
import { IAttachmentsRepository } from "@/domain/forum/application/repositories/IAttachments-repository";
import { PrismaAttachmentsRepository } from "./prisma/repositories/prisma-attachments.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: IQuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: IStudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: IQuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository
    },
    {
      provide: IQuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository
    },
    {
      provide: IAnswersRepository,
      useClass: PrismaAnswersRepository
    },
    {
      provide: IAnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: IAnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: IAttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    }
  ],
  exports: [
    PrismaService,
    IQuestionsRepository,
    IStudentsRepository,
    IQuestionCommentsRepository,
    IQuestionAttachmentsRepository,
    IAnswersRepository,
    IAnswerCommentsRepository,
    IAnswerAttachmentsRepository,
    IAttachmentsRepository
  ]
})
export class DatabaseModule { }

/* um provider fica disponível apenas no módulo que foi declarado... Por ex., no caso o PrismaService
estaria disponível só p/ o Database Module, p/ que fique disponível p/ os módulos que importam o Database Module,
é preciso colocar o PrismaService no exports */