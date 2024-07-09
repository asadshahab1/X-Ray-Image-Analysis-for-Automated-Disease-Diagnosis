// const { User, Authenticate } = require('./models'); // Ensure this works without MySQL
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const stream = require('stream');
const FormData = require('form-data');

const app = express();
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from this origin
}));

app.post('/signup', async (req, res) => {
  const { fName, lName, hospitalName, email, phone, password } = req.body;

  try {
    const user = new User(fName, lName, hospitalName, phone, email, password);
    await user.save();
    return res.json({message: "Saved successfully!"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Registration Failed! Try Again" });
  }
});

const { Authenticate, User } = require('./models');

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Temporarily simulate authentication without MySQL
  /*
    const auth = new Authenticate(); // Ensure this works without MySQL
    const result = await auth.signIn(email, password);
    if (result.message == 0)
        return res.json({ message: "Sign in successful", details: result.user });
    else
        return res.json({ message: "Invalid email or password" });
  */

  // Simulate successful authentication
  return res.json({ message: "Sign in successful", details: { email } });
});


app.post('/navigate', upload.single('file'), async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Create a FormData instance
        const form = new FormData();
        
        // Convert the buffer to a readable stream and append it to the form
        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.file.buffer);
        form.append('file', bufferStream, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });
        const response = await axios.post('http://localhost:8000/predict', form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        console.log(response)
        return res.json({"result":response.data.result})
}
catch (error) {
    console.error('Error uploading file to another server:', error);
    res.status(500).send('Error uploading file to another server');
}})

// app.get('/test',async (req,res)=>{
//     res.sendFile("C:\\Users\\user\\Downloads\\ML OEL\\ML OEL\\backend\\test.html")
// })


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
