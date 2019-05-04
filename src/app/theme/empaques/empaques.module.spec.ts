import { EmpaquesModule } from './empaques.module';

describe('EmpaquesModule', () => {
  let empaquesModule: EmpaquesModule;

  beforeEach(() => {
    empaquesModule = new EmpaquesModule();
  });

  it('should create an instance', () => {
    expect(empaquesModule).toBeTruthy();
  });
});
