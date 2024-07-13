const Label = require("../models/label.model");

const { v4: uuidv4 } = require("uuid");

const sendResponse = require("../utils/response");

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    const label = await Label.create(request.body);
    sendResponse(response, 201, "Label created successfully!", label);
  } catch (error) {
    sendResponse(
      response,
      400,
      "Error occured while creating label",
      error.message
    );
  }
};

const getAll = async (request, response) => {
  const id = request.params.id;
  try {
    if (id) {
      const label = await Label.findAll({
        where: { user_id: id },
      });
      sendResponse(response, 200, "Labels retrived successfully!", label);
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while retriving labels",
      error.message
    );
  }
};

const update = async (request, response) => {
  const id = request.params.id;
  try {
    if (id) {
      await Label.update(request.body, {
        where: { id: id },
      });
      const label = Label.findOne({ where: { id: id } });
      sendResponse(response, 200, "Label updated successfully!", label);
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while updating label details",
      error.message
    );
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Label.destroy({ where: { id: id } });
    sendResponse(response, 204, "Label removed successfully!", null);
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while removing label",
      error.message
    );
  }
};

module.exports = {
  create,
  getAll,
  update,
  remove,
};
