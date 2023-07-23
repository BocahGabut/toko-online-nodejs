import express from "express";
import "dotenv/config";
import userRouter from "./routers/userRouter.js";
import Response from "./utils/response.js";

const app = express();

const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());

app.use("/user", userRouter);

app.use((err, req, res, next) => {
    console.log(err.message);
    Response.errorResp(res, "internal server error", 500);
})

app.listen(port, host, () => {
    console.log(`server berjalan di http://${host}:${port}`);
});
