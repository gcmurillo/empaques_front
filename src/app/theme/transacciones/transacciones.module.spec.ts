import { TransaccionesModule } from './transacciones.module';

describe('TransaccionesModule', () => {
  let transaccionesModule: TransaccionesModule;

  beforeEach(() => {
    transaccionesModule = new TransaccionesModule();
  });

  it('should create an instance', () => {
    expect(transaccionesModule).toBeTruthy();
  });
});
