import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { InvalidAttachmentType } from "./errors/invalid-attachment-type"
import { Attachment } from "../../enterprise/entities/attachment.entity"
import { IAttachmentsRepository } from "../repositories/IAttachments-repository"
import { Uploader } from "../storage/uploader"

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentUseCaseResponse = Either<InvalidAttachmentType, { attachment: Attachment }>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: IAttachmentsRepository,
    private uploader: Uploader
  ) { }

  async execute({ fileName, fileType, body }: UploadAndCreateAttachmentUseCaseRequest):
   Promise<UploadAndCreateAttachmentUseCaseResponse> {

    // regex to validate mimetype of jpg, pdf, png e jpeg -> se não for desses formatos...
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentType(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body
    })


    const attachment = Attachment.create({
      title: fileName,
      url
    })

    await this.attachmentsRepository.create(attachment)

    return right({ attachment })
  }
}
