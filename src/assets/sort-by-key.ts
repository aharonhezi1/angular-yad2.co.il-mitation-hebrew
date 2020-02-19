export default function sortbykey(array, key, ascendingFactor = 1) {
  function compare(a, b) {
    if (key === 'updatedAt') {
      return (Date.parse(a[key]) > Date.parse(b[key])) ?
       1 * ascendingFactor : ((Date.parse(b[key]) > Date.parse(a[key])) ? -1 * ascendingFactor : 0);

    }
    return (a[key] > b[key]) ? 1 * ascendingFactor : ((b[key] > a[key]) ? -1 * ascendingFactor : 0);
  }
  return array.sort(compare)
}