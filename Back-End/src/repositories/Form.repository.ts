import mongoose, { Model } from "mongoose";
import { IForm } from "../database/FormAnswers";

// Repository class
class FormRepository {
    private model: Model<IForm>;
  
    constructor(model: Model<IForm>) {
      this.model = model;
    }
  
    // Function to read all values from the schema
    async getAllFormsById(formID: number): Promise<IForm[]> {
      if (!mongoose.Types.ObjectId.isValid(formID)) {
        throw new Error(`Invalid formID: ${formID}`);
      }
      try {
        const forms = await this.model.find({formID});
        return forms;
      } catch (error) {
        if(error instanceof Error){
            throw new Error(`Unable to retrieve forms: ${error.message}`);
        }
        return []
      }
    }
  }