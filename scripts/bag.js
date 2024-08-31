const CONVENIENCE_FEES = 99;
let bagItemObjects;
onLoad();

function onLoad() {
  displayBagItems();
  displayBagSummary();
}

function displayBagItems() {
  let bagBody = document.querySelector(".bag-items-container");

  let bagItemsHtml = ``;

  if(!bag.length){
    let bagBody = document.querySelector(".bag-body");
    bagBody.innerHTML = `<div class="empty-bag">
                      <h1>Your bag is empty</h1>
                      <span class="material-symbols-outlined empty-bag-icon">
                      sentiment_dissatisfied
                      </span>
                    </div>`

    return;
  }

  bag.forEach((itemId) => {
    let currItem = items.find((item) => item.id == itemId);
    // console.log(currItem);
    bagItemsHtml += `<div class="bag-item">
            <img class="bag-item-image" src="${currItem.image}" alt="" />
            <div class="bag-item-details">
              <div class="rating">
                ${currItem.rating.stars}⭐ | ${currItem.rating.count}
              </div>
              <div class="item-name"><div>${currItem.item_name}</div></div>
              <div class="item-company">${currItem.company}</div>
              <div class="price">
                <span class="current-price">Rs. ${currItem.current_price}</span>
                <span class="original-price">Rs. ${currItem.original_price}</span>
                <span class="discount">(${currItem.discount_percentage}% OFF)</span>
              </div>

              <div class="return-details">${currItem.return_period} Days Return available</div>
              <div class="delivery-details">Delivery by : ${currItem.delivery_date}</div>

              <span class="material-symbols-outlined close-icon" onclick="removeItem(${currItem.id})"> close </span>
            </div>
          </div>`;
  });

  bagBody.innerHTML = bagItemsHtml;
}

function removeItem(currItemId){
  let idx = bag.indexOf(currItemId);
  bag.splice(idx,1);
  
  //ALTERNATIVE
  // bag = bag.filter(bagItemId => bagItemId != currItemId);
  
  localStorage.setItem('Bag', JSON.stringify(bag));
  displayBagItems();
  displayBagCount();
  displayBagSummary();
}

function displayBagSummary(){
  let bagSummaryElt = document.querySelector('.bag-item-summary');

  bagItemObjects = bag.map(itemId => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });

  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  bagSummaryElt.innerHTML = `
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
  `;

}

