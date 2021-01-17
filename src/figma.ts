import { Client } from 'figma-js';

console.log(process.env);

const client = Client({
  // Never expose the token in a publicly-hosted app!
  personalAccessToken: process.env.REACT_APP_FIGMA_TOKEN,
});

const fileId = process.env.REACT_APP_FIGMA_FILE!;

export async function loadStylesFromFigma() {
  const file = await client.file(fileId);
  console.log(file.data.styles);

  const branding = file.data.document.children.find(
    (c) => c.name === '🎨 Branding'
  );
  console.log('branding', branding);

  const styles = await client.fileNodes(fileId, {
    ids: ['1:448'],
  });
  console.log(styles);
}
