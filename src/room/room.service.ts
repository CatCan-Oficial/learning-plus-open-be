import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseService from 'src/core/services/base.service';
import { SubjectService } from 'src/subject/subject.service';
import { UserRole } from 'src/user/enums/UserRole';
import { UserService } from 'src/user/user.service';
import { CreateRoomDto } from './dto/CreateRoomDto';
import { UpdateRoomDto } from './dto/UpdateRoomDto';
import { Room } from './schemas/Room';

@Injectable()
export class RoomService extends BaseService<Room, CreateRoomDto, UpdateRoomDto> {

	constructor(
		@Inject('ROOM_MODEL')
		model: Model<Room>,
		private readonly userService: UserService,
		private readonly subjectService: SubjectService
	) { super('Sala', model) }

	async create(dto: CreateRoomDto) {
		const documentToCreate: Partial<Room> = {
			name: dto.name,
			subject: await this.subjectService.findById(dto.subjectId),
			teacherId: await this.userService.findById(dto.teacherId)
		};

		const document = await this.model.create(documentToCreate as any);
		return document;
	}

	async findBySubjectId(subjectId: string) {
		const subjectDocument = await this.subjectService.findById(subjectId);

		return await this.model.find(<any>{
			'subject.name': subjectDocument.name
		});
	}

	async addStudent(id: string, studentId: string) {
		const document = await this.findById(id);
		const studentDocument = await this.userService.findById(studentId);

		if (studentDocument.role === UserRole.Student && !document.studentsIds.includes(studentId)) {
			document.studentsIds.push(studentDocument.id);
			await document.save();

			return `Estudante ${studentDocument.name} adicionado com sucesso à sala ${document.name}`;
		} else {
			throw new HttpException('Não foi possível adicionar o usuário à esta sala', HttpStatus.BAD_REQUEST);
		}
	}

	async removeStudent(id: string, studentId: string) {
		const document = await this.findById(id);
		const studentDocument = await this.userService.findById(studentId);

		if (document.studentsIds.includes(studentId)) {
			document.studentsIds.splice(document.studentsIds.indexOf(studentId), 1);

			await document.save();

			return `Estudante ${studentDocument.name} removido com sucesso da sala ${document.name}`;
		} else {
			throw new HttpException('Não foi possível remover o usuário desta sala', HttpStatus.BAD_REQUEST);
		}
	}
}
