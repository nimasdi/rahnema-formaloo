import express from "express"
import { router as userRoutes } from "./routes/create-form.route";
import { router as userForms } from "./routes/getUserForms.route";
import { connectDB } from "./database/connection";



export const startServer = async () => {
    try {
        await connectDB();

        const app = express();

        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))


        app.use(express.json());
        app.use('/', userRoutes);
        app.use('/',userForms)

        return app;
    } catch (error) {
        console.error('Error starting server:', error);
    }
};