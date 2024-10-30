import { makeAutoObservable, runInAction } from "mobx";

export class AsyncExecution<Fn extends (...args: any) => Promise<unknown>> {
    constructor(private fn: Fn) {
        makeAutoObservable(this, undefined, { autoBind: true });
    }

    private _promise: ReturnType<Fn> | null = null;

    private _error: unknown = null;

    private _lastResult: Awaited<ReturnType<Fn>> | null = null;

    get error(): any { return this._error; }
    get isPending(): boolean { return !!this._promise; }
    get result(): any { return this._lastResult; }
    get promise(): ReturnType<Fn> | null { return this._promise; }

    private setPromise = (promise: ReturnType<Fn> | null) => {
        runInAction(() => {
            this._promise = promise;
        });
    };

    private setResult = (result: Awaited<ReturnType<Fn>> | null, error: unknown) => {
        runInAction(() => {
            this._lastResult = result;
            this._error = error;
        });
    };

    tryinglaunch(...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> | null {
        if (this._promise) { return null; }

        return this.launch(...args);
    }

    launch(...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> {
        return this._launch(...args);
    }

    private async _launch(...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> {
        try {
            this.setPromise(this.fn(...[...args]) as Awaited<ReturnType<Fn>>);

            const result = await this._promise!;
            this.setResult(result, null);
            this.setPromise(null);

            return result;
        } catch (e) {
            this.setResult(null, e);
            this.setPromise(null);
            throw e;
        }
    }
}