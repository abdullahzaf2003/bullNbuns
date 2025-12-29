// Menu Data
const menuItems = [
    // Beef Burgers
    {
        id: 1,
        name: "OG Smash",
        category: "beef",
        description: "Beef patty with cheese, onion, mustard",
        price: "Rs. 550",
        image: "assets/burgers/2.png"
    },
    {
        id: 2,
        name: "Oklahoma Madness",
        category: "beef",
        description: "Beef patty, cheese, onion, pickles",
        price: "Rs. 650",
        image: "assets/burgers/ok (1).png"
    },
    {
        id: 3,
        name: "Jalapeno Popper",
        category: "beef",
        description: "Beef patty, jalapeno, cheese, sauce",
        price: "Rs. 600",
        image: "assets/burgers/1.png"
    },
    // Chicken Burgers
    {
        id: 4,
        name: "The Hot Chick",
        category: "chicken",
        description: "Fried chicken, honey mustard sauce, cheese",
        price: "Rs. 450",
        image: "assets/burgers/hotchick.png"
    },
    {
        id: 12,
        name: "Chicken Patty Burger",
        category: "chicken",
        description: "Classic crispy chicken patty with lettuce and mayo",
        price: "Rs. 400",
        image: "assets/burgers/patty.png"
    },
    // Fries
    {
        id: 5,
        name: "Crispy Waffle-Cut Fries",
        category: "fries",
        description: "Crispy waffle-cut fries fried to perfection.",
        price: "Rs. 250",
        image: "assets/fries/waffle fries.png"
    },
    {
        id: 6,
        name: "Masala Fries",
        category: "fries",
        description: "Fries tossed in masala spices",
        price: "Rs. 200",
        image: "assets/fries/masala fries.png"
    },
    {
        id: 7,
        name: "Salted Fries",
        category: "fries",
        description: "Classic salted fries",
        price: "Rs. 200",
        image: "assets/fries/plain fries.png"
    },
    // Loaded Fries
    {
        id: 8,
        name: "Loaded Chicken Fries",
        category: "loaded-fries",
        description: "Fries, crispy chicken, OG sauce, honey mustard sauce, pickles, iceberg lettuce, jalapenos",
        price: "Rs. 550",
        image: "assets/fries/chicken loaded fries.png"
    },
    {
        id: 9,
        name: "Loaded Beef Fries",
        category: "loaded-fries",
        description: "Fries, smash patty with cheese, OG sauce, honey mustard sauce, pickles, iceberg lettuce, jalapenos",
        price: "Rs. 550",
        image: "assets/fries/beef loaded fries.png"
    },
    // Drinks
    {
        id: 10,
        name: "Cola Next",
        category: "drinks",
        description: "Chilled Cola Next",
        price: "Rs. 100",
        image: "assets/drinks/cola next.png"
    },
    {
        id: 13,
        name: "Fizzup Next",
        category: "drinks",
        description: "Lemon Lime Fizzup",
        price: "Rs. 100",
        image: "assets/drinks/fizzup next.png"
    },
    {
        id: 11,
        name: "H2O (Water)",
        category: "drinks",
        description: "Refreshing water.",
        price: "Rs. 80",
        image: "assets/drinks/water.png"
    }
];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const tabBtns = document.querySelectorAll('.tab-btn');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // Only render menu if grid exists (on home page)
    if (menuGrid) {
        renderMenu('beef');
        setupTabs();
    }

    // Smooth scroll setup
    setupSmoothScroll();

    // Check if on cart page
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (cartItemsContainer) {
        renderCartPage();
    }

    // Update badge on load
    updateCartCount();
});

