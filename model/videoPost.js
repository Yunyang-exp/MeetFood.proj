const mongoose = require('mongoose');
// const mongoosePaginate = reqire('mongoose-paginate-v2');
// const constants = require('../util/constants');
const Schema = mongoose.Schema;

const videoPostSchema = new Schema (
    {
        postTitle: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        videoUrl: {
            type: String,
            required: true,
        },
        coverImageUrl: {
            type: String,
        },
        restaurantName: {
            type: String,
        },
        restaurantAddress: {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
                uppercase: true,
            },
            zipcode: {
                type: Number,
            },
        },
        orderedVia: {
            type: String,
        },
        postTime: {
            type: Date,
            required: true,
        },
        countComment: {
            type: Number,
            default: 0,
        },
        countLike: {
            type: Number,
            default: 0,
        },
        countCollections: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                user: {
                    type: Schema.types
                }
            }
        ],

        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    // { collection: 'videoposts'}
);

// videoPostSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('VideoPost', videoPostSchema);