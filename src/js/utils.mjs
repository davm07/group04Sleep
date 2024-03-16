// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend an click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// convert to text
function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}

// get the parameters from the query
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

//render the content 
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if(clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

//render the content 
export function renderWithTemplate(template, parent, data, callback) {
  const content = template.content.cloneNode(true);
  parent.appendChild(content);
  if(callback) {
    callback(data);
  }
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");
  const headerElement = document.querySelector("#header");
  const footerElement = document.querySelector("#footer");

  renderWithTemplate(header, headerElement, ".cart-qty", getCartItemsQty);
  renderWithTemplate(footer, footerElement);
}

async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

//get the items quantity from the cart
export function getCartItemsQty(selector) {
  const quantity = getLocalStorage("so-cart")?.length || 0;
  const element = document.querySelector(selector);
  element.innerHTML = quantity;
  return quantity;
}

//Validate total price in Cart
export function validateCartTotalPrice(cartElementQuantity) {
  const element = document.querySelector(".cart-footer")
  if (cartElementQuantity > 0){
    element.style.visibility = "visible"
    const cartLocalStorage = JSON.parse(localStorage.getItem("so-cart"))
    let total = 0
    cartLocalStorage.map(element => {
      total = total + element.FinalPrice
    })
    element.innerHTML = `
    <div class="cart-footer hide">
      <p class="cart-total">Total: ($${total})</p>
    </div>`
  } else {
    element.style.visibility = "hidden"
  }
}