import test from 'node:test';
import assert from 'node:assert/strict';
import { FINENESS_BY_KARAT, parseGrams, parseFineness, calculateContent, formatTr } from '../src/assets/calculator.js';

const isClose = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);

test('8, 14, 18, 22, 24 ayar yaygın damga değerleri', () => {
  assert.deepEqual([8,14,18,22,24].map((n) => FINENESS_BY_KARAT[n]), [333,585,750,916,999]);
});
test('22 ayar 10 gram = 9,16 gram has', () => {
  const result = calculateContent('10', 916);
  isClose(result.fineGold, 9.16);
  isClose(result.remainder, .84);
  isClose(result.purityPercent, 91.6);
});
test('14 ayar 3,2 gram = 1,872 gram', () => {
  const result = calculateContent('3,2', 585);
  isClose(result.fineGold, 1.872);
  isClose(result.remainder, 1.328);
});
test('18 ayar 12,5 gram = 9,375 gram', () => {
  const result = calculateContent('12.5', 750);
  isClose(result.fineGold, 9.375);
});
test('özel milyem ve 1000 sınırı', () => {
  isClose(calculateContent('1', '1000').fineGold, 1);
  isClose(calculateContent('1', '1').fineGold, .001);
  assert.throws(() => parseFineness('1001'));
  assert.throws(() => parseFineness('0'));
  assert.throws(() => parseFineness('5.5'));
  assert.throws(() => parseFineness('abc'));
});
test('kütle doğrulama, Türkçe ondalık ve kötü değerler', () => {
  assert.equal(parseGrams('12,5'), 12.5);
  assert.equal(parseGrams('12.5'), 12.5);
  for (const value of ['0','-1','1.234,56','12x','abc','2e4','Infinity','1.12345','1000001','']) {
    assert.throws(() => parseGrams(value), value);
  }
});
test('Türkçe çıktı', () => {
  assert.equal(formatTr(9.16), '9,16');
  assert.equal(formatTr(7.6944), '7,6944');
});
