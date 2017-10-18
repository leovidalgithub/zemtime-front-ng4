// tslint:disable-next-line:class-name
export interface iCalendars {
    id: string;
    type: number;
    name: string;
    years: [
        {
            year: number;
            days: number[];
        }
    ];
}
