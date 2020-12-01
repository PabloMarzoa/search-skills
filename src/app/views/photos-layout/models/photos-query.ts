import {Photo} from './photo';

export interface PhotosQuery {
    results: Photo[];
    total: number;
    total_pages: number;
}
