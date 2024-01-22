import app from './app.js';

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});