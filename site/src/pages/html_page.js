let Html = function view(props, content) {
  let isDevelopment = process.env.NODE_ENV !== "development";
  return (
    <html lang="en">
      <head>
        <title>Dragonglass</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {isDevelopment ? <link href="./css/main.css" rel="stylesheet" /> : v.inline.css().map(({ raw }) => <style>{raw}</style>)}
      </head>
      <body>
        {content}
        {v.inline.js().map(({ raw, map }) => (
          <script>
            {raw}
            {isDevelopment ? map : ""}
          </script>
        ))}
      </body>
    </html>
  );
};

module.exports = Html;
