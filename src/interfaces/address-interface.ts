import type { Pageable, Sort } from "./pageable-interface";
import type { UserDto } from "./user-interface";

export interface AddressDto {
    id: string,
    street: string,
    district: string,
    city: string,
    region: string,
    user: UserDto
}

export interface CreateAddressDto {
    zipCode: string,
    street: string,
    complement: string | undefined,
    unit: string | undefined,
    district: string,
    city: string,
    stateAbbr: string,
    region: string
    ibgeCode: string | undefined,
    giaCode: string | undefined,
    areaCode: string | undefined,
    siafiCode: string | undefined,
    userId: string
}

export interface UpdateAddressDto {
    id: string,
    zipCode: string,
    street: string,
    complement: string | undefined,
    unit: string | undefined,
    district: string,
    city: string,
    stateAbbr: string,
    region: string,
    ibgeCode: string | undefined,
    giaCode: string | undefined,
    areaCode: string | undefined,
    siafiCode: string | undefined
}

export interface AddressDtoList {
    totalPages: number;
    totalElements: number;
    size: number;
    content: AddressDto[];
    number: number;
    sort: Sort;
    pageable: Pageable;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}