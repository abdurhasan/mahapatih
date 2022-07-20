export function groupBy(
  objectArray: any[],
  property: string,
  objectReturn = true,
): any {
  if (!property) return objectArray;
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }

    if (objectReturn) {
      acc[key] = obj;
    } else {
      acc[key].push(obj);
    }

    return acc;
  }, {});
}
export function phoneNumberFormatter(number: string): string {
  let formatted = number.replace(/\D/g, '');

  if (formatted.startsWith('0')) {
    formatted = '62' + formatted.substr(1);
  }

  if (!formatted.endsWith('@c.us')) {
    formatted += '@c.us';
  }

  return formatted;
}
