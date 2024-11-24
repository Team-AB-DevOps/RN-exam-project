export default interface ITale {
    id: string;
    title: string;
    description: string;
    date: Date;
    coordinate: { latitude: number; longitude: number };
}
