import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String,
    
  });
  
  export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
  