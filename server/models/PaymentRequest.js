const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema ({

    requesterId: {
        type: String,
        required: true,
    },

    receiverId: {
        type: String,
        required: true,
    },

    amountOwed: {
        type: Number,
        required: true,

    },

    isPaid: {
        type: Boolean,
        required: true,

    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    groupId: {
        type: String,
        unique: true,
    }
});

module.exports = mongoose.model('PaymentRequest' , paymentSchema);