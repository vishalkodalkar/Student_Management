import mongoose from "mongoose";
      import bcrypt from "bcryptjs";
      
      // Define schema (structure of user collection in DB)
      const StudentSchema = new mongoose.Schema({
          Student_id: {
          type: String,
          required: true, // must provide
        },
        name: {
          type: String,
          required: true, // must provide

        },
        email: {
          type: String,
          required: true,
          unique: true, // no duplicate emails
        },
        contact: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        course: {
          type: String,
          required: true,
        },
        year_semister: {
          type: String,
          required: true,
        },
        status:{
            type: String,
            enum: ["pending", "active", "inactive", "rejected"],
            default: "pending"
              },
        role:{
            type: String,
            enum: ['student', 'admin'],
            default: "student",
        },
        academic: {
  attendance: {
    type: Number,
    min: 0,
    max: 100,
    default: null,
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10,
    default: null,
  },
  remarks: {
    type: String,
    default: "",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null,
  },
  updatedAt: {
    type: Date,
    default: null,
      },
    },

    });
      
      // Before saving → hash password
      StudentSchema.pre("save", async function () {
        if (!this.isModified("password")) return ; // only hash if password is new
        this.password = await bcrypt.hash(this.password, 10);
        
      });
      
      const Student = mongoose.model("Student", StudentSchema);
      
      export default Student;