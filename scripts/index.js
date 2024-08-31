let bag;
onLoad();

function onLoad(){
    bag = JSON.parse(localStorage.getItem('Bag')) || [];
    displayItems();
    displayBagCount();
}

function displayItems() {
  let itemContainer = document.querySelector(".items-container");

  if(!itemContainer) return;

  let itemHtml = ``;

  items.forEach((item) => {
    itemHtml += `<div class="item-container">
                <div class="image-container">
                    <img class="item-image" src="${item.image}" alt="">
                </div>
                <div class="rating">${item.rating.stars}⭐ | ${item.rating.count}</div>
                <div class="item-name"><div>${item.item_name}</div></div>
                <div class="item-company">${item.company}</div>
                <div class="price">
                    <span class="current-price">Rs. ${item.current_price}</span>
                    <span class="original-price">Rs. ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
                </div>

                <button class="add-bag-btn" onclick="addToBag(${item.id})">Add to Bag</button>
            </div>`;
  });
  itemContainer.innerHTML = itemHtml;
}

function addToBag(itemId) {
    bag.push(itemId);
    localStorage.setItem('Bag', JSON.stringify(bag));
    displayBagCount();
}

function displayBagCount(){
    let bagCount = document.querySelector('.bag-count');

    // if(bag.length === 0){
    //     bagCount.style.visibility = 'hidden';
    // }

    // bagCount.innerText = bag.length;

    if(bag.length > 0){
        bagCount.style.visibility = 'visible';
        bagCount.innerText = bag.length;
    }
    else{
        bagCount.style.visibility = 'hidden';
    }
}
