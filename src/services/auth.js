// Authentication y Authorizacion
export let auth = (req, res, next) => {
    if (req.session && req.session.user)
        return next(); //puede continuar buen hombre
    else
        return res.status(401).send({
            message: "Debes iniciar session"
        });
  };
