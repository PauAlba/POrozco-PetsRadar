// import * as appInsights from 'applicationinsights';
// import winston from 'winston';
// import { envs } from './envs';

// appInsights
//     .setup(envs.APPINSIGHTS_CONNECTION_STRING)
//     .setSendLiveMetrics(true)
//     .setAutoCollectConsole(false)
//     .start();

// const aiClient = appInsights.defaultClient;
// const appInsightsTransport = new winston.transports.Console({
//     level: "info",
//     format: winston.format.printf((obj) => {
//         const { level, message, timeStamp } = obj;

//         if (aiClient) {   // ← solo trackea si el cliente existe
//             aiClient.trackTrace({
//                 message: `[${level} ${message} ${timeStamp}]`,
//                 properties: { timeStamp }
//             });
//         }
//         return `[${level} ${message} ${timeStamp}]`;
//     })
// });

// export const logger = winston.createLogger({
//     level: "info",
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json()
//     ),
//     transports: [
//         new winston.transports.Console(),
//         appInsightsTransport
//     ]

// });
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});
