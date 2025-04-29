/**
 * Inventory Management App JS
 * Handles dashboard summary and items CRUD using localStorage
 */

// Define the threshold for low stock
const LOW_STOCK_THRESHOLD = 5;

// Utility: Get items from localStorage
function getItems() {
    return JSON.parse(localStorage.getItem('inventoryItems') || '[]');
}

// Utility: Save items to localStorage
function saveItems(items) {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
}

// Dashboard summary logic
function renderDashboard() {
    const summaryDiv = document.getElementById('dashboard-summary');
    if (!summaryDiv) return;

    const items = getItems();
    const totalItems = items.length;
    const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity), 0);

    // Check for low stock and no stock
    let lowStock = items.some(item => Number(item.quantity) > 0 && Number(item.quantity) < LOW_STOCK_THRESHOLD);
    let noStock = items.some(item => Number(item.quantity) === 0);

    // Filter low stock items
    const lowStockItems = items.filter(item => Number(item.quantity) > 0 && Number(item.quantity) < LOW_STOCK_THRESHOLD);
    
    let stockStatus = '';
    if (noStock) {
        stockStatus = `<span style="color: red;">No Stock Items Present</span>`;
    } else if (lowStock) {
        stockStatus = `<span style="color: red;">Low Stock Warning</span>`;
    } else if (totalItems > 0) {
        stockStatus = `<span style="color: green;">Stock Level OK</span>`;
    } else {
        stockStatus = `<span>No Items</span>`;
    }

    let lowStockHTML = '';
    if (lowStockItems.length > 0) {
        lowStockHTML = `
            <h3>Low Stock Items</h3>
            <ul>
                ${lowStockItems.map(item => `<li>${item.name} (Qty: ${item.quantity})</li>`).join('')}
            </ul>
        `;
    }

    summaryDiv.innerHTML = `
        <h2>Summary</h2>
        <p><strong>Total Items:</strong> ${totalItems}</p>
        <p><strong>Total Quantity:</strong> ${totalQuantity}</p>
        <p><strong>Status:</strong> ${stockStatus}</p>
        ${lowStockHTML}
    `;
}

// Items CRUD logic
function renderItemsPage() {
    const container = document.getElementById('items-container');
    if (!container) return;

    let items = getItems();

    // Form for adding/editing items
    let formHTML = `
        <h2>Add / Edit Item</h2>
        <form id="item-form">
            <input type="hidden" id="item-id" value="">
            <div>
                <label>Name: <input type="text" id="item-name" required></label>
            </div>
            <div>
                <label>Quantity: <input type="number" id="item-quantity" required min="0"></label>
            </div>
            <button type="submit">Save Item</button>
            <button type="button" id="cancel-edit" style="display:none;">Cancel</button>
        </form>
        <hr>
    `;

    // Table of items
    let tableHTML = `
        <h2>Items List</h2>
        <table border="1" cellpadding="8" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${items.map((item, idx) => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>
                            <button data-edit="${idx}">Edit</button>
                            <button data-delete="${idx}">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = formHTML + tableHTML;

    // Form handlers
    const form = document.getElementById('item-form');
    const cancelBtn = document.getElementById('cancel-edit');
    form.onsubmit = function(e) {
        e.preventDefault();
        const id = document.getElementById('item-id').value;
        const name = document.getElementById('item-name').value.trim();
        const quantity = Number(document.getElementById('item-quantity').value);

        if (id) {
            // Edit existing
            items[id] = { name, quantity };
        } else {
            // Add new
            items.push({ name, quantity });
        }
        saveItems(items);
        renderItemsPage();
    };

    cancelBtn.onclick = function() {
        form.reset();
        document.getElementById('item-id').value = '';
        cancelBtn.style.display = 'none';
    };

    // Edit/Delete handlers
    container.querySelectorAll('button[data-edit]').forEach(btn => {
        btn.onclick = function() {
            const idx = btn.getAttribute('data-edit');
            document.getElementById('item-id').value = idx;
            document.getElementById('item-name').value = items[idx].name;
            document.getElementById('item-quantity').value = items[idx].quantity;
            cancelBtn.style.display = 'inline';
        };
    });
    container.querySelectorAll('button[data-delete]').forEach(btn => {
        btn.onclick = function() {
            const idx = btn.getAttribute('data-delete');
            if (confirm('Delete this item?')) {
                items.splice(idx, 1);
                saveItems(items);
                renderItemsPage();
            }
        };
    });
}

// On page load, render appropriate content
window.onload = function() {
    renderDashboard();
    renderItemsPage();
};
