import { Post } from "../models/post.model.js";
import { User } from "../models/users.models.js";
import { Tag } from "../models/tag.models.js";

export const getPost = async (req, res) => {
      try {
        const { tags, minLikes, page , limit } = req.query;
        const filter = {};

      if (tags) {
        filter.Tags = { $in: tags.split(',').map(tag => mongoose.Types.ObjectId(tag)) };
      }

      if (minLikes) {
        filter.LikeCount = { $gte: parseInt(minLikes) };
      }

      const aggregate = Post.aggregate([
        { $match: filter },
        {
            $lookup: {
                from: 'users',
                localField: 'Author',
                foreignField: '_id',
                as: 'Author'
            }
        },
        { $unwind: '$Author' },
        {
            $lookup: {
                from: 'tags',
                localField: 'Tags',
                foreignField: '_id',
                as: 'Tags'
            }
        },
        {
            $project: {
                Title: 1,
                Content: 1,
                LikeCount: 1,
                createdAt: 1,
                updatedAt: 1,
                'Author.userName': 1, 
                'Tags.tagName': 1 
            }
        }
      ]);

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
      };

      const result = await Post.aggregatePaginate(aggregate, options);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

export const uploadPost = async (req,res)=>{
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
}


export const getPostById = async(req,res) => {
  try{
    const {postId} = req.params ; 
    const post = await Post.findById(postId); 
    if(!post){
      return res.status(400).json({message : "Post Expired or Invalid !"}); 
    }
    res.status(200).json({post}); 
  }catch(e){
    console.log(e); 
    res.sendStatus(400); 
  }
}