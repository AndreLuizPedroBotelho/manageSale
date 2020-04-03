import app from './app';
import './config/env';

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Project listening on port ${PORT}!`));
