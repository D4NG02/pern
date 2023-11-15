import { Router, Request, Response } from 'express';

const routerGraph = Router();

class Graph {
    dataInDay: object;
    dataInWeek: object

    constructor() {
        let day = this.generateDataDay()
        this.dataInDay = new Object(day)
        let week = this.generateDataWeek()
        this.dataInWeek = new Object(week)
    }

    generateDataDay() {
        let min: number = 2000
        let max: number = 10000
        let time: string[] = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
            '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
        // let time: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        let value: number[]=[]
        let difference: number = max - min;
        let random: number

        time.forEach((time: string, key: number) => {
            random = Math.random();
            random = Math.floor(random * difference);
            random = random + min;
            value.push(random)
        })
        return { time, value }
    }


    generateDataWeek(){
        let min: number = 2000
        let max: number = 10000
        let time: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let value: number[]=[]
        let difference: number = max - min;
        let random: number

        time.forEach((time: string, key: number) => {
            random = Math.random();
            random = Math.floor(random * difference);
            random = random + min;
            value.push(random)
        })
        return { time, value }
    }
}


// Get all currency API
routerGraph.get("/gets", (req: Request, res: Response) => {
    console.log("Get all graph")

    var data = new Graph()
    res.json(data);
})



export default routerGraph;