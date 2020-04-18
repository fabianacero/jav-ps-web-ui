import { QuoteStatusPipe } from './quote-status.pipe';

describe('QuoteStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new QuoteStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
