export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    offset: number;
    sort: Sort;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}