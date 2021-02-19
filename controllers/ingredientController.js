const { Category, Ingredient, Recipe } = require("../db/models");

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
      include: [
        {
          model: Category,
          attributes: ["name"],
          as: "category",
        },
        { model: Recipe, through: { attributes: ["id"] }, as: "recipe" },
      ],
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

exports.newIngredient = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newIngredient = await Ingredient.create(req.body);
    res.status(201);
    res.json(newIngredient);
  } catch (error) {
    next(error);
  }
};

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

// exports.newRecipe = async (req, res, next) => {
//   console.log(req.body);
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     req.body.ingredientId = req.whatever.id;

//     const newRecipe = await Recipe.create(req.body);
//     await newRecipe.addIngrediants(Ingredient, {
//       through: { attributes: ["id"] },
//     });
//     res.status(201);
//     res.json(newRecipe.addIngrediant(req.body.Ingredient));
//   } catch (error) {
//     next(error);
//   }
// };
