import { TinyColor } from "@ctrl/tinycolor";

const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

export const getButtonConfig = (colors: string[]) => ({
  colorPrimary: `linear-gradient(135deg, ${colors.join(", ")})`,
  colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors).join(
    ", "
  )})`,
  colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors).join(
    ", "
  )})`,
  lineWidth: 0,
  paddingContentHorizontal: 40,
});
