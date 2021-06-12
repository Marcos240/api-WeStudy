const examsRouter = require('./exams');
const testExamsRouter = require('./testExams');
const questionsRouter = require('./questions');
const usersRouter = require('./users');
const testRegistersRouter = require('./testRegisters');

function route(app) {
    app.use('/exams', examsRouter);
    app.use('/testExams', testExamsRouter);
    app.use('/questions', questionsRouter);
    app.use('/users', usersRouter);
    app.use('/testRegisters', testRegistersRouter);
}

module.exports = route;
