import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['warn', 'error']
    })
  }

  // Nest chama esses métodos automaticamente qnd um módulo que usa o PrismaService for instanciado ou distruído
  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
   return this.$disconnect()
  }
}