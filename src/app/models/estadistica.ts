export class Estadistica {
    private _subCategoryType: number;
    private _categoryType: number;
    private _productDescription: string;

    get categoryType(): number {
        return this._categoryType;
    }
    
    set categoryType(value: number) {
    this._categoryType = value;
    }
   
    get subCategoryType(): number {
        return this._subCategoryType;
    }
    
    set subCategoryType(value: number) {
    this._subCategoryType = value;
    }

    get productDescription(): string {
    return this._productDescription;
    }

    set productDescription(value: string) {
    this._productDescription = value;
    }
}