import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// export userschema
export default mongoose.model('User', UserSchema);
