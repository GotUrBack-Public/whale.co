import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getMembershipPreview } from '../src/features/membership/model/tiers.ts';

test('rejects missing, negative, non-numeric and non-finite holdings', () => {
  for (const input of ['', ' ', '-1', 'abc', 'Infinity', 'NaN', '1e999']) {
    assert.equal(getMembershipPreview(input), null, input);
  }
});
test('selects the correct tier at every proposed holding boundary', () => {
  for (const [input, tier, multiplier] of [
    ['0', 'silver', 1], ['499.99', 'silver', 1],
    ['500', 'gold', 1.5], ['2499.99', 'gold', 1.5],
    ['2500', 'black', 2], ['100000', 'black', 2],
  ]) {
    const result = getMembershipPreview(input);
    assert.equal(result?.id, tier, input);
    assert.equal(result?.multiplier, multiplier, input);
  }
});
