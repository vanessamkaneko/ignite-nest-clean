import { DomainEvents } from "@/core/events/domain-events";
import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing'
import { Domain } from "node:domain";
import request from 'supertest'
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";
import { waitFor } from "test/utils/wait-for";

describe('On Answer Created (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ // Creates a testing module that mimics the behavior of your application
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory]
    }).compile();

    app = moduleRef.createNestApplication(); // Creates a NestJS application instance from the compiled module

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    DomainEvents.shouldRun = true

    await app.init();
  });

  it('should send a notification when answer is created', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id
    })

    const questionId = question.id.toString()

     await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New answer',
        attachments: []
      })

      await waitFor(async () => {
        const notificationOnDatabase = await prisma.notification.findFirst({
          where: {
            recipientId: user.id.toString()
          }
        })

        expect(notificationOnDatabase).not.toBeNull()
      })
  })
})