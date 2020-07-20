let Html = function view(props, content) {
  return <html lang="en">
    <head>
      <title>Dragonglass</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <link href="./css/main.css" rel="stylesheet"/>
    </head>
    <body>
      {content}
      <script src="./js/index.min.js" />
    </body>
  </html>;
};

export default Html;
