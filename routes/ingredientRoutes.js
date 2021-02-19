const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  newIngredient,
  updateIngredient,
  removeIngredient,
  fetchIngredient,
  ingredientList,
  newRecipe,
} = require("../controllers/ingredientController");

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredient = await fetchIngredient(ingredientId, next);
  if (ingredient) {
    req.whatever = ingredient;
    next();
  } else {
    next({ status: 404, message: "ingredient not found" });
  }
});

router.get("/", ingredientList);

router.delete("/:ingredientId", removeIngredient);

router.post("/", upload.single("image"), newIngredient);

//router.post("/:ingredientId/recipes", upload.single("image"), newRecipe);

router.put("/:ingredientId", upload.single("image"), updateIngredient);

module.exports = router;
