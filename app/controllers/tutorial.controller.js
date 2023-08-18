const db = require("../models/index");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validation
  if (!req.body.title || !req.body.desc) {
    return res.status(400).send({
      status: "fail",
      message: "Title and Description cannot be blank.",
    });
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    desc: req.body.desc,
    published: req.body.published ? req.body.published : false,
  };

  // Save to db
  Tutorial.create(tutorial)
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: "fail",
        message: `Cannot save tutorial to db : ${err.message} `,
      });
    });
};

exports.findall = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: "fail",
        message: `Cannot save tutorial to db : ${err.message} `,
      });
    });
};
