export interface Photo {
    alt_description: string;
    blur_hash: string;
    categories: string[];
    color: string;
    created_at: string;
    current_user_collections: string[];
    description: string;
    height: number;
    id: string;
    liked_by_user: boolean;
    likes: number;
    links: {
        download: string;
        download_location: string;
        html: string;
        self: string;
    };
    promoted_at: string;
    sponsorship: string;
    tags: {type: string, title: string}[];
    updated_at: string;
    urls: {
        full: string;
        raw: string;
        regular: string;
        small: string;
        thumb: string;
    };
    user: {
        accepted_tos: boolean;
        bio: string;
        first_name: string;
        id: string;
        instagram_username: string
        last_name: string;
        links: {
            followers: string;
            following: string;
            html: string;
            likes: string;
            photos: string;
            portfolio: string;
            self: string;
        }
        location: string;
        name: string;
        portfolio_url: string;
        profile_image: {
            large: string;
            medium: string;
            small: string;
        }
        total_collections: number;
        total_likes: number;
        total_photos: number;
        twitter_username: string;
        updated_at: string;
        username: string;
    };
    width: number;
}

export interface PhotoInfo {
    alt_description: string;
    blur_hash: string;
    categories: string[];
    color: string;
    created_at: string;
    current_user_collections: string[];
    description: string;
    download: number;
    exif: {
        aperture: string;
        exposure_time: string;
        focal_length: string;
        iso: number;
        make: string;
        model: string;
    };
    height: number;
    id: string;
    liked_by_user: boolean;
    likes: number;
    links: {
        download: string;
        download_location: string;
        html: string;
        self: string;
    };
    location: {
        city: string;
        country: string;
        name: string;
        position: {
            latitude: string;
            longitude: string;
        };
        title: string;
    };
    promoted_at: string;
    sponsorship: string;
    tags: {type: string, title: string}[];
    updated_at: string;
    urls: {
        full: string;
        raw: string;
        regular: string;
        small: string;
        thumb: string;
    };
    user: {
        accepted_tos: boolean;
        bio: string;
        first_name: string;
        id: string;
        instagram_username: string
        last_name: string;
        links: {
            followers: string;
            following: string;
            html: string;
            likes: string;
            photos: string;
            portfolio: string;
            self: string;
        }
        location: string;
        name: string;
        portfolio_url: string;
        profile_image: {
            large: string;
            medium: string;
            small: string;
        }
        total_collections: number;
        total_likes: number;
        total_photos: number;
        twitter_username: string;
        updated_at: string;
        username: string;
    };
    width: number;
}
