import { Schema,model } from "mongoose";

const TokenBlackListSchema = new Schema({
    token : {
        type : String,
        required : true
    },
    expired_at : {
        type : Date,
        default : Date.now,
        expires : "1d"
    }
},{
    timestamps : true
});

const TokenBlackList = model("TokenBlackList", TokenBlackListSchema);
export default TokenBlackList