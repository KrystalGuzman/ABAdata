// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//helpers
const taskInput = () => cy.get('input[id=task]');
const frequencyBtn = () => cy.get('button[id=counter]');
const startBtn = () => cy.get('button[id=start]');
const stopBtn = () => cy.get('button[id=stop]');
const resetBtn = () => cy.get('button[id=reset]');
const saveBtn = () => cy.get('button[id=save]');
const clearHistoryBtn = () => cy.get('button[id=clear]');
const exportHistoryBtn = () => cy.get('button[id=export]');
const madeUpBtn = () => cy.get('button[id=fake]');

let timeConvert = (time) => {
    var hours = Math.floor(time / 60 / 60);
    var minutes = Math.floor(time / 60) - (hours * 60);
    var seconds = time % 60;

    var formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    return formatted;
};

Cypress.Commands.add('addingTaskData', (task) => {
        taskInput()
        .clear()
        .should('have.value', '')
        .type(task)
        .should('have.value', task);
})

Cypress.Commands.add('incrementCounter', (number) => {
        for (let i=0; i<number;i++){
    
            frequencyBtn()
            .click();
        }
        cy.contains(number).should('exist');
})

Cypress.Commands.add('incrementTimer', (seconds) => {
        startBtn().click();
        cy.wait(seconds*1000);
        stopBtn().click();
        //if under 1 minute
        
});

Cypress.Commands.add('savingData', (task,freq,time) => {
        saveBtn().click();
        cy.contains(task).should('exist');
        cy.contains(freq).should('exist');
        cy.contains(timeConvert(time)).should('exist');
});

Cypress.Commands.add('resettingData', (task,freq,time) => {
        resetBtn().click();
        cy.contains(task).should('not.exist');
        cy.contains(freq).should('not.exist');
        cy.contains(timeConvert(time)).should('not.exist');
});
