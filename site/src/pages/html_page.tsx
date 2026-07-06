type InlineAsset = {
  raw: string;
  map?: string | null;
};

type HtmlProps = {
  assets: {
    css: InlineAsset[];
    js: InlineAsset[];
  };
  content: string;
  isDevelopment: boolean;
};

let Html = function view({ assets, content, isDevelopment }: HtmlProps) {
  return (
    <html lang="en">
      <head>
        <title>Dragonglass</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {isDevelopment ? <link href="/css/main.css" rel="stylesheet" /> : assets.css.map(({ raw }) => <style>{raw}</style>)}
      </head>
      <body v-html={content} />
    </html>
  );
};

export default Html;
