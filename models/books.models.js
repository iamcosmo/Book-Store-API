import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: [String],
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
 
},{
  timestamps:true
});

const BlogPostModel = mongoose.model("Books", postSchema);

export default BlogPostModel;