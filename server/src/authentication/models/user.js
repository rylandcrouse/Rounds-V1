import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    display_name: {
        type: String,
        required: true,
        match: /^[a-z ,.'-]+$/i,
    },
    email: {
        type: String,
        required: true,
        // unique optimizes users for search, does NOT force a unique value
        unique: true,
        // regex, to only match valid email address
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    },
    code: String
});

export default mongoose.model('User', userSchema);