const examsRouter = require('./exams');

function route(app) {
    app.use('/exams', examsRouter);
}

module.exports = route;
