const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  newCategory,
  updateCategory,
  removeCategory,
  newIngredient,
  fetchCategory,
  categoryList,
} = require("../controllers/categoryController");

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  if (category) {
    req.whatever = category;
    next();
  } else {
    next({ status: 404, message: "category not found" });
  }
});

router.get("/", categoryList);

router.delete("/:categoryId", removeCategory);

router.post("/", upload.single("image"), newCategory);

//router.post("/:categoryId/data", upload.single("image"), newIngredient);

router.put("/:categoryId", upload.single("image"), updateCategory);

module.exports = router;
