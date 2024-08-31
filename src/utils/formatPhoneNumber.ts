// type Phone = {
//   phone: string
// }

export const formatPhoneNumber = (phone: string) => {
  const numberArray = phone
    .split(' x')[0]
    .replace(/[.()]/g, '')
    .replace(/\s+/g, '')
    .split('-')
    .join('')
    .split('')
  
  if (numberArray.length === 10) {
    return [...numberArray[0], '-', ...numberArray.slice(1, 4), '-',
    ...numberArray.slice(4, 7), '-', ...numberArray.slice(7, 10)].join('')
  }
  if ((numberArray.length === 11)) {
    return [...numberArray[0], '-', ...numberArray.slice(1, 4), '-',
    ...numberArray.slice(4, 7), '-', ...numberArray.slice(7, 11)].join('')
   }
  };