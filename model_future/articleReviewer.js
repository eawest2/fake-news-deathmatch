const Sequelize = require("sequelize");
// const Reviewer = require("./reviewer");
// const Article = require("./article")
Op = Sequelize.Op;

module.exports = function (sequelize, DataTypes) {
  var ArticleReviewer = sequelize.define("ArticleReviewer", {
    rating1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        [Op.between]: [[1,5]]
      }
    },
    rating2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        [Op.between]: [[1,5]]
      }
    },
    rating3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        [Op.between]: [[1,5]]
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
       
      }
    },
  });

  

    return ArticleReviewer;
};