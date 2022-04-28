import { Subject } from "rxjs";
import { IToast } from "./types/IToast";

class ToastService {
    /** Subject that emits every time a toast needs to be displayed. */
  private _showToast$ = new Subject<IToast>();

  /** Returns a subject that emits every time a toast needs to be displayed. */
  getShowToastSubject() {
    return this._showToast$;
  }

  /**
   * Will show a toast to the user.
   * @param severity Determines the color used with the toast.
   * @param summary Header for the toast. Keep it short.
   * @param detail Little longer explanation describing the situation. 
   * @param life OPTIONAL Controls the time that the toast is visible to the user.
   */
  showToast(
    severity: "info" | "warn" | "success" | "error",
    summary: string,
    detail: string,
    life?: number
  ) {
    const toast: IToast = this.getToastObj();
    toast.severity = severity;
    toast.summary = summary;
    toast.detail = detail;
    if (life) {
      toast.life = life;
    }
    this._showToast$.next(toast);
  }

  private getToastObj(): IToast {
    return {
      severity: "info",
      summary: "",
      detail: "",
      life: 8000,
    };
  }
}

export const toastService = new ToastService();
