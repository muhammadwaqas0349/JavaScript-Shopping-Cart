const products1 = document.querySelector(".products"); 
const cartItems1 = document.querySelector(".cart-items");
const subtotal1 = document.querySelector(".subtotal");
const totalItemsInCart1 = document.querySelector(".total-items-in-cart");




function renderProdcuts() {
    products.forEach((product) => {
      products1.innerHTML += `
              <div class="item">
                  <div class="item-container">
                      <div class="item-img">
                          <img src="${product.imgSrc}" alt="${product.name}">
                      </div>
                      <div class="desc">
                          <h2>${product.name}</h2>
                          <h2><small>$</small>${product.price}</h2>
                          <p>
                              ${product.description}
                          </p>
                      </div>
                      <div class="add-to-wishlist">
                          <img src="./icons/heart.png" alt="add to wish list">
                      </div>
                      <div class="add-to-cart" onclick="addToCart(${product.id})">
                          <img src="./icons/bag-plus.png" alt="add to cart">
                      </div>
                  </div>
              </div>
          `;
    });
  }
  renderProdcuts();

  let cart = []; 
  function addToCart(id){
    if(cart.some( (item) => item.id === id)){
        alert("Product alreadt in Cart")
    }
    else{
        const item = products.find( (item) => item.id === id); 
        cart.push({...item, numberOfUnits: 1} ); 
        updateCart(); 
    }
  }; 
  function updateCart(){
    renderCartItems();
    renderSubTotal();  
    localStorage.setItem("CART", JSON.stringify(cart)); 
  } 

  function renderCartItems() {
    cartItems1.innerHTML = ""; // clear cart element

    cart.forEach((item) => {
      cartItems1.innerHTML += `
          <div class="cart-item">
              <div class="item-info">
                  <img src="${item.imgSrc}" onClick="deleteItem(${item.id})" alt="${item.name}">
                  <h4>${item.name}</h4>
              </div>
              <div class="unit-price">
                  <small>$</small>${item.price}
              </div>
              <div class="units">
                  <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
              </div>
          </div>
        `;
    });
  }
  function changeNumberOfUnits(action, id){
    cart = cart.map( (item) => {
        let newNumber = item.numberOfUnits; 

        if(item.id === id){
            if(action === "minus" && newNumber >= 1)
                {newNumber--;}
            else if(action === "plus" && newNumber < item.instock)
                {newNumber++;}
        }
    return {...item, numberOfUnits: newNumber };        
    }); 

    updateCart(); 
  }
  function renderSubTotal(){
    let totalPrice = 0; 
    let totalItems = 0; 

    cart.forEach( (item) => {
        totalPrice += item.price * item.numberOfUnits; 
        totalItems += item.numberOfUnits; 
    }); 

    subtotal1.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;

  }
  function deleteItem(id){
    cart = cart.filter( (item) => item.id !== id); 
    updateCart(); 
  }

  //save to Local Storage

  localStorage.setItem("CART", JSON.stringify(cart)); 
  let cart2 = JSON.parse(localStorage.getItem("CART")) || []; 
  updateCart(); 