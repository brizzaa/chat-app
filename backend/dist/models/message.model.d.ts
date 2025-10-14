import mongoose from "mongoose";
declare const Message: mongoose.Model<{
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    text?: string | null;
    image?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    text?: string | null;
    image?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    text?: string | null;
    image?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    text?: string | null;
    image?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    text?: string | null;
    image?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    text?: string | null;
    image?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Message;
//# sourceMappingURL=message.model.d.ts.map