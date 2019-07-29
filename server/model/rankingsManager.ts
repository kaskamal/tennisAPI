import { Router } from 'express';
import * as axios from 'axios';
import * as cheerio from 'cheerio';
import { rankRange } from './util';

// Format of individual ranking information
interface IRanking {
    "ranking": string,
    "country": string,
    "player": string,
    "age": string,
    "points": number,
    "tournaments_played": number
}

const ATP_RANKINGS = 'https://www.atptour.com/en/rankings/';

export class rankingsManager {
    private _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    public extractRankings(type: string, rankRange?: rankRange) { 
        const queryString: string = this.extractRankingQuery(type, rankRange);
        axios.default.get(queryString).then((response) => {
            const $ = cheerio.load(response.data);
            const rankings = this.parseRankings($);
    
            // ATP singles rankings response
            this._router.get('/rankings/'.concat(type), (req, res) => {
                res.json(rankings);
            });
        });
    }

    private extractRankingQuery(type: string, rankRange?: rankRange): string {
        let url_query: string = ATP_RANKINGS.concat(type);
        if (rankRange) {
            url_query.concat("?");
            url_query.concat(`rankRange=${rankRange.topRank}-${rankRange.bottomRank}`);
        }
        return url_query;
    }

    private parseRankings($): IRanking[] {
        let rankings = [];
        let countries = [];
        let players = [];
        let ages = [];
        let points = [];
        let tournaments = [];
    
        // Scraping rankings
        $('.mega-table tbody tr .rank-cell').each((i, td) => {
            rankings.push($(td).text().trim());
        });
    
        // Scraping countries
        $('.mega-table tbody tr .country-cell .country-inner .country-item img').each((i, img) => {
            countries.push($(img).attr('alt'));
        });
    
        // Scraping names
        $('.mega-table tbody tr .player-cell').each((i, td) => {
            players.push($(td).text().trim());
        });
    
        // Scraping ages
        $('.mega-table tbody tr .age-cell').each((i, td) => {
            ages.push($(td).text().trim());
        });
    
        // Scraping points
        $('.mega-table tbody tr .points-cell').each((i, td) => {
            points.push($(td).text().trim());
        });
    
        // Scraping tournaments played
        $('.mega-table tbody tr .tourn-cell').each((i, td) => {
            tournaments.push($(td).text().trim());
        });
    
        let JSONResponse: IRanking[] = [];
        // Convert each entry to JSON response
        for (let i = 0; i < rankings.length; i++){
            JSONResponse.push({
              "ranking": rankings[i],
              "country": countries[i],
              "player": players[i],
              "age": ages[i],
              "points": points[i],
              "tournaments_played": tournaments[i]
            })
        }
    
        return JSONResponse;
    }
}