// tslint:disable-next-line:class-name
export interface iCalendars {
    id: number;
    type: number;
    name: string;
    years: [
        {
            year: number;
            days: number[];
        }
    ];
}
