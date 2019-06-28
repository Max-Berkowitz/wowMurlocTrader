const sessionOrHome = req => req.url === '/' || req.session;

const checkLoggedIn = (req, res, next) => (sessionOrHome(req) ? next() : res.redirect('/'));

export { checkLoggedIn };
