const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;
const blogSchema = new Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blogData: {
    type: String,
    required: true,
  },
  blogLikes: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  cover_image_url: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
}, { timestamps: true });

blogSchema.pre('validate', function (next) {
  if (this.blogTitle) {
    const baseSlug = slugify(this.blogTitle, { lower: true });
    const uniqueIdentifier = this._id.toString().slice(0, 10);
    this.slug = `${baseSlug}-${uniqueIdentifier}`;
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
