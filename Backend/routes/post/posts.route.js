import express from "express" ; 
import commentRoute from "./comment/comments.route.js";
import { Post } from "../../models/post.model.js";
import likeRotue from "./like/like.route.js"; 
import { User } from "../../models/users.models.js";
import { Tag } from "../../models/tag.models.js";

const router = express.Router();

router.use('/comments',commentRoute); 
router.use('/like',likeRotue); 

router.get('/', async (req, res) => {
    try {
      const { tags, minLikes, page = 1, limit = 10 } = req.query;
      const filter = {};
  
      if (tags) {
        filter.Tags = { $in: tags.split(',').map(tag => mongoose.Types.ObjectId(tag)) };
      }
  
      if (minLikes) {
        filter.LikeCount = { $gte: parseInt(minLikes) };
      }
  
      const aggregate = Post.aggregate([{ $match: filter }]);
      
      const options = {
        page: parseInt(page) ,
        limit: parseInt(limit) ,
        populate: [
          { path: 'Author', select: 'userName' },
          { path: 'Tags', select: 'tagName' }
        ],
      };
  
      const result = await Post.aggregatePaginate(aggregate, options);
  
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.post('/',async (req,res)=>{
    try{
        const {title, content, tagIds } = req.body; 

        if(!title || !content){
            return res.status(400).json({Message : "Author , title and content are required."}); 
        }

        const authorId = req.user.id; 
        if(!authorId){
            return res.status(400).json({message : "Unauthorized User"}); 
        }
        const author = await User.findById(authorId)
        if(!author){
            return res.status(400).json({message: "Author not Found. "}); 
        }
        if(tagIds){
            const tags = await Tag.find({ _id: { $in: tagIds } });
            if (tags.length !== tagIds.length) {
            return res.status(404).json({ error: 'One or more tags not found.' });
            }
        }

        const newPost = new Post({
            Author: authorId,
            Title: title,
            Content: content,
            Tags: tagIds,
        });

        const savedPost = await newPost.save();

        res.status(201).json({message : "Posted Successfull !"});
    }catch(e){
        console.log('error creating post',e); 
        res.status(400).json({message : "Unable to post, Try again"}); 
    }
}); 

export default router ; 