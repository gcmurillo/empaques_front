import { ConfirmacionesModule } from './confirmaciones.module';

describe('ConfirmacionesModule', () => {
  let confirmacionesModule: ConfirmacionesModule;

  beforeEach(() => {
    confirmacionesModule = new ConfirmacionesModule();
  });

  it('should create an instance', () => {
    expect(confirmacionesModule).toBeTruthy();
  });
});
