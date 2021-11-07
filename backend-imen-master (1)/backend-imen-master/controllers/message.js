const httpError = require("../models/error");
const message = require("../models/message");
const { validationResult } = require("express-validator");
const jardin = require("../models/jardin");
const parent = require("../models/parent");

const sendMessage = async (req, res, next) => {
  const { text, idSender, idRecever, jardinId, parentId } = req.body;

  const createdMessage = new message({
    text,
    idSender,
    idRecever,
  });

  let existingJardin;

  try {
    existingJardin = await jardin.findById(jardinId);
  } catch (err) {
    const error = new httpError("problem !!!!!", 500);
    return next(error);
  }

   let existinfParent;

  try {
    existinfParent = await parent.findById(parentId);
  } catch (err) {
    const error = new httpError("problem !!!!!", 500);
    return next(error);
  }

  try {
    createdMessage.save();
    existingJardin.messages.push(createdMessage);
    existingJardin.save();
    existinfParent.messages.push(createdMessage);
    await existinfParent.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ message: createdMessage });
};

const getMessage = async (req, res, next) => {
  let existingMessage;
  try {
    existingMessage = await message.find({}, "-pasword");
  } catch {
    const error = new httpError("failed signup", 500);
    return next(error);
  }
  res.json({ existingMessage: existingMessage });
};

const getMessageByJardinId = async (req, res, next) => {
  const id = req.params.id;

  let existingMessage;
  try {
    existingMessage = await jardin.findById(id).populate("messages");
  } catch (err) {
    const error = new httpError(
      "Fetching enfats failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingMessage || existingMessage.messages.length === 0) {
    return next(
      new httpError("Could not find child for the provided user id.", 404)
    );
  }

  res.json({
    messages: existingMessage.messages.map((el) =>
      el.toObject({ getters: true })
    ),
  });
};

const getMessageByParentId = async (req, res, next) => {
  const id = req.params.id;

  let existingMessage;
  try {
    existingMessage = await parent.findById(id).populate("messages");
  } catch (err) {
    const error = new httpError(
      "Fetching enfats failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingMessage || existingMessage.messages.length === 0) {
    return next(
      new httpError("Could not find child for the provided user id.", 404)
    );
  }

  res.json({
    messages: existingMessage.messages.map((el) =>
      el.toObject({ getters: true })
    ),
  });
};

exports.sendMessage = sendMessage;
exports.getMessage = getMessage;
exports.getMessageByJardinId =getMessageByJardinId
exports.getMessageByParentId = getMessageByParentId
