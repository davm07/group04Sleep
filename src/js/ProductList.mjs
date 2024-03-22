import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        // We passed in this information to make our class as reusable as possible.
            // Being able to define these things when we use the class will make it very flexible
            this.category = category;
            this.dataSource = dataSource;
            this.listElement = listElement;
    }

    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        // render the list - to be completed
        this.renderList(list);
        // render the title into the top products
        document.querySelector(".title-cat").innerHTML = `${this.category.charAt(0).toUpperCase()}` + `${this.category.slice(1)}`;
    }

    renderList(list) {
        //filter the upcoming list to get only the desired items
        // const newList = this.filterItems(list);
        //using the function from the utils file to display the content in the html
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    filterItems(list) {
        // Empty array to hold the unwanted id's
        const unusedIds = ["989CG", "880RT"]
        // filtering the items by id
        const items = list.filter(item => !unusedIds.includes(item.Id));
        return items;
    }
}