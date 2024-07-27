import { Tag } from "../models/tag.models.js"

export const getTag = async (req,res)=>{
    try{
        const tags = await Tag.find(); 

        res.status(200).json(tags); 
    }catch(e){
        console.log(`Error in creating Tag ${e}`); 
        res.sendStatus(400); 
    }
}

export const createTag = async (req,res)=>{
    try{
        const {tagName} = req.body; 
        if(!tagName){
            return res.status(400).json({message : "Please Enter a tag"}); 
        }
        const tag = new Tag(
            {
                Name : tagName
            }
        )
        await tag.save(); 
        res.status(200).json({message : "Tag Created Successfully! "}); 
    }catch(e){
        console.log(`Error while creating Tag ${e}`); 
        res.sendStatus(400); 
    }
}