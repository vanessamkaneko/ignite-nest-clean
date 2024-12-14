// UI -> controller -> use case -> entity -> use case -> repository -> database (right -> SUCCESS)
// UI <- controller <- use case <- entity <- use case <- repository <- database (left -> FAILURE)

// ERROR
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }
}

// SUCCESS
export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R> (value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R> (value: R): Either<L, R> => {
  return new Right(value)
}

/* The <> syntax in TypeScript is used to create generic functions, classes, or interfaces. 
Generics allow a function, class, or interface to work with parameteres that
has different types while ensuring type safety. */