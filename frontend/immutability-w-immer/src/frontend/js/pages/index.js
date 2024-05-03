const { produce } = require('immer');

(() => {
    const employee = {
        name: 'John Doe',
        age: 30,
        role: 'Software Engineer',
        company: {
            country: 'United States',
            city: 'San Francisco',
        }
    };

    const updatedEmployee = produce(employee, draft => {
        draft.age = 31;
        draft.company.city = 'Los Angeles';
    });

    console.log('Original employee:', employee);
    console.log('Updated employee:', updatedEmployee);
})();
