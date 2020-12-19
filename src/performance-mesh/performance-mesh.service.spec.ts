import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceMeshService } from './performance-mesh.service';

describe('PerformanceMeshService', () => {
  let service: PerformanceMeshService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerformanceMeshService],
    }).compile();

    service = module.get<PerformanceMeshService>(PerformanceMeshService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
