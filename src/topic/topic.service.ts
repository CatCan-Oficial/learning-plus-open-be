import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseService from 'src/core/services/base.service';
import { CreateTopicDto } from './dto/CreateTopicDto';
import { UpdateTopicDto } from './dto/UpdateTopicDto';
import { Topic } from './schemas/Topic';

@Injectable()
export class TopicService extends BaseService<Topic, CreateTopicDto, UpdateTopicDto> {

	constructor(
		@Inject('TOPIC_MODEL')
		model: Model<Topic>
	) { super('Tópico', model) }
}
