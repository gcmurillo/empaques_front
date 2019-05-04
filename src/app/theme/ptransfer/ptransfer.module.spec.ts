import { PtransferModule } from './ptransfer.module';

describe('PtransferModule', () => {
  let ptransferModule: PtransferModule;

  beforeEach(() => {
    ptransferModule = new PtransferModule();
  });

  it('should create an instance', () => {
    expect(ptransferModule).toBeTruthy();
  });
});
