export default function isEmpty(object: Record<any, any>): boolean {
  return Object.keys(object).length === 0 && object.constructor === Object;
}
