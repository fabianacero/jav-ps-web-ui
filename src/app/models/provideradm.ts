export class ProviderAdm {

    private _razonSocial    : string;
    private _tipoDocumento  : number;
    private _numeroDocumento: string;
    private _tipoCategoria  : number;
    private _email          : string;
    private _direccion      : string;
    private _endPoint       : string;
    private _telefono       : string;
    private _info       : string;

    get razonSocial(): string {
        return this._razonSocial;
    }

    set razonSocial(value: string) {
        this._razonSocial = value;
    }

    get tipoDocumento(): number {
        return this._tipoDocumento;
    }
    
    set tipoDocumento(value: number) {
    this._tipoDocumento = value;
    }

    get numeroDocumento(): string {
        return this._numeroDocumento;
    }

    set numeroDocumento(value: string) {
        this._numeroDocumento = value;
    }

    get tipoCategoria(): number {
        return this._tipoCategoria;
    }
    
    set tipoCategoria(value: number) {
        this._tipoCategoria = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get direccion(): string {
        return this._direccion;
    }

    set direccion(value: string) {
        this._direccion = value;
    }

    get endPoint(): string {
        return this._endPoint;
    }

    set endPoint(value: string) {
        this._endPoint = value;
    }

    get telefono(): string {
        return this._telefono;
    }

    set telefono(value: string) {
        this._telefono = value;
    }

    get info(): string {
        return this._info;
    }

    set info(value: string) {
        this._info = value;
    }

}