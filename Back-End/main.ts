import { startServer } from "./src/app"

const PORT = 3000

export const app = startServer().then(
    app => app?.listen(PORT, () => console.log(`Server running on port ${PORT}`))
);
