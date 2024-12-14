import { Student } from "../../enterprise/entities/student.entity";

// era uma interface...
export abstract class IStudentsRepository {
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}