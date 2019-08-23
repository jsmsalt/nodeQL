import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import crypto from 'crypto'
import uuid from 'uuid'

const options = {
    collection: 'users',
    timestamps: {
        createdAt: true,
        updatedAt: true
    },
    toObject: {
        getters: true,
        virtuals: true
    },
    toJSON: {
        getters: true,
        virtuals: true
    }
}

var providerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        index: true,
    },
    id: {
        type: String,
        trim: true,
        index: true,
    }
});

const schema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        default: null
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        default: null
    },
    providers: [providerSchema],
    password: {
        type: String,
        bcrypt: true,
    },
    roles: {
        type: [String],
        default: ['user'],
    },
    profile: {
        name: {
            type: String,
            trim: true,
            default: '',
        },
        birthdate: {
            type: Date
        }
    },
    active: {
        type: Boolean,
        default: true,
    },
}, options);

schema.virtual('profile.age').get(function () {
    if (!this.profile.birthdate) return null
    const birthdate = new Date(this.profile.birthdate)
    return Math.floor((Date.now() - birthdate.getTime()) / (1000 * 3600 * 24 * 365));
})

// schema.pre('find', function () {
//     this.populate('profile.age');
// });

// schema.pre('findOne', function () {
//     this.populate('profile.age');
// });

schema.statics.findByProviderID = function (provider, id, callback) {
    this.findOne({ providers: { $elemMatch: { name: provider, id: id } } }, callback);
};

schema.statics.findByUsername = function (username, password, callback) {
    this.findOne({ username: username }, callback);
};

schema.plugin(bcrypt)
// schema.index({ email: 1, username: 1 })

export default mongoose.model('User', schema)