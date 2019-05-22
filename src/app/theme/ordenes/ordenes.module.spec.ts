import { OrdenesModule } from './ordenes.module';

describe('OrdenesModule', () => {
  let ordenesModule: OrdenesModule;

  beforeEach(() => {
    ordenesModule = new OrdenesModule();
  });

  it('should create an instance', () => {
    expect(ordenesModule).toBeTruthy();
  });
});
