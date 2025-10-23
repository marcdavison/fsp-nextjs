class PointsCalculation {
    public calcGameScore(game: any, prediction: any): number {
        const points = this.getGamePoints(game, prediction);
        return points;
    }

    private getGamePoints(realGame: any, userGame: any): number {
        const realResult = this.getResultType({
            home: realGame.home.goals,
            away: realGame.away.goals
        });
        const userResult = this.getResultType(userGame);

        const extra = 0;
        if (realResult.type === userResult.type) {
            switch (realResult.type) {
                case 'DRAW' :
                    if (realResult.goals === userResult.goals) {
                        // predicted goals
                        return 15 + extra;
                    } else {
                        // not predicted goals
                        return 10 + extra;
                    }
                break;
                case 'HOME-WIN':
                case 'AWAY-WIN':
                    if ((realGame.home.goals === userGame.home) && (realGame.away.goals === userGame.away)) { // goals correct
                        return 15 + extra;
                    } else if (realResult.goals === userResult.goals) { // check the difference
                        return 10 + extra;
                    } else {
                        return 5 + extra;
                    }
                break;
            }
        }
        return 0;
    }

    private getResultType(game: {
        home: number;
        away: number;
    }) {
        if (game.home === game.away) {
            return {
                type: 'DRAW',
                goals: game.home 
            };
        } else if (game.home > game.away) {
            return {
                type: 'HOME-WIN',
                goals: game.home - game.away
            };
        } else {
            return {
                type: 'AWAY-WIN',
                goals: game.away - game.home
            };
        }
    }


    // below 2 methods are only used for wildcard usage
    private getGamePointsWithWildCard(game: any, userGame: any, gameWeekId: number, wildCardDetails: any) {
        // console.log('IN THE UPDATE WITH WILDCARD....THIS IS THE GAME, ', game);
        // console.log("wildCardDetails ....", wildCardDetails);
        // update score with prediction
        const copyGame = JSON.parse(JSON.stringify(game));
        game.prediction = JSON.parse(JSON.stringify(wildCardDetails));
        let points = 0;
        if (wildCardDetails.type === 'goalBoostAway') {
        if (copyGame.away) {
            copyGame.away.goals += 1;
        } else {
            copyGame.a.g += 1;
        }
        copyGame.prediction = {
            home: userGame.home,
            away: userGame.away,
        }
        points = this.calcGameScore(copyGame, userGame);
        } else if (wildCardDetails.type === 'goalBoostHome') {
        if (copyGame.home) {
            copyGame.home.goals += 1;
        } else {
            copyGame.h.g += 1;
        }
        copyGame.prediction = {
            home: userGame.home,
            away: userGame.away,
        }
        points = this.calcGameScore(copyGame, userGame);
        } else if (wildCardDetails.type === 'whistle') {
        // user prediction
        if (!isNaN(userGame.points)) {
            // we have points already
            points = this.getFinalWhistleCost(wildCardDetails.time, userGame.points);
        } else {
            // we don't have points
            const calcPointsObject = {
            prediction: {
                home: userGame.home,
                away: userGame.away,
            },
            home: {
                goals: wildCardDetails.goals.home
            },
            away: {
                goals: wildCardDetails.goals.away
            }
            }
            const copyGamePoints = this.calcGameScore(calcPointsObject, userGame);
            points = this.getFinalWhistleCost(wildCardDetails.time, copyGamePoints);
        }
        } else {
        // must be double
        game.prediction.goals = userGame;
        points = (this.calcGameScore(game, userGame) * 2);
        }
        return points;
    }

    // calculate the altered  points based on cash out final whistle
    private getFinalWhistleCost(min: number, start: number): number {
        if (min > 49 && min < 56) {
        return start - 4;
        } else if (min > 59 && min < 66) {
        return start - 3;
        } else if (min > 69 && min < 76) {
        return start - 2;
        } else if (min > 79 && min < 86) {
        return start - 1;
        } else {
        return start;
        }
    }
}

export default PointsCalculation;
