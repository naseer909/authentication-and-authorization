const express=require("express");
const jwt=require("jsonwebtoken");
const app=express();
app.get("/login",(req,resp)=>{
    const user={
        id:1,
        username:"NASEER ULLAH",
        email:"sp20-bse-088@cuilahore.edu.pk"
    }
    jwt.sign({user},secretkey,{expiresIn:'300s'},(err,token)=>{
        resp.json({
            token
        })
    })
})
app.post("/profile",verifytoken,(req,resp)=>{
    jwt.verify(req.token,secretkey,(err,uthData)=>{
        if(err){
            resp.send({result:"Invalid Token"})
        }else{
            resp.json({
                message:"Profile Accessed",
                authData
            })
        }
    })


})
function verifytoken(req,resp,next){
    const bearerHeader=req.headers['Authorization'];
    if(typeof bearerHeader!=='underdefined'){
        const bearer=bearerHeader.split("");
        const token=bearer[1];
        req.token=token;
        next();

    }else{
        resp.send({
            result:'Token is not valid'
        })
    }

}
app.listen(5000,()=>{
    console.log("app is working");
})