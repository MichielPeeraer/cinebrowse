import swaggerJsdoc from "swagger-jsdoc";

const PORT = process.env.PORT!;

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Betsson Movies API",
            version: "1.0.0",
            description:
                "Movie collection API built with Node, Express & MongoDB",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: "Local dev",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // <-- where Swagger reads JSDoc from
};

export const swaggerSpec = swaggerJsdoc(options);
