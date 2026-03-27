import * as mongoose from "mongoose";

export const TODOScheme = new mongoose.Schema( {
    name: String,
    description: String,
    status: Boolean

})