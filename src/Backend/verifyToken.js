const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
 const token=req.cookies.token;
 if(!token){
  return res.status(401).json({ message: "Not authenticated" });
 }
 jwt.verify(token,"secretkey" ,((err,data)=>{
    if(err){
         return res.status(403).json({ message: "Invalid token" });
    }
      req.userId = data.id;
    next();
 }))
}

module.exports = verifyToken;