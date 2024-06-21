export class Modal {
  private readonly id: string;

  public static modals: Modal[] = [];

  constructor(id = null) {
    const findModal = Modal.modals.find((x) => x.id === id);
    if (findModal) {
      Modal.removeById(this.id);
    }
    Modal.modals.push(this);
    console.log("Modal.modals", Modal.modals);
    this.id = id || Math.random() + Modal.modals.length;
  }

  public open(template: string): void {
    const divWrap = document.createElement("div");
    divWrap.innerHTML = template;
    divWrap.id = this.id;
    divWrap.setAttribute("modal-id", this.id);
    divWrap.classList.add("modal-element");
    const closeBtn = divWrap.querySelector(".close-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        Modal.removeById(this.id);
      });
    }
    document.body.appendChild(divWrap);
  }

  public remove(): void {
    const modalEl = document.getElementById(this.id);
    modalEl.parentNode.removeChild(modalEl);
  }

  public static removeById(id: string = null): void {
    let modalId = id;

    const findEl = Modal.modals.find((x) => x.id === modalId);
    if (findEl) {
      findEl.remove();
      Modal.modals = Modal.modals.filter((el) => el.id !== modalId);
    } else {
      if (Array.isArray(Modal.modals)) {
        const lastEl = Modal.modals.pop();
        if (lastEl) {
          lastEl.remove();
        }
      }
    }
  }
}
