import { makeApp } from "./src/app"
import Form from "./src/database/FormAnswers"
import { FormRepository } from "./src/repositories/FillForm.repository"
import { FormService } from "./src/services/FillForm.service"
import MongoDBConnection from './src/database/connect';
import { seedForm } from "./src/database/seed.form";


const formRepository = new FormRepository(Form)
const formService = new FormService(formRepository)



const uri = process.env.MONGO_URI || '';


const dbConnection = new MongoDBConnection(uri);

dbConnection.connect().then(async () => {
    await seedForm()
    const app = makeApp(formService)

    const PORT = 3000

    app.listen(PORT,() => {
        console.log(`app run on port ${PORT}`)
    })
}).catch(err => console.log("not connected to db"))



