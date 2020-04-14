export class SubCategory {
    private _categoryType: number;
    private _categoryDescription: number;
   
    get categoryType(): number {
        return this._categoryType;
      }
    
      set categoryType(value: number) {
        this._categoryType = value;
      }
    
      get categoryDescription(): number {
        return this._categoryDescription;
      }
    
      set categoryDescription(value: number) {
        this._categoryDescription = value;
      }
}