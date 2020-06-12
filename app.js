const express = require('express'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    expressRestfulHelper = require('express-restful-helper'),
    fs = require('fs'),
    cors = require('cors');

let app = express()
app.use(cors());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({type: 'application/vnd.api+json'}))
app.use(cookieParser())
app.use(expressRestfulHelper({showInfo: true, showHttp: true, showStatus: true}))

app.use(methodOverride('X-HTTP-Method-Override'))

app.set('views', __dirname + '/app/views/');
app.set('view engine', 'pug');

let routes = './app/routes/'
fs.readdirSync(routes).forEach(file => {
	app.use('/', require(routes+file))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log("Error Occured for ", err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

process.on('uncaughtException', (err) => {
    console.error("[ERP : uncaughtException] ", err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error("[ERP : unhandledRejection] ", reason);
});
exports = module.exports = app