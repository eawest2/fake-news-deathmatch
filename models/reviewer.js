module.exports = function (sequelize, DataTypes) {
  var Reviewer = sequelize.define("Reviewer", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

        isEmail: {
          args: true,
          msg: "Invalid Email"
        },
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ["F", "M"]
          ],
          msg: "Invalid gender"
        },
      }
    }
  }, {
    indexes: [{
      unique: true,
      fields: ["email"]
    }]
  });

  Reviewer.associate = function (models) {
    Reviewer.belongsToMany(models.Article, {
      // through: ArticleReviewer,
      through: "ArticleReviewer",
      onDelete: "CASCADE",
      foreignKey: "reviewerId"
    })
  };


  return Reviewer;
};