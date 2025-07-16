const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

//abrir o modal do carrinho
cartBtn.addEventListener("click", function () {
updateCartModal();
cartModal.style.display = "flex"


});

//fechar o modal quando clicar fora
cartModal.addEventListener("click", function (event) {
if (event.target === cartModal) {
    cartModal.style.display = "none"
};
});

closeModalBtn.addEventListener("click", function () {
cartModal.style.display = "none"
})

menu.addEventListener("click", function (event) {
//console.log(event.target)
let parentButton = event.target.closest(".add-to-cart-btn")
if (parentButton) {
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))

    //add no carrinho .   
    addToCart(name, price)

}

})

//adicionar no carrinho.

function addToCart(name, price) {
const existingItem = cart.find(item => item.name === name)
if (existingItem) {
    //se o item já existe, aumenta apenas a quantidade +1
    existingItem.quantity += 1;
} else {

    cart.push({
        name,
        price,
        quantity: 1,
    })
}

updateCartModal()
}

//atualiza o carrinho 

function updateCartModal() {
cartItemContainer.innerHTML = "";
let total = 0;
cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between border-b-2 pb-2 mb-2 border-gray-200">
        <div>
            <p class="mt-3  pb-2 mb-2 pr-2 font-bold">${item.name}</p>
            <p class="font-light">Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2" >R$ ${item.price.toFixed(2)}</p>
            
        </div>
        
        <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors shadow-lg shadow-red-300/30 remove-btn" data-name="${item.name}">
        remover
        </button>    
        


    </div>
    `

    total += item.price * item.quantity;

    cartItemContainer.appendChild(cartItemElement)

})

cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

cartCounter.innerHTML = cart.length;
}

//função para remover o carrinho
cartItemContainer.addEventListener("click", function (event) {
if (event.target.classList.contains("remove-btn")) {
    const name = event.target.getAttribute("data-name")
    removeItemCart(name);

}
})
//função remover item
function removeItemCart(name) {
const index = cart.findIndex(item => item.name === name);

if (index !== -1) {
const item = cart[index];

if (item.quantity > 1) {
    item.quantity -= 1;
    updateCartModal();
    return;
}

cart.splice(index, 1);
updateCartModal();

}
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !==""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})


// Finalizar pedido
checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurante();
    if(!isOpen){
        Toastify({
  text: "Ops... Estamos fechados. Entre em contato de 8h as 18h",
  duration: 4000,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "#ef4444",
  },
        
        }).showToast();

        return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

//Enviar o pedido para API whatsapp   
 const cartItemsFormatted = cart.map((item) => {
        // Usamos asteriscos para negrito no WhatsApp e um traço para listar
        return `* ${item.name} | Qtd: ${item.quantity} | Valor: R$${item.price.toFixed(2)}`;
    }).join("\n"); // Junta cada item com uma nova linha

    const mensagemAutomatica = '*Por favor, envie essa mensagem e aguarde!\n Em instantes, daremos prosseguimento ao seu atendimento.*';

    // Construção da mensagem final
    const finalMessage = `
*Olá! Seja bem-vindo(a) à MV Beauty!*

*CLIENTE:* ${addressInput.value}

*SERVIÇOS SOLICITADOS:*
${cartItemsFormatted}

${mensagemAutomatica}
`;

    const message = encodeURIComponent(finalMessage); // Codifica a mensagem para URL
    const phone = "8191876214"; // Seu número de telefone

    // Abre o WhatsApp com a mensagem formatada
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    // Limpa o carrinho e atualiza o modal
    cart = [];
    updateCartModal();
});


//verificação Do horário
function checkRestaurante(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 8 && hora < 19; 
//true = restaurante está aberto

}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurante();

if(isOpen){
spanItem.classList.remove("bg-red-500");
spanItem.classList.add("bg-my-bright-yellow")
}else{
    spanItem.classList.remove("bg-my-bright-yellow")
    spanItem.classList.add("bg-red-500")
}


/*==================== footter ====================*/
document.addEventListener('DOMContentLoaded', function() {
            const footer = document.getElementById('main-footer');

            function handleScroll() {
                const scrollPosition = window.scrollY;

                if (scrollPosition > 0) {
                    // Adiciona a classe de opacidade %
                    footer.classList.add('opacity-90');
                    footer.classList.remove('opacity-100');
                } else {
                    // Remove a classe de opacidade %
                    footer.classList.add('opacity-100');
                    footer.classList.remove('opacity-90');
                }
            }

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Chama no carregamento para o estado inicial
        });

    //Código ScrollReveal
    const sr = ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 3500,
        delay: 400,
    });
    sr.reveal(`.title-mv, .title-span-mv`);
    sr.reveal(`.foto-mv`, { delay: 500 });
    sr.reveal(``, { delay: 600 });
    sr.reveal(`.title-mv-servico`, { delay:700});
    sr.reveal(`.resume-left, .title-produto`, { origin: 'left' });
    sr.reveal(`.resume-right`, { origin: 'right' });
    sr.reveal(`.opacidade-icon`, {
        origin: 'bottom',
        distance: '15px', // Isso remove o movimento
        opacity: 0,      // Garante que o elemento comece invisível
        duration: 3500,  // Duração da animação (ajuste conforme necessário)
        delay: 400,      // Atraso antes de iniciar a animação
    });

    sr.reveal(`.icon-carrinho`,{
        rotate: { y: 150 }, // Começa rotacionado 90 graus no eixo Y (quase de lado)
        opacity: 0,
        duration: 3500,
        delay: 200,
        origin: 'left',
        distance: '200px',
    });
    sr.reveal(`.modal-text`,{
        rotate: { y: 90 }, // Começa rotacionado 90 graus no eixo Y (quase de lado)
        opacity: 0,
        duration: 1800,
        delay: 700,
        origin: 'bottom',
        distance: '40px',
    });
