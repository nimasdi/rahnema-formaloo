import { IForm } from "../database/FormAnswers";
import { FormRepository } from "../repositories/Form.repository";
  
// Extract the type of the 'answers' field from IForm
type AnswersType = IForm['answers'];
  
// Define a new interface that uses the extracted type for 'answers'
export interface Answers extends AnswersType {
    formID : string,
    [key: string]: any; 
}

class FormService {
    private formRepository: FormRepository;
  
    constructor(formRepository: FormRepository) {
      this.formRepository = formRepository;
    }
  
    async getFormsByFormID(formID: string): Promise<IForm[]> {
      try {
        const formsResults =  await this.formRepository.getAllFormsById(formID);
        return formsResults;
        // const keys = formResults 
      } catch (error) {
        if(error instanceof Error){
            throw new Error(`Error getting forms by formID: ${error.message}`);
        }
        return []
      }
    }

    async createForm(formID: string, answers: Record<string, any>): Promise<Boolean> {
      try {
        return await this.formRepository.createForm(formID, answers);
      } catch (error) {
        if(error instanceof Error){
          throw new Error(`Error creating form: ${error.message}`);
        }
        return false
      }
    }
  }