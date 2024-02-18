document.addEventListener('DOMContentLoaded', function() {
    let totalSeats = 40;
    let seatLeftCount = document.getElementById('seatLeftCount');
    let addedSeatCount = document.getElementById('addedSeat');
    let addedTicketdetails = document.getElementById('addedTicketdetails');
    let totalAmount = document.getElementById('totalAmount');
    let seatPrice = 550; // Price per seat

    // Update the seats left count
    function updateSeatsLeft() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        let remainingSeats = totalSeats - selectedButtons.length;
        seatLeftCount.textContent = remainingSeats;
    }

    // Update the selected seat count
    function updateSelectedSeatCount() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        addedSeatCount.textContent = selectedButtons.length;
    }

    // Calculate total amount based on selected seats
    function calculateTotalAmount() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        let totalPrice = selectedButtons.length * seatPrice;
        return totalPrice;
    }

    // Update the total amount display
    function updateTotalAmount() {
        let totalPrice = calculateTotalAmount();
        totalAmount.textContent = totalPrice.toFixed(2);
    }

    // Add selected seat to the table
    function addSelectedSeatToTable(button) {
        let seatNumber = button.textContent;
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${seatNumber}</td>
        <td>Economy</td>
        <td>${seatPrice}</td>
      `;
        row.dataset.seatNumber = seatNumber;
        addedTicketdetails.appendChild(row);
    }

    // Remove selected seat from the table
    function removeSelectedSeatFromTable(button) {
        let seatNumber = button.textContent;
        let rowToRemove = addedTicketdetails.querySelector(`tr[data-seat-number="${seatNumber}"]`);
        if (rowToRemove) {
            rowToRemove.remove();
        }
    }

    // Get all seat buttons
    let seatButtons = document.querySelectorAll('.seat-inner-lists button');

    // Add click event listener to each seat button
    seatButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Check if the button is already selected
            if (button.classList.contains('selectedSeatBtn')) {
                // Deselect the button
                button.classList.remove('selectedSeatBtn');
                // Remove the seat from the table
                removeSelectedSeatFromTable(button);
            } else {
                // Check if the limit of 4 selected buttons has been reached
                let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
                if (selectedButtons.length < 4) {
                    // Select the button
                    button.classList.add('selectedSeatBtn');
                    // Add the seat to the table
                    addSelectedSeatToTable(button);
                } else {
                    // Alert the user that the limit has been reached
                    alert('You can only select 4 seats.');
                }
            }
            // Update the seats left count
            updateSeatsLeft();
            // Update the selected seat count
            updateSelectedSeatCount();
            // Update the total amount display
            updateTotalAmount();
        });
    });

    // Initial update of seats left count
    updateSeatsLeft();
    // Initial update of selected seat count
    updateSelectedSeatCount();
    // Initial update of total amount display
    updateTotalAmount();
});

// Coupon Part
document.addEventListener('DOMContentLoaded', function() {
    let seatPrice = 550; // Price per seat
    let couponCodes = {
        'NEW15': 0.15, // 15% off
        'Couple 20': 0.20 // 20% off
    };

    // Function to calculate total amount
    function calculateTotalAmount() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        let totalPrice = selectedButtons.length * seatPrice;
        return totalPrice;
    }

    // Function to calculate discounted price
    function calculateDiscountedPrice(totalPrice, discount) {
        return totalPrice * (1 - discount);
    }

    // Function to update total amount display
    function updateTotalAmount(discountedPrice) {
        let grandtotalAmount = document.getElementById('grandtotalAmount');
        grandtotalAmount.textContent = discountedPrice.toFixed(2);
    }

    // Function to update total discount amount display
    function updateTotalDiscountAmount(discountAmount) {
        let totalDiscountAmount = document.getElementById('totaldiscount-amount');
        totalDiscountAmount.textContent = discountAmount.toFixed(2);
    }

    // Apply coupon code
    document.getElementById('applyCoupon').addEventListener('click', function() {
        let couponInput = document.getElementById('couponInput').value.trim(); // Trim the input value
        let discount = couponCodes[couponInput];
        if (discount !== undefined) {
            let totalPrice = calculateTotalAmount(); // Calculate total amount
            let discountedPrice = calculateDiscountedPrice(totalPrice, discount); // Calculate discounted price
            let discountAmount = totalPrice - discountedPrice; // Calculate discount amount
            updateTotalAmount(discountedPrice); // Update total amount with discounted price
            updateTotalDiscountAmount(discountAmount); // Update total discount amount
            document.getElementById('couponInput').value = ''; // Clear input value
            document.getElementById('coupon-input-box').classList.add('disabledCouponBox'); // Add 'disabled' class to button
            document.getElementById('copuponSuccessMessage').classList.add('success-show-message'); // Add 'success' class to message element
        } else {
            alert('Invalid coupon code, try "NEW15" or "Couple 20"');
        }
    });

    // Function to update Apply Coupon button state
    function updateApplyCouponButtonState() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        let applyCouponButton = document.getElementById('applyCoupon');
        let couponInput = document.getElementById('couponInput');
        if (selectedButtons.length === 4) {
            applyCouponButton.removeAttribute('disabled');
            couponInput.removeAttribute('disabled');
        } else {
            applyCouponButton.setAttribute('disabled', 'disabled');
            couponInput.setAttribute('disabled', 'disabled');
        }
    }

    // Add event listener to seat buttons to update total amount display and Apply Coupon button state
    let seatButtons = document.querySelectorAll('.seat-inner-lists button');
    seatButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let totalPrice = calculateTotalAmount();
            updateTotalAmount(totalPrice); // Update total amount display with regular price
            updateApplyCouponButtonState();
        });
    });

    // Initialize Apply Coupon button state
    updateApplyCouponButtonState();
});
