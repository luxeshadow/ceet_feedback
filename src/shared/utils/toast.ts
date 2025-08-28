import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast(message: string, options: any = {}) {
  let background = "linear-gradient(to right, #00b09b, #96c93d)"; // vert par défaut (succès)

  if (options.type === "error") {
    background = "linear-gradient(to right, #ff416c, #ff4b2b)"; // rouge pour erreur
  }

  Toastify({
    text: message,
    duration: options.duration || 2000,
    close: options.close !== undefined ? options.close : true,
    gravity: options.gravity || "top", 
    position: options.position || "center", // left, center, right
    style: {
      background,
    },
  }).showToast();
}

