import { openModal } from "@services/modal/modalService";
import { ITours } from "models/tours";
import { getTourTemplate } from "../../templates/tours";

export function initHeaderTitle(ticketName: string, selector: string): void {
  const headerElement: HTMLElementTagNameMap["header"] | null =
    document.querySelector("header");
  if (headerElement) {
    const targetItem: HTMLElement | null =
      headerElement.querySelector(selector);
    if (targetItem) {
      targetItem.innerText = ticketName;
    }
  }
}

export function initFooterTitle(ticketName: string, selector: string): void {
  const headerElement: HTMLElementTagNameMap["footer"] | null =
    document.querySelector("footer");
  if (headerElement) {
    const targetItem: HTMLElement | null =
      headerElement.querySelector(selector);
    if (targetItem) {
      targetItem.innerText = ticketName;
    }
  }
}

export function initToursDivElements(data: ITours[]): void {
  if (Array.isArray(data)) {
    const rootElement: HTMLElement = document.querySelector(".main-app");
    const tourWrap = document.createElement("div");

    tourWrap.classList.add("tour-wrap");

    // init click for modal
    initTourElemListener(tourWrap);

    let rootElementData = "";
    data.forEach((el, i) => {
      rootElementData += getTourTemplate(el, i);
    });

    tourWrap.innerHTML = rootElementData;
    rootElement.appendChild(tourWrap);
  }
}

export function initTourElemListener(tourWrap: HTMLElement): void {
  tourWrap.addEventListener("click", (ev) => {
    const targetItem = ev.target as HTMLElement;
    const parentItem = targetItem?.parentNode as HTMLElement;
    let realTarget: HTMLElement;

    if (targetItem.hasAttribute("data-tour-item-index")) {
      realTarget = targetItem;
    } else if (parentItem && parentItem.hasAttribute("data-tour-item-index")) {
      realTarget = parentItem;
    }

    if (realTarget) {
      const dataIndex = realTarget.getAttribute("data-tour-item-index");
      openModal("order", Number(dataIndex));
    }
  });
}
