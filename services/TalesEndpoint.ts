import FirebaseClient, { TBody } from "./FirebaseClient";

class TalesEndpoint {
    public static async createTale(personId: string, body: TBody): Promise<string> {
        const client = new FirebaseClient();
        const id = await client.Post(`${personId}`, body);

        return id;
    }
}

export default TalesEndpoint;
