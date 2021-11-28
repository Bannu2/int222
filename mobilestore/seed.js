var mongoose=require("mongoose");
var express=require("express");
var app=express();
var mobile=require("./models/mobile");
var Comment=require("./models/comment");
var mobiles=[
    {}
];
function seedDB(){

    Comment.remove({},function(err){  
    mobile.remove({},function (err) {
        if(err)
            console.log(err);
        else
            console.log("mobiles removed");
        mobiles.forEach(function (seed) {
            mobile.create(seed,function(err,mobile){
                if(err)
                    console.log(err);
                else {
                    console.log("Mobile added");
                    Comment.create(
                        {
                            text:"",
                            author: {
                                username:""

                            }

                        },function (err,comment) {
                            if(err)
                                console.log(err);
                            else
                            {
                                mobile.comments.push(comment);
                                mobile.save();

                                console.log(mobile.comments+"fuuuuuu");

                            }

                        }
                    )
                }


            });
        });
        
    });
});

}

module.exports=seedDB;