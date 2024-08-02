import { IFillForm } from "../database/FormAnswers";
import { FillFormRepository } from "../repositories/FillForm.repository";
  
type AnswerKeys = keyof IFillForm['answers'];

type Answers = {
    [K in AnswerKeys]: any[];
};

export class FillFormService {
    private fillFormRepository: FillFormRepository;
  
    constructor(formRepository: FillFormRepository) {
      this.fillFormRepository = formRepository;
    }
  
    async getFormsByFormID(formID: string): Promise<Answers> {
      try {
        const formsResults =  await this.fillFormRepository.getAllFormsById(formID);
       
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
        console.log(error)
        if(error instanceof Error){
            throw new Error(`Error getting forms by formID: ${error.message}`);
        }
        return {}
      }
    }

    async createForm(formID: string, answers: Record<string, any>): Promise<Boolean> {
      try {
        return await this.fillFormRepository.createForm(formID, answers);
      } catch (error) {
        if(error instanceof Error){
          throw new Error(`Error creating form: ${error.message}`);
        }
        return false
      }
    }
}