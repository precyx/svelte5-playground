// utils/colors.ts
export const generateHSLColors = (count: number = 200): string[] => {
	const colors = [];
	for (let i = 0; i < count; i++) {
		const hue = Math.floor((360 / count) * i);
		const saturation = 70 + Math.floor(20 * Math.sin((i / count) * Math.PI * 2)); // 70–90%
		const lightness = 50 + Math.floor(10 * Math.cos((i / count) * Math.PI * 2)); // 40–60%
		colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
	}
	return colors;
};
