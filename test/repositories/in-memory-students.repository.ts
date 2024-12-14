import { DomainEvents } from "@/core/events/domain-events";
import { IStudentsRepository } from "@/domain/forum/application/repositories/IStudents.repository";
import { Student } from "@/domain/forum/enterprise/entities/student.entity";

export class InMemoryStudentsRepository implements IStudentsRepository {
  public items: Student[] = []

  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email);

    if (!student) {
      return null
    }

    return student
  }
}