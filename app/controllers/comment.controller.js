const Comment = require("../models/comment.model");

const { v4: uuidv4 } = require("uuid");

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    const comment = await Comment.create(request.body);
    response.status(201).json({
      status_code: 201,
      status: "success",
      data: {
        comment: comment,
      },
      error: null,
      message: "Comment created successfully!",
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      status_code: 400,
      error: {
        error_message: error.message,
      },
      message: "Error occured while creating comment",
      data: null,
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
        status_code: 200,
        data: {
          comment: comment,
        },
        error: null,
        message: "Comment retrived successfully!",
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      error: {
        error_message: error.message,
      },
      message: `Error occured while fetching comment`,
      data: null,
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
      const comment = Comment.findOne({ where: { id: id } });

      response.status(200).json({
        status: "success",
        status_code: 200,
        data: {
          comment: comment,
        },
        error: null,
        message: `Comment details are updated successfully!`,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: "failed",
      status_code: 500,
      error: {
        error_message: error.message,
      },
      data: null,
      message: "Error occured while updating project details!",
    });
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Comment.destroy({ where: { id: id } });
    response.status(204).json({
      status: "success",
      status_code: 204,
      data: {
        comment_id: id,
      },
      error: null,
      message: "Comment removed successfully!",
    });
  } catch (error) {
    response.status(500).send({
      status: "failed",
      status_code: 500,
      data: null,
      error: {
        error_message: error.message,
      },
      message: `Error occured while removeing project`,
    });
  }
};

module.exports = {
  create,
  getOne,
  update,
  remove,
};
