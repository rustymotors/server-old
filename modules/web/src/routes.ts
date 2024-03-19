/* 
Rusty Motors provides a server for a legacy commercial racing game
Copyright (C) 2024  Molly Crendraven

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { IncomingMessage, ServerResponse } from "node:http";
import { IRoute } from "./types.js";

export class Routes {
    routes: IRoute[] = [];

    add(route: IRoute) {
        this.routes.push(route);
    }

    find(url: string, method: string): IRoute | undefined {
        return this.routes.find((route) => route.canHandle(url, method));
    }
}

export const routes = new Routes();
