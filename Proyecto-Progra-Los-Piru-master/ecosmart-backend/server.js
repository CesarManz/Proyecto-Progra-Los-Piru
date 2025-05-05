const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => console.log('🟢 Conectado a MongoDB Atlas'))
    .catch(err => console.error('🔴 Error al conectar a MongoDB', err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

        res.status(200).json({ message: 'Login exitoso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
