const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LMS Backend API",
            version: "1.0.0",
            description: "Learning Management System Backend APIs"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },

    apis: [
        "./routes/*.js"
    ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;