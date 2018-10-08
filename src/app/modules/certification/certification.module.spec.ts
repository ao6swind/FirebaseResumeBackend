import { CertificationModule } from './certification.module';

describe('CertificationModule', () => {
  let certificationModule: CertificationModule;

  beforeEach(() => {
    certificationModule = new CertificationModule();
  });

  it('should create an instance', () => {
    expect(certificationModule).toBeTruthy();
  });
});
