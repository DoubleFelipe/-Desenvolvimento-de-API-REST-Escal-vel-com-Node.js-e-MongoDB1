const Event = require('../models/Event');

exports.create = async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
};

exports.getAll = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.update = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
};

exports.delete = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deletado" });
};