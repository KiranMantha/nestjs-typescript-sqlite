import { Questionnaire } from '@entities/questionnaire';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';

describe('questionnaire', () => {
  let controller: QuestionnaireController;
  let service: QuestionnaireService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaireController],
      providers: [
        {
          provide: QuestionnaireService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            delete: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Questionnaire),
          useClass: Repository
        }
      ]
    }).compile();

    controller = app.get<QuestionnaireController>(QuestionnaireController);
    service = app.get(QuestionnaireService);
  });

  it('should define controller', () => {
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('should call getAll method', () => {
      controller.index();

      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should call getAll method', () => {
      controller.getById(123);

      expect(service.getById).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call create method', () => {
      controller.create(null);

      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should call delete method', () => {
      controller.delete(123);

      expect(service.delete).toHaveBeenCalled();
    });
  });
});
