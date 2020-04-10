import { CryptPipe } from './crypt.pipe';

describe('CryptPipe', () => {
  it('create an instance', () => {
    const pipe = new CryptPipe();
    expect(pipe).toBeTruthy();
  });
});
