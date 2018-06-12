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
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    username: {
      type: DataTypes.TEXT
    },

    about: {
      type: DataTypes.TEXT
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    last_login: {
      type: DataTypes.DATE
    },

    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
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