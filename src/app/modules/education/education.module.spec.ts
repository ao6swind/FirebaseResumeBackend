import { EducationModule } from './education.module';

describe('EducationModule', () => {
  let educationModule: EducationModule;

  beforeEach(() => {
    educationModule = new EducationModule();
  });

  it('should create an instance', () => {
    expect(educationModule).toBeTruthy();
  });
});
