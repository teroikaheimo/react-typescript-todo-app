
enum LogLevel{
    NONE,
    ERROR,
    DEBUG,
    INFO
}
class LoggerService {
    private logLevel= LogLevel.INFO;
    setLogLevel(logLevel:LogLevel){
        this.logLevel = logLevel;
    }

    logInfo(...params){
        this.log(LogLevel.INFO,()=>{console.info(...params)})
    }

    logDebug(...params){
        this.log(LogLevel.DEBUG,()=>{console.debug(...params)})
    }

    logError(...params){
        this.log(LogLevel.ERROR,()=>{console.error(...params)})
    }

    private log(logLevel:LogLevel, errorMessageCallback){
        if(logLevel <= this.logLevel){
            errorMessageCallback();
        }
    }
}

export const loggerService = new LoggerService();
