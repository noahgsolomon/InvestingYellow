

export type Leaderboard = {
    character: 'MR_BURNS' | 'LISA' | 'HOMER' | 'CLOWN' | 
    'NED' | 'MARGE' | 'BARNEY' | 'NONE';
    rating: number;
    account_id: string;
};

export type fullLeaderboardList = {
    character: 'MR_BURNS' | 'LISA' | 'HOMER' | 'CLOWN' | 
    'NED' | 'MARGE' | 'BARNEY' | 'NONE';
    rating: number;
    account_id: string;
    name: string;
    id: number;
}[]