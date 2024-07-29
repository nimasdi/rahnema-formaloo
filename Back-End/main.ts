import { app } from "./src/app"

const PORT = 3000

app.listen(PORT,() => {
    console.log(`app run on port ${PORT}`)
})