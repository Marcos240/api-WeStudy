const examsRouter = require('./exams');
const testExamsRouter = require('./testExams');
const questionsRouter = require('./questions');
const usersRouter = require('./users');

function route(app) {
    app.use('/exams', examsRouter);
    app.use('/testExams', testExamsRouter);
    app.use('/questions', questionsRouter);
    app.use('/users', usersRouter);
}

module.exports = route;
