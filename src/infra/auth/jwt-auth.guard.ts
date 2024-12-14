import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "./public";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { // jwt pois está sendo usado o passport-jwt no jwt.strategy
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    
    return super.canActivate(context);
  }
} 

/* este código está buscando dentro do Metadata o IS_PUBLIC_KEY (arquivo public.ts), que se for true, retorna que o usuário
pode acessar a rota sem token (sendo uma rota pública que não precisa de autenticação)... */
