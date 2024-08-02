import mongoose, { Model } from "mongoose";
import { IFillForm } from "../database/FormAnswers";

// Repository class
export class FillFormRepository {
    private model: Model<IFillForm>;
  
    constructor(model: Model<IFillForm>) {
      this.model = model;
    }
  
    // Function to read all values from the schema
    async getAllFormsById(formID: string): Promise<IFillForm[]> {
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