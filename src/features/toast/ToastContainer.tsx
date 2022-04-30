import { Toast } from "primereact/toast";
import { memo, useEffect, useRef } from "react";
import { toastService } from "./ToastService";
import { IToast } from "./types/IToast";
const ToastContainer = () => {
  const toast = useRef(null);

  // Single time run effect.
  useEffect(() => {
    const showToasts = (incomingItem: IToast) => {
      toast.current.show(incomingItem);
    };
    const subscription = toastService
      .getShowToastSubject()
      .subscribe((incomingItem: IToast) => {
        showToasts(incomingItem);
      });
    // Clean up.
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <Toast ref={toast} />
    </div>
  );
};
export default memo(ToastContainer);
