export const authenticateUser = (req, res, next) => {
    const { email, role } = req.headers;

    if (!email || !role) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    req.user = { email, role };
    next();
};

export const authenticateAdmin = (req, res, next) => {
    const { email, role } = req.headers;

    if (!email || !role) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado: solo admin' });
    }

    req.user = { email, role };
    next();
};
