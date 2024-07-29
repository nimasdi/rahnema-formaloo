import mongoose, { Model } from "mongoose";
import { IForm } from "../database/FormAnswers";

// Repository class
export class FormRepository {
    private model: Model<IForm>;
  
    constructor(model: Model<IForm>) {
      this.model = model;
    }
  
    // Function to read all values from the schema
    async getAllFormsById(formID: string): Promise<IForm[]> {
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

    // Function to create a new form
  async createForm(formID: string, answers: Record<string, any>): Promise<Boolean> {
    if (!mongoose.Types.ObjectId.isValid(formID)) {
      throw new Error(`Invalid formID: ${formID}`);
    }

    try {
      const newForm = new this.model({ formID: new mongoose.Types.ObjectId(formID), answers });
      await newForm.save();
      return true;
    } catch (error) {
      if(error instanceof Error){
       throw new Error(`Unable to create form: ${error.message}`);
      }
      return false
    }
  }
  }