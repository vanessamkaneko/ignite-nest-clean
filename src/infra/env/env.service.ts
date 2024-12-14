import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Env } from "./env";

/* Para buscar dados da variável de ambiente fazendo uso da tipagem... (antes da implementação desse arquivo,
 os tipos de valores das variáveis de ambiente não eram obtidos corretamente) */

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true })
  }
}