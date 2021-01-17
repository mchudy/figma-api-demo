import { Canvas, Client, Frame } from 'figma-js';

const client = Client({
  // For localhost only, never expose the token in a publicly-hosted app!
  personalAccessToken: process.env.REACT_APP_FIGMA_TOKEN,
});

const fileId = process.env.REACT_APP_FIGMA_FILE!;

export async function loadColorsFromFigma(): Promise<Record<string, string>> {
  const file = await client.file(fileId);

  const brandingCanvas = file.data.document.children.find(
    (c) => c.name === '🎨 Branding' && c.type === 'CANVAS'
  ) as Canvas;

  const colorsFrame = brandingCanvas.children.find(
    (node) => node.type === 'FRAME' && node.name === 'Colors'
  ) as Frame;

  const colorStyleDefinitions = Object.entries(file.data.styles)
    .filter(([_, style]) => style.styleType === 'FILL')
    .map(([id, style]) => ({ id, name: style.name }));

  return colorsFrame.children
    .map((node) => {
      if (node.type !== 'RECTANGLE') {
        return null;
      }

      if (!node.styles || !('fill' in node.styles)) {
        return null;
      }

      const styles = node.styles;
      const styleDefinition = colorStyleDefinitions.find(
        (definition) => definition.id === styles.fill
      );
      if (!styleDefinition) {
        return null;
      }

      const color = node.fills[0].color;
      if (!color) {
        return null;
      }

      return {
        name: styleDefinition.name,
        color: rgbToHex(color.r, color.g, color.b),
      };
    })
    .filter(notEmpty)
    .reduce(
      (obj, item) => ({
        ...obj,
        [item.name]: item.color,
      }),
      {}
    );
}

function componentToHex(c: number) {
  const hex = Math.round(c * 255).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
