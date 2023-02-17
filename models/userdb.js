const mongoose = require('mongoose');

/////////////////////////////////////SCHEMA FOR BUYER
const buyerSchema = mongoose.Schema({
    userRole: String,
    username: String,
    userAddress: String,
    userContact: Number,
    userEmail: String,
    password: String,
})

/////////////////////////////////////MODEL FOR BUYER
const Buyer = new mongoose.model("buyer", buyerSchema);

/////////////////////////////////////ADDING BUYER TO DATABASE
module.exports.addBuyer = (buyerDetail) =>{
    const newBuyer = new Buyer(buyerDetail);

    newBuyer.save((err)=>{
        if(err) throw err;
        console.log("Buyer Added");
    })
}

/////////////////////////////////////SCHEMA FOR SELLER
const sellerSchema = mongoose.Schema({
    userRole: String,
    showroomName: String,
    showroomAddress: String,
    showroomContact: Number,
    showroomId: String,
    showroomEmail: String,
    password: String,
    carCompany: String
})

/////////////////////////////////////MODEL FOR SELLER
const Seller = new mongoose.model("seller", sellerSchema);

/////////////////////////////////////ADDING SELLER TO DATABASE
module.exports.addSeller = (sellerDetail) =>{
    const newSeller = new Seller(sellerDetail);

    newSeller.save((err)=>{
        if(err) throw err;
        console.log("Buyer Added");
    })
}

/////////////////////////////////////MODEL TO FIND SELLER
const USER_SELLER = mongoose.model("seller");

/////////////////////////////////////MODEL TO FIND BUYER
const USER_BUYER = mongoose.model("buyer");

/////////////////////////////////////FINDING USER
module.exports.userLogin = (userDetail) =>{
    return new Promise((resolve) => {
        USER_BUYER.findOne(userDetail, function(err, foundBuyer){
            if(err) throw err;
            else{
                if(foundBuyer){
                    resolve(foundBuyer);
                } else{
                    USER_SELLER.findOne(userDetail, function(err, foundSeller){
                        if(err) throw err;
                        resolve(foundSeller)
                    });
                }
            } 
        });
    })
}