import { IForm } from "../database/FormAnswers";
import { FormRepository } from "../repositories/Form.repository";
  
type AnswerKeys = keyof IForm['answers'];

type Answers = {
    [K in AnswerKeys]: any[];
};

export class FormService {
    private formRepository: FormRepository;
  
    constructor(formRepository: FormRepository) {
      this.formRepository = formRepository;
    }
  
    async getFormsByFormID(formID: string): Promise<Answers> {
      try {
        const formsResults =  await this.formRepository.getAllFormsById(formID);
       
        const groupedAnswers = formsResults.reduce<Answers>((acc, form) => {
          for (const key in form.answers) {
            if (form.answers.hasOwnProperty(key)) {
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(form.answers[key]);
            }
          }
          return acc;
        }, {});

        return groupedAnswers;
        // const keys = formResults 
      } catch (error) {
        if(error instanceof Error){
            throw new Error(`Error getting forms by formID: ${error.message}`);
        }
        return {}
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