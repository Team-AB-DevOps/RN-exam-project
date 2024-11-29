import FirebaseClient, { TBody } from "./FirebaseClient";

class TalesEndpoint {
    public static async createTale(personId: string, body: TBody): Promise<string> {
        const client = new FirebaseClient();
        const id = await client.Post(`${personId}`, body);

        return id;
    }

    public static async updateTale(personId: string, taleId: string, body: TBody): Promise<void> {
        console.log("SENDING");
        console.log("personId: ", personId);
        console.log("taleId: ", taleId);
        console.log("body: ", body);
        
        const client = new FirebaseClient();
        await client.Put(personId, taleId, body);
    }
}

export default TalesEndpoint;
