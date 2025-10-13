const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
    },
    userName: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    profilePhoto: {
        type: String,
    },
    videos: [
        {
            videoPost: {
                type: Schema.Types.ObjectId,
                ref: 'VideoPost',
            },
        }

    ],
    collections: [
        {
            vidoePost: {
                type: String, // need type string to compare with params.videoPostId
                ref: 'VideoPost',
            },
        }
    ],
    likedVideos: [
        {
            vidoePost: {
                type: String, // need type string to compare with params.videoPostId
                ref: 'VideoPost',
            },
        }
    ]
})

module.exports = mongoose.model('UserTest', userTestSchema);