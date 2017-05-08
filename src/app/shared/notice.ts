import { Status } from './status';
//import { Priority } from './priority';

export class Notice {

    constructor(
        public id: string,
        public name: string,
        public status: string,
        public priority: number,
        public showpriority: boolean
    ) { }
}
