export function capitalizeFirstLetter(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export function percentage(value: number, maxValue: number) {
	if (value == 0 || maxValue == 0)
		return 0;

	const percentage = (value / maxValue) * 100;
	return percentage;
}

export function hasDuplicates(array: any[]) {
	return (new Set(array)).size !== array.length;
}

export function XOR(x: any, y: any) {
	return (x || y) && !(x && y);
}

export function sumMapValues(previous: Map<string, number>, current: Map<string, number>, isAverage = false) {
	const sumMap = new Map<string, number>();

	previous.forEach((value, key) => {
		const currentValue = current.get(key);
		const newValue = value + currentValue;

		sumMap.set(key, isAverage ? newValue / 2 : newValue);
	});

	return sumMap;
}

export function fromMap(map: Map<any, any>) {
	return Array.from(map.entries()).reduce((main, [key, value]) => ({ ...main, [key]: value }), {}) as any;
}