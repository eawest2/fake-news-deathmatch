module.exports = function (sequelize, DataTypes) {
  var Reviewer = sequelize.define("Reviewer", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },

      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [
            ['F', 'M']
          ],
        }
      }
    },

    {
      indexes: [{
        unique: true,
        fields: ["email"]
      }]
    }
  );

  // Reviewer.associate = function(models) {
  //   Reviewer.belongsToMany(models.Article, {
  //     // through: ArticleReviewer,
  //     through: "ArticleReviewer",
  //     onDelete: "CASCADE",
  //     foreignKey: "reviewerId"
  //   })
  // };


  return Reviewer;
};