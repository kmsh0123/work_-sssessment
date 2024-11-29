import { Schema, model } from "mongoose";

const ItemSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },     
},{
    timestamps : true
});
;

// Create models
const ItemModel = model("Item", ItemSchema);
export default ItemModel;