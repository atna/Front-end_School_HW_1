import { FeedItem } from './FeedItem.interface'

export interface UserStats {
    followerCount: number;
    followingCount: number;
    heart: number;
    heartCount: number;
    videoCount: number;
    diggCount: number;
}

export interface UserData {
    id: string;
    shortId: string;
    uniqueId: string;
    nickname: string;
    avatarLarger: string;
    avatarMedium: string;
    avatarThumb: string;
    signature: string;
    createTime: number;
    verified: boolean;
    secUid: string;
    ftc: boolean;
    relation: number;
    openFavorite: boolean;
    commentSetting: number;
    duetSetting: number;
    stitchSetting: number;
    privateAccount: boolean;
    secret: boolean;
    isADVirtual: boolean;
    roomId: string;
}

export interface UserInfo {
    itemList: FeedItem[]
    stats: UserStats,
    data: UserData
}
