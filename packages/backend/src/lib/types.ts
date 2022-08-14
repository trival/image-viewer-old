export type Maybe<T> = T | null | undefined

export type Await<T> = T extends PromiseLike<infer U> ? U : T
