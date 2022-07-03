interface Lock<T> {
    locked: boolean;
    run: (runner: () => Promise<T>) => Promise<T>;
}
interface LockOptions {
}
declare function useLock<T>({}: LockOptions): Lock<T>;
export default useLock;
