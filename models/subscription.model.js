import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        trim: true,
        enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'], // Add more currencies as needed
        default: 'USD'
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: [
            'Sports',
            'Entertainment',
            'Education',
            'Productivity',
            'News',
            'Health',
            'Finance',
            'Shopping',
            'Travel',
            'Utilities',
            'Music',
            'Video',
            'Gaming',
            'Other'
        ],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,

    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) { return value > this.startDate; },
            message: 'Renewal date must be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,

    } 
}, {
    timestamps: true
});


//Auto calculate renewal date if missing
SubscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //Auto-update the status if renewal date has passed

    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();

});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;