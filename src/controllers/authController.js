const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
  return res.status(400).json({ erro: "Dados inválidos" });
}

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
  return res.status(400).json({ erro: "Dados inválidos" });
}

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ erro: "Senha inválida" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
};