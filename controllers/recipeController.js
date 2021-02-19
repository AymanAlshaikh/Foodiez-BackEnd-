const { request } = require("express");
const { Ingredient, Recipe } = require("../db/models");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const found = await Recipe.findByPk(recipeId);
    return found;
  } catch (error) {
    next(error);
  }
};

exports.recipeList = async (req, res, next) => {
  try {
    const recipe = await Recipe.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Ingredient,
          attributes: ["name"],
          as: "ingredients",
        },
      ],
    });
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.removeRecipe = async (req, res, next) => {
  try {
    await req.whatever.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.newRecipe = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.ingredientId = req.whatever.id;
    const newRecipe = await Recipe.create(req.body);
    await newRecipe.addIngrediants([ingredients, 1]);
    console.log(meal);
    res.status(201);
    res.json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.whatever.update(req.body);
    res.json(req.whatever);
  } catch (error) {
    next(error);
  }
};
