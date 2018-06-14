module.exports = function (sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: {
          args: true,
          msg: "A valid URL is required"
        }
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: {
          args: true,
          msg: "A valid Image URL is required"
        }
      }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
        }
      }
    },
    sourceId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Source Id is required"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Author is required"
        }
      }
    }
  });

  Article.associate = function (models) {
    Article.hasMany(models.Review, {
      as: 'ArticleReviews',
      onDelete: "CASCADE"
    });
   };

  // Article.associate = function (models) {
  //   Article.belongsToMany(models.Reviewer, {
  //     // through: models.ArticleReviewer,
  //     through: "ArticleReviewer",
  //     onDelete: "CASCADE",
  //     foreignKey: "articleId"
  //   })
  // };

  return Article;
};