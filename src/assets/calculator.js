/**
 * Basit, veri bağlantısı gerektirmeyen ayar / milyem hesabı.
 * Veri kaynağı, canlı fiyat, ağ isteği veya özel servis içermez.
 * Yaygın damga değerleri teorik hesap içindir; laboratuvar analizi değildir.
 */
export const FINENESS_BY_KARAT = Object.freeze({
  '8': 333,
  '9': 375,
  '10': 417,
  '14': 585,
  '18': 750,
  '21': 875,
  '22': 916,
  '24': 999,
});

/** Number veya Türkçe ondalık yazımını gram cinsine çevirir. */
export function parseGrams(input) {
  if (typeof input === 'number') {
    if (!Number.isFinite(input) || input <= 0 || input > 1000000) {
      throw new RangeError('Ağırlık 0 ile 1.000.000 gram arasında olmalıdır.');
    }
    return input;
  }
  const normalized = String(input).trim();
  if (!/^\d+(?:[.,]\d{1,4})?$/.test(normalized)) {
    throw new TypeError('Gram değerini örneğin 12,5 şeklinde girin. Binlik ayırıcı kullanmayın.');
  }
  const grams = Number(normalized.replace(',', '.'));
  if (!Number.isFinite(grams) || grams <= 0 || grams > 1000000) {
    throw new RangeError('Ağırlık 0 ile 1.000.000 gram arasında olmalıdır.');
  }
  return grams;
}

export function parseFineness(input) {
  const normalized = String(input).trim();
  if (!/^\d{1,4}$/.test(normalized)) {
    throw new TypeError('Milyem 1–1000 arasında tam sayı olmalıdır.');
  }
  const fineness = Number(normalized);
  if (!Number.isInteger(fineness) || fineness < 1 || fineness > 1000) {
    throw new RangeError('Milyem 1–1000 arasında tam sayı olmalıdır.');
  }
  return fineness;
}

export function calculateContent(grams, fineness) {
  const weight = parseGrams(grams);
  const purity = parseFineness(fineness);
  const fineGold = weight * purity / 1000;
  const remainder = weight - fineGold;
  return { grams: weight, fineness: purity, purityPercent: purity / 10, fineGold, remainder };
}

export function formatTr(value, digits = 4) {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}
