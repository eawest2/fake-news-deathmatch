
module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define("article", {
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    sourceId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }

  });

 
  // Article.associate = function(models) {
  //   Article.belongsToMany(models.Reviewer, {
  //     // through: models.ArticleReviewer,
  //     through: "ArticleReviewer",
  //     onDelete: "CASCADE",
  //     foreignKey: "articleId"
  //   })
  // };
  
  
  return Article;
};
