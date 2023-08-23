const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');


// user can create multiple blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


// creates relationship that blog belongs to user
Blog.belongsTo(User, {
  foreignKey: 'user_id'
});


// blogs can have multiple comments
Blog.hasMany(Comment,{
  foreignKey: 'blog_id'
})

// Comment belongs to user by their user ID
Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Blog, Comment };