import { SowingModule } from './sowing.module';

describe('SowingModule', () => {
  let sowingModule: SowingModule;

  beforeEach(() => {
    sowingModule = new SowingModule();
  });

  it('should create an instance', () => {
    expect(sowingModule).toBeTruthy();
  });
});
