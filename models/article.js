

module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
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
      type: DataTypes.TEXT,
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
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }


  });

 
  Article.associate = function(models) {
    Article.belongsToMany(models.Reviewer, {
      // through: models.ArticleReviewer,
      through: "articleReviewer",
      onDelete: "CASCADE"
      // foreignKey: "articleId"
    })
  };
  
  
  return Article;
};
