export default function moveItem<T>(
  array: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  const newArray = [...array];
  const [moved] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, moved);
  return newArray;
}
