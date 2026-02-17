import mongoose from "mongoose";
      import bcrypt from "bcryptjs";
      
      // Define schema (structure of user collection in DB)
      const AdminSchema = new mongoose.Schema({
        admin_id:{
          type: String,
          required:true,
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
        password: {
          type: String,
          required: true,
        },
        status:{
          type: String,
          default: "active", // default role is user 
          enum: ["active", "inactive"] ,// can be either user or admin
        },
      });
      
      // Before saving → hash password
      AdminSchema.pre("save", async function () {
        if (!this.isModified("password")) return ; // only hash if password is new
        this.password = await bcrypt.hash(this.password, 10);
        
      });
      
      const Admin = mongoose.model("Admin", AdminSchema);
      
      export default Admin ;