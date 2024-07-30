import Form from "./FormAnswers";

// run with npx ts-node ./scripts/seed.ts command.
const form = [
    {
        formID: "66a93f98fc6427e8d2c5f28f",
        answers: {
            name: "bahar",
            family: "XXX",
            age: 25
        }
    },
    {
        formID: "66a93f98fc6427e8d2c5f28f",
        answers: {
            name: "baha2",
            family: "XXX2",
            age: 26
        }
    },
    {
        formID: "66a93f98fc6427e8d2c5f28f",
        answers: {
            name: "bahar3",
            family: "XXX3",
            age: 27
        }
    },
    {
        formID: "66a93f98fc6427e8d2c5f28f",
        answers: {
            name: "bahar4",
            family: "XXX4",
            age: 28
        }
    },
    {
        formID: "66a93f98fc6427e8d2c5f28f",
        answers: {
            name: "baha5",
            family: "XXX5",
            age: 30
        }
    }
];


export const seedForm = async () => {
    try {

        console.log('Connected to MongoDB');

        const count = await Form.countDocuments();

        if(count === 0){
            await Form.create(form);
        }

        console.log('Seeded forms');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};
