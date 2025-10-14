import mongoose from "mongoose";
declare const User: mongoose.Model<{
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=user.model.d.ts.map