import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: "localhost",
    database: "nextTest",
    user: "root",
    password: "Madrilenio3141616_]"
  }
});

export default async function excuteQuery({ query, values }) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}