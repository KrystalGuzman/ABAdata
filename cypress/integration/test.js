describe('ABAdata app testing', () => {
    // beforeEach(() => {
    //     cy.visit('https://aba-data.vercel.app/');
    // });
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
    describe('Filling out input', () => {
        it('should type things into task', () => {
            taskInput()
            .should('have.value', '')
            .type('crying')
            .should('have.value', 'crying');
            })

        it('should increment counter twice', () => {
            frequencyBtn()
            .click();
            cy.contains(/frequency: 1/i).should('exist');
    
            frequencyBtn()
            .click();
            cy.contains(/frequency: 2/i).should('exist');
        })
        it('should start and stop timer twice after 2 seconds', () => {
            startBtn().click();
            cy.wait(2000);
            stopBtn().click();
            cy.contains(/00:00:02/i).should('exist');
    
            startBtn().click();
            cy.wait(2000);
            stopBtn().click();
            cy.contains(/00:00:04/i).should('exist');
        });
    });
    describe('Saving', () => {
        it('should save the task and numbers', () =>{
            saveBtn().click();
            cy.contains(/crying/i).should('exist');
            cy.contains(/00:00:04/i).should('exist');
            cy.contains(/2/i).should('exist');
        });
    });
    describe('Filling out input', () => {
        it('should type things into task', () => {
            taskInput()
            .clear()
            .should('have.value', '')
            .type('doing homework')
            .should('have.value', 'doing homework');
            })

        it('should increment counter once', () => {
            frequencyBtn()
            .click();
            cy.contains(/frequency: 1/i).should('exist');
    
        })
        it('should start and stop timer after 2 seconds', () => {
            startBtn().click();
            cy.wait(5000);
            stopBtn().click();
            cy.contains(/00:00:05/i).should('exist');
        });
    });
    describe('Resetting', () => {
        it('should reset the task and numbers', () =>{
            resetBtn().click();
            cy.contains(/doing homework/i).should('not.exist');
            cy.contains(/00:00:00/i).should('exist');
            cy.contains(/frequency: 0/i).should('exist');
        });
    });
    describe('Export history', () => {
        it('should export the task and numbers for crying', () =>{
            exportHistoryBtn().click();
            // cy.readFile('table (8).csv')
            // cy.contains(/crying/i).should('exist');
            // cy.contains(/00:00:04/i).should('exist');
            // cy.contains(/frequency: 2/i).should('exist');
        });
    });
    describe('Clearing History', () => {
        it('should reset the task and numbers in history', () =>{
            clearHistoryBtn().click();
            cy.contains(/crying/i).should('not.exist');
            cy.contains(/00:00:04/i).should('not.exist');
            cy.contains(/frequency: 2/i).should('not.exist');

            taskInput()
            .clear()
        });
    });
});