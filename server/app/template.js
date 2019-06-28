export default html =>
  `<!DOCTYPE html>
<html lang="en">  
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="Description" content="Help with the wow murloc traders">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Wow Murloc Trader</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script type="text/javascript" src="dist/bundle.js"></script>
    </body>
</html>`;
