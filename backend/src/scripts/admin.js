import User from '../models/user.js';
import bcrypt from 'bcrypt';

async function createAdminAcc() {
    try {
        const existingAdmin= await User.findOne({email:"admin@test.com"});
        if (!existingAdmin){
            const newAdmin= new User({
                email:"admin@test.com",
                name:"Admin",
                password: await bcrypt.hash("admin",10),
                role: "Admin"

            })
            await newAdmin.save();
            console.log("Admin created success")

        }
        else{
            console.log("Admin already exists")
        }
        
    } catch (error) {
        console.error(error.message);
        
    }
    
}

//module.exports = createAdminAcc;
export default createAdminAcc;