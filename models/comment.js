const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// 
class Comment extends Model {}

// allow Null = true allows for comment deletion

Comment.init(

  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    comment_description: {
        type: DataTypes.STRING,
    },

    // relationships referenced in models/index.js
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id',
      },
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }

);


module.exports = Comment;