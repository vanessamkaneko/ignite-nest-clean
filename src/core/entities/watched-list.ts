export abstract class WatchedList<T> {
  public currentItems: T[]
  private initial: T[]
  private new: T[]
  private removed: T[]

  constructor(initialItems?: T[]) {
    this.currentItems = initialItems || []
    this.initial = initialItems || []
    this.new = []
    this.removed = []
  }

  abstract compareItems(a: T, b: T): boolean

  public getItems(): T[] {
    return this.currentItems
  }

  public getNewItems(): T[] {
    return this.new
  }

  public getRemovedItems(): T[] {
    return this.removed
  }

  private isCurrentItem(item: T): boolean {
    return (
      this.currentItems.filter((v: T) => this.compareItems(item, v)).length !== 0
    )
  }

  private isNewItem(item: T): boolean {
    return this.new.filter((v: T) => this.compareItems(item, v)).length !== 0
  }

  private isRemovedItem(item: T): boolean {
    return (
      this.removed.filter((v: T) => this.compareItems(item, v)).length !== 0 /* if the length of the filtered result is not zero, it means the item was found in the removed list. */
    )
  }

  private removeFromNew(item: T): void {
    this.new = this.new.filter((v) => !this.compareItems(v, item))
  }

  private removeFromCurrent(item: T): void {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(item, v), /* Negates the comparison, so it retains only the items that *are not equal* to the item to be removed. */
    )
  }

  private removeFromRemoved(item: T): void {
    this.removed = this.removed.filter((v) => !this.compareItems(item, v))
  }

  private wasAddedInitially(item: T): boolean {
    return (
      this.initial.filter((v: T) => this.compareItems(item, v)).length !== 0
    )
  }

  public exists(item: T): boolean {
    return this.isCurrentItem(item)
  }

  public add(item: T): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item)
    }

    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item)
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item)
    }
  }

  public remove(item: T): void {
    this.removeFromCurrent(item)

    if (this.isNewItem(item)) {
      this.removeFromNew(item)

      return
    }

    if (!this.isRemovedItem(item)) {
      this.removed.push(item)
    }
  }

  public update(items: T[]): void {
    /* -> finds items in *items* that are not present in *currentItems* 
       -> some: Checks if at least one item in currentItems matches "a" from items based on this.compareItems
       -> newItems: Contains only the values from items that are not already in currentItems
    */
    const newItems = items.filter((a) => {
      return !this.getItems().some((b) => this.compareItems(a, b)) /* Compares item a from *items* with item b from *currentItems* */
    })

    /* -> finds items in *currentItems* that are not present in *items* 
       -> some: Checks if at least one item in items matches "a" from currentItems from items based on this.compareItems
       -> removedItems: Contains only the values from currentItems that are not already in items
    */
    const removedItems = this.getItems().filter((a) => {
      return !items.some((b) => this.compareItems(a, b)) /* Compares item a from *currentItems* with item b from *items* */
    })

    this.currentItems = items
    this.new = newItems
    this.removed = removedItems
  }
}