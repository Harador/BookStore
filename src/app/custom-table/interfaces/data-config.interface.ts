import { Observable } from "rxjs";
import { IDataResponse } from "./data.interface";

import { IMeta } from './meta.interface'

export interface IDataConfig {
    fetch: (params?: IMeta) => Observable<IDataResponse>;
}