type ItemInfo = object;
type ItemsInfo = ItemInfo[];
type Item = object;
type Items = Item[];

export default interface ListInterface {
    /**
     * Current length of the list
     * The length must be modified when any
     * action modifies it's length.
     */
    length : number;
    /**
     * Check and modify the passed item with the correct format.
     * Assigning the missing propreties the default ones and 
     * removing the not required proprieties. 
     */
    check : (item : Item) => Item;
    /**
     * Check if it exists
     */
    exists : (index : number) => boolean;
    /**
     * Get all items without any filter
     */
    getAll : () => Items;
    /**
     * Get all items info
     */
    getAllInfo : () => ItemsInfo;
    /**
     * Get item info
     */
    parseToInfo : (item : Item) => ItemInfo;
    /**
     * Get all names
     */
    names : () => string[];
    /**
     * Add new one it can be undefined or not fully defined
     * item. If is undefined add a new one with default values.
     * If is partial just complete the missing values with the 
     * default ones, you can do it with the check method.
     */
    add : (item : Partial<Item> | undefined) => void;
    /**
     * Join array of items with the current items array
     */
    join : (items : Items) => void;
    /**
     * Get an item without any filter
     */
    get : (index : number) => Item;
    /**
     * Delete item return a status value
     * true if it has been deleted correctly
     * false if it wasn't.
     */
    delete : (index : number) => boolean;
    /**
     * Modify the item with the passed proprietes of
     * the item.
     */
    modify : (index : number, item : Partial<Item>) => boolean;
    /**
     * Delete the last item.
     */
    pop : () => void;
    /**
     * Delete all the items
     */
    clear : () => void;
};