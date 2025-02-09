const path = require('path');
const dotenv = require('dotenv');

// Load .env file in development
if (process.env.NODE_ENV !== 'production') {
    const envPath = path.resolve(__dirname, '../../.env');
    const result = dotenv.config({ path: envPath });
    
    if (result.error) {
        console.warn('❌ .env file not found - using environment variables');
    } else {
        console.log('✅ Local environment loaded successfully');
    }
}

console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

const config = {
    // Server configuration
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // MongoDB configuration
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DB || 'rin_dev_db',

    // Python service configuration
    pythonService: {
        url: process.env.PYTHON_SERVICE_URL || 'http://localhost:8000',
        apiKey: process.env.PYTHON_SERVICE_API_KEY,
        secret: process.env.PYTHON_SERVICE_SECRET
    },

    // LLM API Keys (for Python service)
    llmKeys: {
        openai: process.env.OPENAI_API_KEY,
        anthropic: process.env.ANTHROPIC_API_KEY,
        together: process.env.TOGETHER_API_KEY,
        novita: process.env.NOVITA_API_KEY,
        groq: process.env.GROQ_API_KEY,
        atoma: process.env.ATOMA_API_KEY
    },

    // Rin configuration
    rin: {
        apiKey: process.env.RIN_CHAT_API_KEY,
        secret: process.env.RIN_CHAT_CLIENT_SECRET,
        accessTokenExpiry: '1h',
        auth: {
            algorithm: 'HS256',
            issuer: 'rin-service',
            audience: 'rin-client'
        }
    },
};

// Validation
if (!config.mongoUri) {
    console.error('❌ MONGO_URI environment variable is required');
    process.exit(1);
}

if (!config.pythonService.apiKey || !config.pythonService.secret) {
    console.error('❌ Python service credentials are required');
    process.exit(1);
}

// Add validation for Rin configuration
if (!config.rin.apiKey || !config.rin.secret) {
    console.error('❌ Rin service credentials are required');
    process.exit(1);
}

module.exports = config;
