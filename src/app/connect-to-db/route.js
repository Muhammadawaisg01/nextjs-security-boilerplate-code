
import dbConnect from "@/lib/db_connect";

export async function GET(req) {
    try {
        // Establish MongoDB connection
        await dbConnect();

        // You can add logic here to interact with the database, e.g., adding a test document.

        return new Response(JSON.stringify({ message: 'Database connected successfully!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return new Response(JSON.stringify({ error: 'Database connection failed!' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
