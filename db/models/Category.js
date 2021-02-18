const SequelizeSlugify = require("sequelize-slugify");
const Categories = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
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
  SequelizeSlugify.slugifyModel(Category, {
    source: ["name"],
  });
  return Category;
};
module.exports = Categories;
