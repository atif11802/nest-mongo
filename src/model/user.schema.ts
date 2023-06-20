import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    expire_date: {
      type: Date,
    },
    message: {
      type: String,
      text: true,
    },
    attachment_url: {
      type: String,
    },
    on_behalf: {
      name: {
        type: String,
      },
      position: {
        type: String,
      },
    },

    talent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'talent',
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },

    is_offer_accepted: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    collection: 'offer',
  },
);

export default mongoose.model('offer', offerSchema);
