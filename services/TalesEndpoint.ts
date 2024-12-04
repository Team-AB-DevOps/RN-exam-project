import FirebaseClient, { TBody } from "./FirebaseClient";

class TalesEndpoint {
    public static async createTale(personId: string, body: TBody): Promise<string> {
        const client = new FirebaseClient();
        const id = await client.Post(`${personId}`, body);

        return id;
    }

    public static async updateTale(personId: string, taleId: string, body: TBody): Promise<void> {
        const client = new FirebaseClient();
        await client.Put(personId, taleId, body);
    }

    public static async deleteTale(personId: string, taleId: string): Promise<void> {
        const client = new FirebaseClient();
        await client.Delete(personId, taleId);
    }
}

export default TalesEndpoint;
