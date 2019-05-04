import { CycleModule } from './cycle.module';

describe('CycleModule', () => {
  let cycleModule: CycleModule;

  beforeEach(() => {
    cycleModule = new CycleModule();
  });

  it('should create an instance', () => {
    expect(cycleModule).toBeTruthy();
  });
});
