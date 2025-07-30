import type { AddressDtoList } from "@/interfaces/address-interface";
import { api } from "@/lib/axios";

export const AddressService = {
    async getAddress() {
        const response = await api.get("/address/all");

        if (!response.data) {
            throw new Error("No addresses found");
        }

        const addressList: AddressDtoList = response.data

        return addressList;
    }
}