export class RankRange {
    private _topRank: number;
    private _bottomRank: number;

    constructor(topRank: number, bottonRank: number) {
        this._topRank = topRank;
        this._bottomRank = bottonRank;
    }

    set topRank(topRank: number) {
        this._topRank = topRank;
    }

    set bottomRank(bottomRank: number) {
        this._bottomRank = bottomRank;
    }

    get topRank() {
        return this._topRank;
    }

    get bottomRank() {
        return this._bottomRank;
    }
}