import { PoolModule } from './pool.module';

describe('PoolModule', () => {
  let poolModule: PoolModule;

  beforeEach(() => {
    poolModule = new PoolModule();
  });

  it('should create an instance', () => {
    expect(poolModule).toBeTruthy();
  });
});
