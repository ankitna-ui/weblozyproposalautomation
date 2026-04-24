
export const getPasteColorFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use HSL for pastel colors (high lightness, low/med saturation)
  const h = Math.abs(hash) % 360;
  const s = 30 + (Math.abs(hash >> 8) % 30); // 30-60%
  const l = 93 + (Math.abs(hash >> 16) % 5);   // 93-98%
  
  return `hsl(${h}, ${s}%, ${l}%)`;
};
