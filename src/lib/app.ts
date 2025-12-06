import express from 'express';

import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

// import { customDomainAdaptorMiddleware } from '@/middleware';

const app = express();

// Use this if req.path is different between default API Gateway domain and custom domain
// app.use(customDomainAdaptorMiddleware);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(helmet());
app.use(cors());

export default app;
