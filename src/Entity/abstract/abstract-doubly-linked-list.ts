import { ILinkedList, ITree, IArray } from "@Interface/specific";
import { ICompareFunc, valueTypeComparison, NOT_EXISTED } from "@Utils/compare";
import { SortMethods } from "@Algorithm/sort";
import { DoublyListNode } from "@Entity/concrete";
import { Errors } from "@Utils/error-handling";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types";

export abstract class AbstractDoublyLinkedList<T> implements ILinkedList<T> {

    abstract toArray(arrayType?: ArrayTypes): IArray<T>;
    abstract toList(listType?: ListTypes): ILinkedList<T>;
    abstract toTree(treeType?: TreeTypes): ITree<T>;

    protected _headPointer: DoublyListNode<T>;
    protected _tailPointer: DoublyListNode<T>;
    protected _size: number;

    constructor() {
        this._headPointer = null;
        this._tailPointer = null;
        this._size = 0;
    }

    get head(): T {
        return this._headPointer.value
    }

    get tail(): T {
        return this._tailPointer.value
    }

    get size(): number {
        return this._size;
    }

    addHeadNode(value: T): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        return this._addHeadNode(new DoublyListNode<T>(value));
    }

    addTailNode(value: T): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        return this._addTailNode(new DoublyListNode<T>(value));
    }

    removeHeadNode(): T {
        return this._removeHeadNode();
    }

    removeTaiNode(): T {
        return this._removeTailNode();
    }

    insertByIndex(value: T, index: number): this {
        const idx = this._getInvalidIndex(index);
        return this._insertByValidIndex(value, idx);
    }

    removeByIndex(index: number): T {
        throw new Error("Method not implemented.");
    }

    updateByIndex(value: T, index: number): this {
        const idx = this._getInvalidIndex(index);
        return this._updateByValidIndex(value, idx);
    }

    getByIndex(index: number): T {
        const idx = this._getInvalidIndex(index);
        const pointer = this._getNodeByValidIndex(idx);
        return pointer.value;
    }

    indexOf(value: T, compare: ICompareFunc<T> = valueTypeComparison): number {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        return this._indexOf(value, compare);
    }

    reverse(): this {
        throw new Error("Method not implemented.");
    }

    append(value: T): this {
        return this.addTailNode(value);
    }

    contains(value: T, compare: ICompareFunc<T> = valueTypeComparison): boolean {
        return this.indexOf(value, compare) !== NOT_EXISTED;
    }

    remove(value: T, compare: ICompareFunc<T> = valueTypeComparison): this {
        throw new Error("Method not implemented.");
    }

    sort(compare: ICompareFunc<T> = valueTypeComparison, method: SortMethods = SortMethods.Quick): this {
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(): this {
        throw new Error("Method not implemented.");
    }

    clear(): this {
        return this._clearCurrentList();
    }

    forEach(callbackfn: (value: T, index: number, current: ILinkedList<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    map<U>(callbackfn: (value: T, index: number, current: ILinkedList<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): AbstractDoublyLinkedList<U> {
        throw new Error("Method not implemented.");
    }

    protected _addHeadNode(newNode: DoublyListNode<T>): this {

        if (this._headPointer) {
            newNode.next = this._headPointer;
            this._headPointer.prev = newNode;
            this._headPointer = newNode;
        } else {
            this._headPointer = newNode;
            this._tailPointer = this._headPointer
        }

        this._size += 1;

        return this;
    }

    protected _addTailNode(newNode: DoublyListNode<T>): this {

        if (this._tailPointer) {
            this._tailPointer.next = newNode;
            newNode.prev = this._tailPointer;
            this._tailPointer = newNode;
        } else {
            this._tailPointer = newNode;
            this._headPointer = this._tailPointer;
        }

        this._size += 1;

        return this;
    }

    protected _removeHeadNode(): T {
        if (this._size === 0) return null;

        if (this._size === 1) {
            const value = this._headPointer.value;
            this._clearCurrentList();
            return value;
        }

        const value = this._headPointer.value;

        let nextPointer = this._headPointer.next;

        this._headPointer.next = null;
        nextPointer.prev = null;

        this._headPointer = nextPointer;

        this._size -= 1;

        return value;
    }

    protected _removeTailNode(): T {
        if (this._size === 0) return null;

        if (this._size === 1) {
            const value = this._tailPointer.value;
            this._clearCurrentList();
            return value;
        }

        const value = this._tailPointer.value;

        let prevPointer = this._tailPointer.prev;

        this._tailPointer.prev = null;
        prevPointer.next = null;

        this._tailPointer = prevPointer;

        this._size -= 1;

        return value;
    }

    protected _clearCurrentList(): this {
        if (this._size === 0) return this;

        this._headPointer = null;
        this._tailPointer = null;

        this._size = 0;
        return this;
    }

    protected _insertByValidIndex(value: T, validIndex: number): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        const newNode = new DoublyListNode<T>(value);

        if (validIndex === 0) {
            return this._addHeadNode(newNode);
        }

        if (validIndex === this._size - 1) {
            return this._addTailNode(newNode);
        }

        const pointer = this._getNodeByValidIndex(validIndex);
        const prevPointer = pointer.prev;

        newNode.next = pointer;
        pointer.prev = newNode;

        prevPointer.next = newNode;
        newNode.prev = prevPointer;

        this._size += 1;

        return this;
    }

    protected _removeByValidIndex(validIndex: number): T {

        if (validIndex === 0) {
            return this._removeHeadNode();
        }

        if(validIndex === this._size - 1) {
            return this._removeTailNode();
        }

        const pointer = this._getNodeByValidIndex(validIndex);

        

    }

    protected _updateByValidIndex(value: T, validIndex: number): this {
        if (!this._isValid(value)) {
            throw new Errors.InvalidArgument(Errors.Msg.InValidArg);
        }

        const pointer = this._getNodeByValidIndex(validIndex);
        pointer.value = value;
        return this;
    }

    protected _getInvalidIndex(index: number): number {
        if (!Number.isInteger(index)) {
            throw new Errors.InvalidIndex(Errors.Msg.InValidIdx);
        }

        if (index < 0 && index + this._size < 0 || index >= this._size) {
            throw new Errors.OutOfBoundary(Errors.Msg.BeyondBoundary);
        }

        if (index < 0) {
            return index + this._size;
        }

        return index;
    }

    protected _indexOf(validValue: T, compare: ICompareFunc<T>): number {
        let i = -1;
        let p = this._headPointer;
        // (i < this._size) to avoid circular Linked List
        while (p && i < this._size) {
            i += 1;
            if (compare(p.value).isEqualTo(validValue)) return i;
            p = p.next;
        }
        return -1;
    }

    protected _getNodeByValidIndex(validIndex: number): DoublyListNode<T> {

        if (validIndex < 0) return this._headPointer;

        let pointer: DoublyListNode<T>;
        let idx: number;

        if (validIndex < this._size / 2) {
            idx = validIndex;
            pointer = this._headPointer;

            while (idx > 0) {
                pointer = pointer.next;
                idx -= 1;
            }

        } else {
            idx = this._size - 1;
            pointer = this._tailPointer;

            while (idx !== validIndex) {
                pointer = pointer.prev;
                idx -= 1;
            }
        }

        return pointer;
    }

    protected _isValid(value: T) {
        return value !== null && (Boolean(value) || Number(value) === 0);
    }

}