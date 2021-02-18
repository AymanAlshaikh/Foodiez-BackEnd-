const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  newRecipe,
  updateRecipe,
  removeRecipe,
  fetchRecipe,
  recipeList,
} = require("../controllers/recipeController");

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  if (recipe) {
    req.whatever = recipe;
    next();
  } else {
    next({ status: 404, message: "recipe not found" });
  }
});

router.get("/", recipeList);

router.delete("/:recipeId", removeRecipe);

router.post("/", upload.single("image"), newRecipe);

//router.post("/:recipeId/data", upload.single("image"), newRecipe);

router.put("/:recipeId", upload.single("image"), updateRecipe);

module.exports = router;
