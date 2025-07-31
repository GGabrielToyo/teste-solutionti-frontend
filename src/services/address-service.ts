import type { AddressDtoList, CreateAddressDto } from "@/interfaces/address-interface";
import type { UserDto } from "@/interfaces/user-interface";
import { api } from "@/lib/axios";
import { UserService } from "./user-service";

export const AddressService = {
    async getAddress() {
        const user: UserDto = await UserService.getUserByCookies()
        if (!user) {
            throw new Error("User not found");
        }

        const url: string = user.role === "ADMIN" ? "/address/all" : `/address/all/${user.id}`;

        const response = await api.get(url);
        if (!response.data) {
            throw new Error("No addresses found");
        }

        const addressList: AddressDtoList = response.data

        return addressList;
    },

    async createAddress(data: CreateAddressDto) {
        const response = await api.post("/address/create", data);

        if (!response.data) {
            throw new Error("Erro ao cadastrar endereço");
        }

        return response.data;
    }
}