const { Category, Ingredient } = require("../db/models");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const found = await Ingredient.findByPk(ingredientId);
    return found;
  } catch (error) {
    next(error);
  }
};

exports.ingredientList = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      //   include: [
      //     {
      //       model: Ingredient,
      //       attributes: ["id"],
      //       as: "ingredients",
      //     },
      //   ],
    });
    res.json(ingredient);
  } catch (error) {
    next(error);
  }
};

exports.removeIngredient = async (req, res, next) => {
  try {
    await req.whatever.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};

// exports.newIngredient = async (req, res, next) => {
//   console.log(req.body);
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     const newIngredient = await Ingredient.create(req.body);
//     res.status(201);
//     res.json(newIngredient);
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateIngredient = async (req, res, next) => {
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
