import { makeApp } from "./src/app"
import FillForm from "./src/database/FormAnswers"
import { FillFormRepository } from "./src/repositories/FillForm.repository"
import { FillFormService } from "./src/services/FillForm.service"
import MongoDBConnection from './src/database/connect';
import { seedForm } from "./src/database/seed.form";


const fillFormRepository = new FillFormRepository(FillForm)
const fillFormService = new FillFormService(fillFormRepository)



const uri = process.env.MONGO_URI || '';


const dbConnection = new MongoDBConnection(uri);

dbConnection.connect().then(async () => {
    await seedForm()
    const app = makeApp(fillFormService)

    const PORT = 3000

    app.listen(PORT,() => {
        console.log(`app run on port ${PORT}`)
    })
}).catch(err => console.log("not connected to db"))



