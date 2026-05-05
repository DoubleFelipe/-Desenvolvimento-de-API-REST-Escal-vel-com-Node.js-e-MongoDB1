const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) return res.status(401).json({ erro: "Sem token" });

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
};