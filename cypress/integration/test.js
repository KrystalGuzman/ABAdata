import '../support/commands';

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

let task1 = "crying while doing homework"
let task2 = "crying while eating"
let freq1 = 15
let freq2 = 12
let time1 = 6
let time2 = 2
let time3 = 3660



describe('ABAdata App Testing', () => {
    // beforeEach(() => {
    //     cy.visit('https://aba-data.vercel.app/');
    // });
    
    it('should display the starting elements', () => {
        cy.visit('https://aba-data.vercel.app/');
        taskInput().should('exist');
        frequencyBtn().should('exist');
        startBtn().should('exist');
        stopBtn().should('exist');
        resetBtn().should('exist');
        saveBtn().should('exist');
        clearHistoryBtn().should('exist');
        exportHistoryBtn().should('exist');
        madeUpBtn().should('not.exist');

        cy.contains(/abadata/i).should('exist');
        cy.contains(/controls/i).should('exist');
        cy.contains(/frequency: 0/i).should('exist');
        cy.contains(/timer/i).should('exist');
        cy.contains(/history/i).should('exist');
        cy.contains(/behavior/i).should('exist');
        cy.contains(/date/i).should('exist');
        cy.contains(/time/i).should('exist');
        cy.contains(/00:00:00/i).should('exist');
    });
    it('can get URL correctly', () => {
        cy.url().should('include', 'aba-data');
    });

    describe('Saving Data', () => {
        it('should add data to the task and save', () => {
            cy.addingTaskData(task1),
            cy.incrementCounter(freq1),
            cy.incrementTimer(time1)
            cy.savingData(task1,freq1,time1)
        })
    })

    describe('Resetting Data', () => {
        it('should add data to the task and reset', () => {
            cy.addingTaskData(task2),
            cy.incrementCounter(freq2),
            cy.incrementTimer(time2)
            cy.resettingData(task2,freq2,time2)
        })
    })
    // describe('Export history', () => {
    //     it('should export the task and numbers for crying', () =>{
    //         exportHistoryBtn().click();
    //     });
    // });

    describe('Clearing History', () => {
        it('should reset the task and numbers in history', () =>{
            clearHistoryBtn().click();
            cy.contains(task1).should('not.exist');
            cy.contains(freq1).should('not.exist');
            cy.contains(timeConvert(time1)).should('not.exist');
            taskInput()
            .clear()
        });
    });
});