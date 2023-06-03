const a = 1 + 2;
const b = a + 3;
const c = { apple: a, banana: b };
const d: { [key: string]: number } = { ...c, cauliflower: 7 };
const e = Object.keys(d);
const f: number[] = e.map((key) => d[key]);
console.log('f', f);
