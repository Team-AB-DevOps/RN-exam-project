import FirebaseClient, { TBody } from "./FirebaseClient";


class RestaurantsEndpoint {
    public static async createRestaurant(body: TBody): Promise<string> {
        const client = new FirebaseClient();
        const id = await client.Post("restaurants", body);

        return id;
    }

    public static async updateRestaurant(id: string, body: TBody): Promise<void> {
        const client = new FirebaseClient();
        await client.Put("restaurants", id, body);
    }

    public static async deleteRestaurant(id: string): Promise<void> {
        const client = new FirebaseClient();
        await client.Delete("restaurants", id);
    }
}

export default RestaurantsEndpoint;
