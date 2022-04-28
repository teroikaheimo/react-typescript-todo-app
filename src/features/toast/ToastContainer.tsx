import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { toastService } from "./ToastService";
import { IToast } from "./types/IToast";
export function ToastContainer() {
  const [toastItems, setToasts] = useState([]);
  const toast = useRef(null);

  // Single time run effect.
  useEffect(() => {
    const subscription = toastService
      .getShowToastSubject()
      .subscribe((incomingItem: IToast) => {
        setToasts([incomingItem]);
        showToasts();
      });
    // Clean up.
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastItems]);

  function showToasts() {
    toast.current.show(toastItems);
  }

  return (
    <div>
      <Toast ref={toast} />
    </div>
  );
}
