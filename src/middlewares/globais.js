exports.csrvMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    req.session.csrfToken = res.locals.csrfToken ;
    console.log("csrf = " + res.locals.csrfToken );
    next();
}

exports.getCsrf = (req, res) => {
    console.log("csrf = " + req.csrfToken());
    res.send(req.csrfToken());
}

exports.sessionMiddleware = (req, res, next) => {
    typeof req.session.usuario === "object" ? res.locals.usuario = req.session.usuario[0] : null;
    typeof req.session.grupo === "object" ? res.locals.grupo = req.session.grupo[0] : null;
    next();
}

exports.flashMsgsMiddleware = (req, res, next) => {
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    next();
}