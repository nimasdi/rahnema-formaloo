import { Model } from "mongoose";
import { IForm } from "../database/FormAnswers";

// Repository class
class FormRepository {
    private model: Model<IForm>;
  
    constructor(model: Model<IForm>) {
      this.model = model;
    }
  
    // Function to read all values from the schema
    async getAllForms(): Promise<IForm[]> {
      try {
        const forms = await this.model.find();
        return forms;
      } catch (error) {
        if(error instanceof Error){
            throw new Error(`Unable to retrieve forms: ${error.message}`);
        }
        return []
      }
    }
  }