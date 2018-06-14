const Sequelize = require("sequelize");
Op = Sequelize.Op;

module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
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

  Review.associate = function(models) {
    Review.belongsTo(models.Article, {
      foreignKey: {
        allowNull: false
      }
    });
  };
 

  return Review;
};