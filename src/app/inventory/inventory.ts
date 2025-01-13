import { Injectable } from '@angular/core';
import { Employee } from './user';

@Injectable()
export class Inventory {
  size = 20;
  private _all: Employee[] = [];
  private _currentQuery: Employee[] | undefined;

  filter(filters: { [key: string]: string[] }): Inventory {
    this._checkCurrentQuery();
    if (filters) {
      for (const key in filters) {
        if (filters[key].length === 0) {
          continue;
        }

        let getFilterProperty = (user: Employee) => '' + user[key];
        // if (key === 'pokemon') {
        //   getFilterProperty = (user: Employee) => user.pokemon.name;
        // }

        const lowerCase = filters[key].map((value) => value.toLowerCase());
        this._currentQuery = this._currentQuery?.filter((user) => {
          for (const value of lowerCase) {
            if (getFilterProperty(user).toLowerCase().indexOf(value) >= 0) {
              return true;
            }
          }
          return false;
        });
      }
    }
    return this;
  }

  sort(sort: { by: string; reverse: boolean } | undefined): Inventory {
    this._checkCurrentQuery();
    if (sort && sort.by) {
      let getSortProperty = (user: Employee) => user[sort.by];
      // if (sort.by === 'pokemon') {
      //   getSortProperty = (user: Employee) => user.pokemon.number;
      // }

      this._currentQuery?.sort((a, b) => {
        let comp = 0;
        const propA = getSortProperty(a),
          propB = getSortProperty(b);
        if (propA < propB) {
          comp = -1;
        } else if (propA > propB) {
          comp = 1;
        }
        if (sort.reverse) {
          comp = -comp;
        }
        return comp;
      });
    }
    return this;
  }

  private _checkCurrentQuery() {
    if (!this._currentQuery) {
      this._currentQuery = this._all.slice();
    }
  }
}
