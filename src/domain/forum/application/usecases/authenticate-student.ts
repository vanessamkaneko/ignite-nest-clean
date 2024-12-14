import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { IStudentsRepository } from "../repositories/IStudents.repository"
import { HashComparer } from "../cryptography/hash-comparer"
import { Encrypter } from "../cryptography/encrypter"
import { WrongCredentialsError } from "./errors/wrong-credentials-error"

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<WrongCredentialsError, { accessToken: string }>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: IStudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) { }

  async execute({ email, password }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {

    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(password, student.password)

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    // gerando token c/ um payload que contém { sub: student.id.toString() }
    const accessToken = await this.encrypter.encrypt({ sub: student.id.toString() })

    return right({
      accessToken
    })
  }
}

/*  Fluxo de Autenticação no Projeto 
1. envio de uma requisição HTTP para uma rota protegida com um header como: Authorization: Bearer <jwt-token>
2. o guard verifica o token no header e internamente, o guard delega a validação do token ao JwtStrategy
3. JwtStrategy decodifica e valida o token JWT utilizando a chave secreta (JWT_PUBLIC_KEY); se o token for válido, 
extrai o payload (incluindo sub) e o associa ao objeto request.user
4. rotas protegidas podem acessar o usuário autenticado através de um decorator, como @CurrentUser, ou diretamente 
pelo request.user
*/
