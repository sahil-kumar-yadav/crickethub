// backend/models/Match.js
import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
 tournamentId:{type :mongoose.Schema.Types.ObjectId ,ref :'Tournament',required:true},
 teams:[{type :mongoose.Schema.Types.ObjectId ,ref :'Team'}],
 dateTime:{type :Date ,required:true},
 venue:{type :String ,required:true},
 status:{type:String ,enum:['scheduled','live','completed'],default:'scheduled'},
 scorecard:{
   teamAScore:{runs:Number,wickets:Number,overs:Number},
   teamBScore:{runs:Number,wickets:Number,overs:Number},
   result:String,
   playerOfTheMatch:{type :mongoose.Schema.Types.ObjectId ,ref :'Player'}
 }
},{timestamps:true});

export default mongoose.model('Match', MatchSchema);
