// creates User model

const { Model, DataTypes } = require('sequelize');

// install bcrypt npm dependency to hash user passwords
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model {
  checkPassword(userPassword) {
    return bcrypt.compareSync(userPassword, this.password);
  }
}


User.init(

  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },

  {
    hooks: {
        // data
      beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      },

        // data
      // beforeUpdate: async (updatedUser) => {
      //   updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
      //   return updatedUser;
      // },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;