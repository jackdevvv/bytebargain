# Cart & Product Button Implementation Guide

## How the Cart Works

### JavaScript Functions Available

#### 1. Add Product to Cart
```javascript
// Basic usage:
addToCart('Product Name', price);

// Example from HTML:
<button onclick="addToCart('Cheap MacBook Pro 13', 699.99)">Add to Cart</button>
```

**What happens:**
- Product added to cart array
- Cart count badge updates with red number
- Toast notification appears: "✓ Product Name added to cart!"

#### 2. Update Cart Count
```javascript
updateCartCount();
```
- Automatically called by `addToCart()`
- Updates the badge number in navbar cart icon

#### 3. Toggle/View Cart
```javascript
toggleCart();
```
- Shows current cart item count in notification
- Example: "Cart has 3 items..."

### Cart Data Structure
```javascript
cart = [
    { name: 'Product Name', price: 699.99 },
    { name: 'Another Product', price: 199.99 }
]
```

## Product Buttons - Implementation

All product cards have buttons with onclick handlers:

```html
<!-- Featured Product Button -->
<button class="add-to-cart-btn" onclick="addToCart('Cheap MacBook Pro 13', 699.99)">
    Add to Cart - Just $699.99
</button>

<!-- Product Grid Buttons -->
<button class="add-to-cart-btn" onclick="addToCart('Cheap Dell Laptop 15.6', 399.99)">
    Add to Cart
</button>
```

## Cart Button in Navbar

**Location:** Top right corner of navigation bar

**Features:**
- SVG shopping bag icon
- Red badge with count (0-99+)
- Hover effects
- Mobile responsive

**HTML Structure:**
```html
<button class="cart-button" onclick="toggleCart()" title="Shopping Cart">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <!-- Shopping bag icon SVG -->
    </svg>
</button>
```

## Styling

### Button Classes

**Product Add-to-Cart Button:**
- Class: `add-to-cart-btn`
- Blue gradient background
- Hover: Lifted effect with shadow
- Text: Uppercase, bold

**Cart Button:**
- Class: `cart-button`
- Minimal border design
- Hover: Light blue background, scale up
- Position: Sticky navbar, top right

## Testing the Cart

### Test Scenario 1: Add Single Product
1. Click any "Add to Cart" button
2. See notification toast: "✓ [Product] added to cart!"
3. Cart badge shows "1"

### Test Scenario 2: Add Multiple Products
1. Click multiple different product buttons
2. Notifications appear for each
3. Badge increments (1 → 2 → 3...)

### Test Scenario 3: Click Cart Button
1. Click shopping bag icon in navbar
2. Notification shows: "Cart has X items..."
3. Badge shows same count

## Future Enhancements

### Cart Modal (Not yet implemented)
```javascript
// Could be added later:
function showCartModal() {
    // Display sliding panel with:
    // - List of items in cart
    // - Quantities and subtotals
    // - Remove item buttons
    // - Total price
    // - Checkout button
}
```

### Local Storage (For persistence)
```javascript
// Could save cart to browser:
localStorage.setItem('cart', JSON.stringify(cart));
```

### Product Quantity Control
```javascript
function addToCart(productName, price, quantity = 1) {
    for(let i = 0; i < quantity; i++) {
        cart.push({ name: productName, price: price });
    }
    updateCartCount();
}
```

## Notification System (Related)

The cart uses the existing `showNotification()` function:

```javascript
function showNotification(message) {
    // Creates a toast notification that appears and fades out
    // Styled with gradient background and smooth animations
}
```

This is why you see "✓ Product added to cart!" messages when clicking buttons.

## Files Modified

- `script.js` - Cart functions added at top
- `index.html` - All product buttons with onclick handlers
- `styles.css` - Cart button styling

## Notes

- Cart currently stores data in JavaScript array only (resets on page reload)
- No backend/database connection yet
- Perfect for frontend demo and Google Ads approval
- Ready for backend integration when needed
