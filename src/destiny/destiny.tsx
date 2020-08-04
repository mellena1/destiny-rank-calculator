import React, { Component, ReactNode } from "react";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import './destiny.css';

type PointRange = [number, number];

const DESTINYRANKS: DestinyRank[] = [
    {name: 'Guardian I', pointRange: [0, 39]},
    {name: 'Guardian II', pointRange: [40, 109]},
    {name: 'Guardian III', pointRange: [110, 199]},

    {name: 'Brave I', pointRange: [200, 369]},
    {name: 'Brave II', pointRange: [370, 664]},
    {name: 'Brave III', pointRange: [665, 1049]},
    
    {name: 'Heroic I', pointRange: [1050, 1259]},
    {name: 'Heroic II', pointRange: [1260, 1624]},
    {name: 'Heroic III', pointRange: [1625, 2099]},

    {name: 'Fabled I', pointRange: [2100, 2379]},
    {name: 'Fabled II', pointRange: [2380, 2869]},
    {name: 'Fabled III', pointRange: [2870, 3499]},

    {name: 'Mythic I', pointRange: [3500, 3879]},
    {name: 'Mythic II', pointRange: [3880, 4544]},
    {name: 'Mythic III', pointRange: [4545, 5449]},

    {name: 'Legend', pointRange: [5450, 5549]},
    {name: 'Max', pointRange: [5500, -1]},
]

interface DestinyRank {
    name: string,
    pointRange: PointRange,
}

interface DestinyState {
    ranks: DestinyRank[],
    currentPoints: number,
}

export class Destiny extends Component<any, DestinyState> {
    render(): ReactNode {
        return (
            <div className="Destiny">
                <Container>
                    <Row className="justify-content-md-center">
                        <Form.Group>
                            <Form.Control size="lg" type="text" placeholder="Enter Current Points Here" onChange={this.onPointChange} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Point Range</th>
                                    <th>Points To Get To Rank</th>
                                    <th>Wins To Get To Rank</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.generateTableRows()}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        );
    }

    onPointChange(event: React.ChangeEvent<HTMLInputElement>) {
        const numPoints = parseInt(event.target.value);
        if (isNaN(numPoints) || numPoints < 0) {
            return;
        }

        this.setState({
            ...this.state,
            currentPoints: numPoints,
        });
    }

    generateTableRows(): ReactNode {
        return (
            this.state.ranks.map(rank => {
                const rankRange = rank.pointRange[1] >= 0 ? `${rank.pointRange[0]}-${rank.pointRange[1]}` : `${rank.pointRange[0]}`;
                const neededPoints = this.pointsToGetToRank(this.state.currentPoints, rank);
                const neededWins = this.numberOfWinsToGetToRank(neededPoints, 0);
                return (
                    <tr>
                        <td>{rank.name}</td>
                        <td>{rankRange}</td>
                        <td>{neededPoints > 0 ? `${neededPoints}` : "-"}</td>
                        <td>{neededWins > 0 ? `${neededWins}` : "-"}</td>
                    </tr>
                );
            })
        );
    }

    getWinstreakBonus(wins: number): number {
        if (wins >= 5) {
            return 120;
        }
        return 20 + (wins * 20);
    }

    numberOfWinsToGetToRank(pointsNeeded: number, winStreak: number = 0): number {
        if (pointsNeeded <= 0) {
            return 0;
        }
        const newPointsNeeded = pointsNeeded - this.getWinstreakBonus(winStreak+1);
        return 1 + this.numberOfWinsToGetToRank(newPointsNeeded, winStreak+1);
    }

    pointsToGetToRank(currentPoints: number, rank: DestinyRank): number {
        return rank.pointRange[0] - currentPoints;
    }

    constructor(props: any) {
        super(props);

        this.state = {
            ranks: DESTINYRANKS,
            currentPoints: 0,
        };

        this.onPointChange = this.onPointChange.bind(this);
        this.generateTableRows = this.generateTableRows.bind(this);
    }
}
