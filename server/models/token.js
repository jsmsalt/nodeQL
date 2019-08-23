import Model from 'core/model'
import db from 'core/db'
import uuid from 'uuid'

export default Model('token', {
    token: { type: String, default: () => uuid.v4(), index: { unique: true } },
    user: db().Schema.Types.ObjectId,
    ip: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
})
