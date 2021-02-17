const SequelizeSlugify = require("sequelize-slugify");
const Ingredients = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    "Ingredient",
    {
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Ingredient, {
    source: ["name"],
  });
  return Ingredient;
};
module.exports = Ingredients;
