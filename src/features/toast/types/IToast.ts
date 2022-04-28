export interface IToast{
    severity:'info'|'warn'|'success'|'error', 
    summary: string, 
    detail: string,
    life:number
}