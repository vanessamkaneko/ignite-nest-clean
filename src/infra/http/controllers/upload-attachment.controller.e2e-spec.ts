import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { StudentFactory } from "test/factories/make-student";

describe('Upload Attachments (E2E)', () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ // Creates a testing module that mimics the behavior of your application
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory]
    }).compile();

    app = moduleRef.createNestApplication(); // Creates a NestJS application instance from the compiled module

    // injeções de dependência
    studentFactory = moduleRef.get(StudentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init();
  });

  test('[POST] /attachments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/img_teste.png')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      attachmentId: expect.any(String)
    })
  })
})