const Comment = require("../models/comment.model");

const { v4: uuidv4 } = require("uuid");

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    const comment = await Comment.create(request.body);
    response.status(201).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      message: error.message || "Error occured while creating comment",
    });
  }
};

const getOne = async (request, response) => {
  const id = request.params.id;
  try {
    if (id) {
      const comment = await Comment.findOne({
        where: { id: id },
      });
      response.status(200).json({
        status: "success",
        data: comment,
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: error.message || `Error occured while fetching comment`,
    });
  }
};

const update = async (request, response) => {
  const id = request.params.id;
  try {
    if (id) {
      await Comment.update(request.body, {
        where: { id: id },
      });
      response.status(200).json({
        status: "success",
        message: `Comment details are updated successfully!`,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || "Error occured while updating project details!",
    });
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Comment.destroy({ where: { id: id } });
    response
      .status(204)
      .json({ status: "success", message: "comment removed successfully!" });
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || `Error occured while removeing project`,
    });
  }
};

module.exports = {
  create,
  getOne,
  update,
  remove,
};
