const Comment = require("../models/comment.model");

const { v4: uuidv4 } = require("uuid");

const sendResponse = require("../utils/response");

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    const comment = await Comment.create(request.body);

    sendResponse(response, 201, "Comment created successfully!", comment);
  } catch (error) {
    sendResponse(
      response,
      400,
      "Error occured while creating comment",
      error.message
    );
  }
};

const getOne = async (request, response) => {
  const id = request.params.id;
  try {
    if (id) {
      const comment = await Comment.findOne({
        where: { id: id },
      });
      sendResponse(response, 200, "Comments retrived successfully!", comment);
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while fetching comment",
      error.message
    );
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
      sendResponse(
        response,
        200,
        "Comment details updated successfully!",
        comment
      );
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while updating project details!",
      error.message
    );
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Comment.destroy({ where: { id: id } });
    sendResponse(response, 204, "Comment removed successfully!", null);
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while removing project",
      error.message
    );
  }
};

module.exports = {
  create,
  getOne,
  update,
  remove,
};
