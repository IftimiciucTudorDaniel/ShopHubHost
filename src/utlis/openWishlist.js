export const openWistlistModal = async () => {
  const bootstrap = await import("bootstrap");

  const modalElements = document.querySelectorAll(".modal.show");
  modalElements.forEach((modal) => {
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
      modalInstance.hide();
    }
  });

  const offcanvasElements = document.querySelectorAll(".offcanvas.show");
  offcanvasElements.forEach((offcanvas) => {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }
  });

  const modalElement = document.getElementById("wishlist");
  const myModal = new bootstrap.Modal(modalElement, {
    keyboard: false,
  });

  myModal.show();

  modalElement.addEventListener("hidden.bs.modal", () => {
    myModal.hide();
  });
};
