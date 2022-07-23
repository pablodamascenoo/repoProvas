import bcrypt from "bcrypt";
import client from "../config/database.js"

async function main() {
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync("1234567890", SALT);

    await client.$executeRaw`TRUNCATE TABLE users`;

    await client.user.upsert({
        where: { email: "admin@gmail.com" },
        update: {},
        create: {
            email: "admin@gmail.com",
            password: hashedPassword,
        },
    });
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await client.$disconnect();
    });