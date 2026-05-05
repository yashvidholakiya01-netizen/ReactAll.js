const Queue = require("../models/Queue");

exports.createQueue = async (req, res) => {
  const queue = await Queue.create({
    name: req.body.name,
    businessId: req.user.id
  });

  res.json(queue);
};

exports.joinQueue = async (req, res) => {
  const queue = await Queue.findById(req.body.queueId);

  const position = queue.users.length + 1;

  queue.users.push({
    user: req.user.id,
    position
  });

  await queue.save();

  res.json({ position });
};

exports.nextUser = async (req, res) => {
  const queue = await Queue.findById(req.body.queueId);

  queue.users.shift();

  // update positions
  queue.users = queue.users.map((u, i) => ({
    ...u.toObject(),
    position: i + 1
  }));

  await queue.save();

  res.json(queue);
};