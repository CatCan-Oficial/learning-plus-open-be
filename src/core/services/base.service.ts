import { HttpException, HttpStatus } from '@nestjs/common';
import { Document, Model } from 'mongoose';

export default abstract class BaseService<MongooseModel extends Document, CreateDTO, UpdateDTO> {

	constructor(
		private objectName: string = 'objeto',
		protected readonly model: Model<MongooseModel>
	) { }

	async create(dto: CreateDTO): Promise<MongooseModel> {
		const document = await this.model.create(dto as any);

		if (document) {
			return document;
		} else {
			throw new HttpException(`Não foi possível criar ${this.objectName.toLowerCase()}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(_id: string, dto: UpdateDTO): Promise<MongooseModel> {
		await this.findById(_id);
		await this.model.updateOne(<any>{ _id }, dto)

		return await this.findById(_id);
	}

	async list(): Promise<MongooseModel[]> {
		const documents = await this.model.find();
		return documents;
	}

	async findById(id: string): Promise<MongooseModel> {
		const document = await this.model.findById(id);

		if (document)
			return document;
		else
			throw new HttpException(`Não foi possível encontrar ${this.objectName.toLowerCase()}`, HttpStatus.BAD_REQUEST);
	}

	async deleteById(id: string): Promise<void> {
		const document = await this.findById(id);
		await this.model.findByIdAndDelete(document.id);
	}
}
