export class D1Adapter {
    db: any;

    constructor(db: any) {
        this.db = db;
    }

    prepare(query: string) {
        const stmt = this.db.prepare(query);
        return new D1PreparedStatement(stmt);
    }

    async batch(statements: any[]) {
        // Not implemented for this simple demo
        return [];
    }

    async exec(query: string) {
        return this.db.exec(query);
    }
}

class D1PreparedStatement {
    stmt: any;
    params: any[];

    constructor(stmt: any) {
        this.stmt = stmt;
        this.params = [];
    }

    bind(...params: any[]) {
        this.params = params;
        return this;
    }

    async first(colName?: string) {
        const result = this.stmt.get(...this.params);
        if (!result) return null;
        if (colName) return result[colName];
        return result;
    }

    async all() {
        const results = this.stmt.all(...this.params);
        return { results };
    }

    async run() {
        const result = this.stmt.run(...this.params);
        return {
            success: true,
            meta: {
                last_row_id: result.lastInsertRowid,
                changes: result.changes
            }
        };
    }
}
