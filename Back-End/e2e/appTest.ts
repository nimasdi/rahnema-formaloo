import { startServer } from '../src/app';

export const initTestServer = async () => {
    const server = await startServer();
    return server; 
};
