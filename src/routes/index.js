const examsRouter = require('./exams');
const testExamsRouter = require('./testExams');
const questionTestExamsRouter = require('./questionTestExams');
const usersRouter = require('./users');
const testRegistersRouter = require('./testRegisters');
const exercisesRouter = require('./excercises')
const questionExercisesRouter = require('./questionExercises');

function route(app) {
    app.use('/exams', examsRouter);
    app.use('/testExams', testExamsRouter);
    app.use('/questionTestExams', questionTestExamsRouter);
    app.use('/users', usersRouter);
    app.use('/testRegisters', testRegistersRouter);
    app.use('/exercises', exercisesRouter);
    app.use('/questionExercises', questionExercisesRouter);
}

module.exports = route;
