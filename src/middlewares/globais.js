exports.csrvMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    console.log("csrf = " + req.csrfToken());
    next();
}

exports.getCsrf = (req, res) => {
    res.send(req.csrfToken());
    console.log("csrf = " + req.csrfToken());
}

exports.sessionMiddleware = (req, res, next) => {
    res.locals.usuario = req.session.usuario;
    res.locals.grupo = req.session.grupo;
    next();
}

exports.flashMsgsMiddleware = (req, res, next) => {
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    next();
}