// Update Cart Badge
function updateCartCount() {
    const cart = getCart();
    const count = cart.length;
    const badge = document.getElementById('cart-count');

    if (badge) {
        badge.textContent = count;
        if (count > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

// Render Menu Function
function renderMenu(category) {
    if (!menuGrid) return;

    // Clear grid
    menuGrid.innerHTML = '';

    // Filter items
    const filteredItems = menuItems.filter(item => item.category === category);

    // Create Elements
    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('menu-item', 'fade-in');

        // Handle missing images with a fallback
        const imgContent = `
            <div class="menu-img-container">
                 <!-- Using logo as fallback if image fails to load, or just text -->
                <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='./assets/logo/name.png'; this.style.objectFit='contain'; this.style.padding='20px';">
            </div>
        `;

        card.innerHTML = `
            ${imgContent}
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-footer">
                    <span class="price">${item.price}</span>
                    <button class="add-btn" onclick="addToCart('${item.name}')">+</button>
                </div>
            </div>
        `;

        menuGrid.appendChild(card);
    });
}

// Tab Switching Logic
function setupTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            btn.classList.add('active');

            // Render category
            const category = btn.getAttribute('data-category');
            renderMenu(category);
        });
    });
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            // If on a different page (like cart.html) and link is #home, we validly went there?
            // Actually, if we are on cart.html, links like "#menu" won't work unless we go to index.html#menu.
            // But anchors are usually for same-page navigation. 
            // If href is just #something, preventing default checks if target exists.

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}


// Dips and Add-ons Data
const dipsData = [
    { name: "OG Sauce Dip", price: 70 },
    { name: "Honey Mustard Dip", price: 70 },
    { name: "BBQ Sauce Dip", price: 70 },
    { name: "Chipotle Dip", price: 70 }
];

const addonsData = [
    { name: "Patty", price: 250 },
    { name: "Cheese", price: 80 },
    { name: "Fried Egg", price: 80 },
    { name: "Iceburg Lettuce", price: 10 },
    { name: "Tomato", price: 10 },
    { name: "Cucumber", price: 10 },
    { name: "Jalapenos", price: 10 },
    { name: "Pickles", price: 10 }
];

// Cart State
let currentItem = null;
let currentBasePrice = 0;
let selectedAddons = [];

