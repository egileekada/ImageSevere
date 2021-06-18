const { cloudinary } = require('../utils/cloudinary'); 
const express = require("express"); 
const router = express.Router();   
const data = require('../model/data') 

async function AddImageData(client, newData){  
    // await client.db("Photo_Storage").collection("data", {
    //     validator: {
    //         $and: [
    //             {
    //                 "name" : {$type: "string", $exists: true}
    //             },
    //             {
    //                 "url" : {$type: "string", $exists: true}
    //             },
    //         ]
    //     }
    // }).insertOne(newData); 

    await data.save(newData); 
    
    await client
        .db("Photo_Storage")
        .collection("data")
        .createIndex({name: 1}, {unique: true});

    console.log("Upload Successful") 
}  
 
router.post("/upload", async (req, res)=>{ 
    try {   
        const fileStr = req.body.data.url; 
        const uploadResponse = await cloudinary.uploader.upload(fileStr, { 
            "folder" : 'Michael Images',
            upload_preset: 'o8imcxn2' 
        });   
 
        var item =new data({
            name: req.body.data.name,
            age:uploadResponse.secure_url
        })
          
        item.save(function(err,result){
            if (err){
                console.log(err);
            }
            else{
                console.log(result)
            }
        })

        // const newItem = new data({
        //     name, 
        //     newurl
        // });
        // const itemInfo = await newItem.save();
        // itemInfo.success = true;
        // res.status(201).json(itemInfo);

        // data.name = req.body.data.name 
        // data. = uploadResponse. 
        // await data.save();  

        res.json({ msg: 'yaya' }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    } 
}); 

module.exports = router;