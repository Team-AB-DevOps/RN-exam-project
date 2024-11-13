import FirebaseClient, { TBody } from "./FirebaseClient";

class NotesEndpoint {
    public static async createNote(personId: string, body: TBody): Promise<string> {
        const client = new FirebaseClient();
        const id = await client.Post(`${personId}`, body);

        return id;
    }

    public static async updateNote(personId: string, noteId: string, body: TBody): Promise<void> {
        const client = new FirebaseClient();
        await client.Put(`${personId}`, noteId, body);
    }

    public static async deleteNote(personId: string, noteId: string): Promise<void> {
        const client = new FirebaseClient();
        await client.Delete(`${personId}`, noteId);
    }
}

export default NotesEndpoint;