// Modal Elements
const modal = document.getElementById('addon-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalItemName = document.getElementById('modal-item-name');
const dipsList = document.getElementById('dips-list');
const addonsList = document.getElementById('addons-list');
const modalTotalPrice = document.getElementById('modal-total-price');
const confirmAddBtn = document.getElementById('confirm-add-btn');

// Cart Storage Functions
function getCart() {
    const cart = localStorage.getItem('bull_n_buns_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('bull_n_buns_cart', JSON.stringify(cart));
    updateCartCount(); // Update badge whenever cart is saved
}

// Open Modal Function
// Open Modal Function
let currentDescSize = ""; // Track selected size description

function addToCart(itemName) {
    // Find item to get base price
    const item = menuItems.find(i => i.name === itemName);
    if (!item) return;

    currentItem = item;
    // Parse price string "Rs. 550" -> 550
    const originalPrice = parseInt(item.price.replace(/[^0-9]/g, ''));
    currentBasePrice = originalPrice;
    currentDescSize = ""; // Reset
    selectedAddons = []; // Reset selections

    // Update UI
    if (modalItemName) {
        modalItemName.textContent = itemName;

        // Handle Beef Sizes
        const sizeSection = document.getElementById('size-section');
        const sizeList = document.getElementById('size-list');

        if (item.category === 'beef' && sizeSection && sizeList) {
            sizeSection.style.display = 'block';

            // Define Options
            // Single: originalPrice, Double: 800, Triple: 1000
            const sizes = [
                { name: "Single", price: originalPrice, type: 'original' },
                { name: "Double", price: 800, type: 'fixed' },
                { name: "Triple", price: 1000, type: 'fixed' }
            ];

            sizeList.innerHTML = sizes.map((size, index) => {
                const isSelected = index === 0 ? 'selected' : '';
                if (isSelected) currentDescSize = size.name;

                // Show price difference or total? 
                // Context says "base price will shift". Let's show the final price of that size.
                return `
                <div class="addon-item size-option ${isSelected}" onclick="selectSize(this, ${size.price}, '${size.name}')">
                    <div class="addon-info">
                        <div class="addon-checkbox"></div>
                        <span class="addon-name">${size.name} Patty</span>
                    </div>
                    <span class="addon-price">Rs. ${size.price}</span>
                </div>
                `;
            }).join('');

        } else if (sizeSection) {
            sizeSection.style.display = 'none';
        }

        renderAddons();
        updateTotal();

        // Show Modal
        modal.classList.remove('hidden');
        // Small delay to allow display:flex to apply before opacity transition
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    } else {
        // Fallback if modal not present
        console.error("Modal elements not found");
    }
}

// Select Size Logic
window.selectSize = function (element, price, name) {
    // Update visual state
    document.querySelectorAll('.size-option').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');

    // Update Logic
    currentBasePrice = price;
    currentDescSize = name;
    updateTotal();
};

// Close Modal Function
function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Render Addons and Dips
function renderAddons() {
    if (!dipsList || !addonsList) return;

    dipsList.innerHTML = dipsData.map((dip, index) => createAddonHTML(dip, 'dip', index)).join('');
    addonsList.innerHTML = addonsData.map((addon, index) => createAddonHTML(addon, 'addon', index)).join('');

    // Add event listeners to new elements
    const specificAddons = document.querySelectorAll('#dips-list .addon-item, #addons-list .addon-item');
    specificAddons.forEach(item => {
        item.addEventListener('click', toggleAddon);
    });
}

function createAddonHTML(item, type, index) {
    return `
        <div class="addon-item" data-name="${item.name}" data-price="${item.price}" data-type="${type}">
            <div class="addon-info">
                <div class="addon-checkbox"></div>
                <span class="addon-name">${item.name}</span>
            </div>
            <span class="addon-price">+Rs. ${item.price}</span>
        </div>
    `;
}

// Toggle Selection
function toggleAddon(e) {
    const item = e.currentTarget;
    const name = item.dataset.name;
    const price = parseInt(item.dataset.price);

    item.classList.toggle('selected');

    if (item.classList.contains('selected')) {
        selectedAddons.push({ name, price });
    } else {
        selectedAddons = selectedAddons.filter(addon => addon.name !== name);
    }

    updateTotal();
}

// Update Total Price
function updateTotal() {
    if (!modalTotalPrice) return;
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const total = currentBasePrice + addonsTotal;
    modalTotalPrice.textContent = `Rs. ${total}`;
}

// Confirm Add to Cart
if (confirmAddBtn) {
    confirmAddBtn.addEventListener('click', () => {
        const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
        const total = currentBasePrice + addonsTotal;

        // Append Size Name if applicable
        let finalName = currentItem.name;
        if (currentDescSize && currentDescSize !== "Single") {
            finalName += ` (${currentDescSize})`;
        } else if (currentDescSize === "Single") {
            // Optional: Explicitly say Single? Or keep it clean. 
            // "OG Smash" implies single usually. Let's keep it clean for Single.
            // But if user explicitly wants options, maybe they want to see "Single"?
            // User prompt: "in beef add 3 options more in the pop up single ,double ,triple"
            // Usually Single is default. Let's leave it as just Name for single.
        }

        // Create Cart Item Object
        const cartItem = {
            id: Date.now(), // Unique ID for this instance
            itemId: currentItem.id,
            name: finalName,
            basePrice: currentBasePrice,
            image: currentItem.image,
            addons: selectedAddons,
            totalPrice: total
        };

        // Save to LocalStorage
        const cart = getCart();
        cart.push(cartItem);
        saveCart(cart);

        alert(`Added ${finalName} to cart!`);
        closeModal();
    });
}

// Scroll Logic (Hide Navbar on Scroll Down, Show on Scroll Up)
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > lastScrollY) {
        // Scrolling DOWN -> Hide Navbar
        navbar.classList.add('hidden');
    } else {
        // Scrolling UP -> Show Navbar
        navbar.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});


// ----------------
// Cart Page Logic
// ----------------
function renderCartPage() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    if (!cartItemsContainer || !cartTotalElement) return;

    const cart = getCart();
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty-msg">
                <h3>Your cart is empty</h3>
                <p>Go back to the <a href="index.html#menu" style="color: var(--primary); text-decoration: underline;">menu</a> to add some tastiness!</p>
            </div>
        `;
        cartTotalElement.textContent = 'Rs. 0';
        return;
    }

    let grandTotal = 0;

    cart.forEach(item => {
        grandTotal += item.totalPrice;

        const addonsText = item.addons.length > 0
            ? `<br><small>+ ${item.addons.map(a => a.name).join(', ')}</small>`
            : '';

        const itemHTML = `
            <div class="cart-item-card">
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='./assets/logo/name.png'">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Base: Rs. ${item.basePrice}${addonsText}</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-price">Rs. ${item.totalPrice}</div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });

    cartTotalElement.textContent = `Rs. ${grandTotal}`;
}

function removeFromCart(uniqueId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== uniqueId);
    saveCart(cart);
    renderCartPage();
}

// Make globally available
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;
