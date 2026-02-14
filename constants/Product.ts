export type Product = {
    id: number;
    name: string;
    description: string;
    brand: string;
    price: string;
    images: string[];
    merchant_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    merchant?: {
        id: number;
        name: string;
        email: string;
    }
};
