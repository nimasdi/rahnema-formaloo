import { makeApp } from "./src/app"
import FillForm from "./src/database/FormAnswers"
import { FillFormRepository } from "./src/repositories/FillForm.repository"
import { FillFormService } from "./src/services/FillForm.service"
import MongoDBConnection from './src/database/connect';
import { seedForm } from "./src/database/seed.form";
import { FormRepository } from "./src/repositories/Form.repo";
import Form from "./src/database/Form/form.entity";
import { UserRepository } from "./src/repositories/User.repo";
import User from "./src/database/User/user.entity";
import { FormService } from "./src/services/Form.service";


const fillFormRepository = new FillFormRepository(FillForm)
const fillFormService = new FillFormService(fillFormRepository)
const formRepository = new FormRepository(Form)
const userRepository = new UserRepository(User);
const formService = new FormService(formRepository, userRepository);


const uri = "mongodb://localhost:27017/rahnema-formaloo";


const dbConnection = new MongoDBConnection(uri);

dbConnection.connect().then(async () => {
    //await seedForm()
    const app = makeApp(fillFormService,formService)

    const PORT = 3000

    app.listen(PORT,() => {
        console.log(`app run on port ${PORT}`)
    })
}).catch(err => console.log("not connected to db"))



