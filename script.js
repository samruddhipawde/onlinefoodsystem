const foods = [

{
id:1,
name:"Burger",
image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
description:"Cheesy Burger",
price:120,
rating:4.5
},

{
id:2,
name:"Pizza",
image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
description:"Delicious Pizza",
price:250,
rating:4.8
},

{
id:3,
name:"Pasta",
image:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
description:"Italian Pasta",
price:180,
rating:4.4
},

{
id:4,
name:"French Fries",
image:"https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600",
description:"Crispy Fries",
price:90,
rating:4.2
},

{
id:5,
name:"Sandwich",
image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
description:"Veg Sandwich",
price:110,
rating:4.3
},

{
id:6,
name:"Cold Drink",
image:"https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600",
description:"Refreshing Drink",
price:60,
rating:4.1
}

];

let cart=[];

const foodContainer=document.getElementById("foodContainer");

foods.forEach(food=>{

foodContainer.innerHTML+=`

<div class="col-md-4 mb-4">
<div class="card food-card">

<img src="${food.image}" class="card-img-top">

<div class="card-body">

<h5>${food.name}</h5>

<p>₹${food.price}</p>

<p>⭐ ${food.rating}</p>

<button class="btn btn-info"
onclick="showDetails(${food.id})">
Details
</button>

<button class="btn btn-success"
onclick="addToCart(${food.id})">
Add To Cart
</button>

</div>
</div>
</div>

`;
});

function showDetails(id){

const food=foods.find(f=>f.id===id);

document.getElementById("modalBody").innerHTML=`

<img src="${food.image}" class="img-fluid">

<h4 class="mt-3">${food.name}</h4>

<p>${food.description}</p>

<p>Price: ₹${food.price}</p>

<p>Rating: ⭐${food.rating}</p>

`;

new bootstrap.Modal(document.getElementById("foodModal")).show();
}

function addToCart(id){

const item=cart.find(f=>f.id===id);

if(item){
item.qty++;
}
else{
const food=foods.find(f=>f.id===id);
cart.push({...food,qty:1});
}

updateCart();
}

function updateCart(){

const cartItems=document.getElementById("cartItems");

cartItems.innerHTML="";

let total=0;

cart.forEach(item=>{

total+=item.price*item.qty;

cartItems.innerHTML+=`

<div class="card p-3">

<h5>${item.name}</h5>

<p>Price: ₹${item.price}</p>

<button class="btn btn-danger qty-btn"
onclick="decreaseQty(${item.id})">-</button>

<span class="mx-2">${item.qty}</span>

<button class="btn btn-success qty-btn"
onclick="increaseQty(${item.id})">+</button>

</div>

`;

});

document.getElementById("totalAmount").innerText=total;

document.getElementById("cartCount").innerText=cart.length;
}

function increaseQty(id){

const item=cart.find(f=>f.id===id);

item.qty++;

updateCart();
}

function decreaseQty(id){

const item=cart.find(f=>f.id===id);

if(item.qty>1){
item.qty--;
}
else{
cart=cart.filter(f=>f.id!==id);
}

updateCart();
}

function showSummary(){

let html="";

let total=0;

cart.forEach(item=>{

html+=`
<p>
${item.name}
(${item.qty})
= ₹${item.price*item.qty}
</p>
`;

total+=item.price*item.qty;
});

document.getElementById("summaryItems").innerHTML=html;

document.getElementById("summaryTotal").innerText=total;

document.getElementById("summarySection").style.display="block";
}

function paymentPage(){

document.getElementById("paymentSection").style.display="block";
}

function processOrder(){

return new Promise((resolve)=>{

setTimeout(()=>{

resolve();

},3000);

});
}

async function placeOrder(){

const status=document.getElementById("orderStatus");

status.innerHTML=
"<h4 class='text-warning'>Processing Order...</h4>";

await processOrder();

const orderId=
"ORD"+Math.floor(Math.random()*100000);

status.innerHTML=
`
<h4 class='text-success'>
Order Confirmed
</h4>

<p>
Order ID:
<b>${orderId}</b>
</p>
`;
}