import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceMeshController } from './performance-mesh.controller';

describe('PerformanceMesh Controller', () => {
  let controller: PerformanceMeshController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformanceMeshController],
    }).compile();

    controller = module.get<PerformanceMeshController>(PerformanceMeshController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
