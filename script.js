async function TakeOrder(data){
    const order = [];
    const i1 =  Math.floor(Math.random() * 25);
    order.push(data[i1]);
    const i2 =  Math.floor(Math.random() * 25);
    order.push(data[i2]);
    const i3 =  Math.floor(Math.random() * 25);
    order.push(data[i3]);
    const a = await new Promise(function(resolve){
        setTimeout(() => {
            resolve(order);
        }, 2500);
    });
    return a;
}
async function orderPrep(order){
    if(order.length !== 0){
        const a = new Promise(function(resolve){
            setTimeout(() => {
                resolve({order_status:true, paid:false});
            }, 1500);
        })
        return a;
    }
}
async function payOrder(){
    const a = new Promise(function(resolve){
        setTimeout(() => {
            resolve({order_status:true, paid:true});
        }, 1000);
    })
    return a;
}
function thankyouFnc(status){
    if(status.paid === true){
        alert(" Thankyou for eating with us today!");
    }
} 
async function getMenu(){
    const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json').catch(function(e){
        console.log(e);
    });
    const data = await response.json();
    data.forEach(function(e,i){
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = ` <img src="${e.imgSrc}" alt="cardimage">
                            <div class="c2">
                                <div class="cDetails">
                                    <div class="cTitle">${e.name}</div>
                                    <div class="cPrice">$${e.price}/-</div>
                                </div>
                                <div class="addDiv">
                                    <span class="material-symbols-outlined">add</span>
                                </div>
                            </div>`;
        const cards = document.getElementById("cards");
        cards.appendChild(card);
    });
    const order = await TakeOrder(data).catch(function(e){
        console.log(e);
    });

    let status = await orderPrep(order).catch(function(e){
        console.log(e);
    });
    status = await payOrder(status).catch(function(e){
        console.log(e);
    });

    thankyouFnc(status);
    
}
window.addEventListener("load",(e)=>{
    getMenu();
})