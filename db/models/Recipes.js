const SequelizeSlugify = require("sequelize-slugify");
const Recipes = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    "Recipe",
    {
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: 5,
        validate: {
          min: 0.1,
        },
      },
      description: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["name"],
  });
  return Recipe;
};
module.exports = Recipes;
