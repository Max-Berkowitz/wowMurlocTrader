export default html =>
  `<!DOCTYPE html>
<html lang="en">  
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="Description" content="A practice space for isomorphic web application architecture">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Isomorphic Practice</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script type="text/javascript" src="dist/bundle.js"></script>
    </body>
</html>`;
