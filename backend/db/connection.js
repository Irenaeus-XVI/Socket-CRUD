import mongoose from "mongoose"

export const connection = () => {
    mongoose.connect(process.env.DB_CONNECTIONS).then(() => console.log('Db Connected')
    ).catch(err => console.log("Error", err)
    );
}