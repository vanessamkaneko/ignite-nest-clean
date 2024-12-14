import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserPayload } from "./jwt.strategy";

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  }
)

/* - JwtStrategy - configurado como um provider no AuthModule - valida token enviado na requisição, payload do token é 
decodificado e associado ao request.user;
- No caso a propriedade sub - que usualmente é definido p/ carregar o id do usuário - ficará disponível p/ ser usada
*/