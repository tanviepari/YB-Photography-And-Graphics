
function showSection(id, element) {
    // Update menu title
    const titleMap = {
        'dashboard': 'Dashboard',
        'bookings': 'Bookings',
        'contacts': 'Enquiries',
        'feedback': 'Client Feedback',
        'portfolio': 'Portfolio Management'
    };
    document.getElementById('section-title').innerText = titleMap[id] || 'Dashboard';

    // Toggle sections
    document.querySelectorAll(".content-section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    // Toggle nav items
    if (element) {
        document.querySelectorAll(".nav-item").forEach(li => {
            li.classList.remove("active");
        });
        element.classList.add("active");
    }

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}


// --- DATA FETCHING ---

async function fetchStats() {
    try {
        const res = await fetch(getApiUrl('/api/admin/stats'));
        const data = await res.json();

        document.getElementById('stat-bookings').innerText = data.counts.bookings;
        document.getElementById('stat-enquiries').innerText = data.counts.contacts;
        document.getElementById('stat-feedback').innerText = data.counts.feedback;
        document.getElementById('stat-total').innerText = data.counts.totalEnquiries;

        // Populate recent lists
        populateRecentList('recent-bookings-list', data.recent.bookings, (item) => `
            <div class="data-item">
                <div class="item-main">
                    <span class="item-title">${item.name}</span>
                    <span class="item-sub">${item.event_type} - ${formatDate(item.event_date)}</span>
                </div>
                <div class="item-meta">${formatTimeAgo(item.booking_time)}</div>
            </div>
        `);

        populateRecentList('recent-contacts-list', data.recent.contacts, (item) => `
            <div class="data-item">
                <div class="item-main">
                    <span class="item-title">${item.name}</span>
                    <span class="item-sub">${truncateText(item.message, 40)}</span>
                </div>
                <div class="item-meta">${formatTimeAgo(item.submitted_at)}</div>
            </div>
        `);

    } catch (err) {
        console.error('Error fetching stats:', err);
    }
}

async function fetchBookings() {
    try {
        const res = await fetch(getApiUrl('/api/admin/bookings'));
        const data = await res.json();
        const tbody = document.getElementById('bookings-table-body');
        tbody.innerHTML = data.map(item => `
            <tr>
                <td><strong>${item.name}</strong><br><small>${item.email}</small></td>
                <td>${item.event_type}</td>
                <td>${formatDate(item.event_date)}</td>
                <td>${item.location || 'N/A'}</td>
                <td>${item.phone}</td>
                <td>
                    <select class="status-select" 
                            style="padding:4px; border-radius:4px; font-size:0.8rem; border:1px solid #ccc; width:100%; margin-bottom:5px; color:${item.status === 'Accepted' ? '#388e3c' : item.status === 'Rejected' ? '#d32f2f' : '#f57c00'}"
                            onchange="this.style.color = (this.value === 'Accepted' ? '#388e3c' : this.value === 'Rejected' ? '#d32f2f' : '#f57c00'); updateBookingStatus(${item.booking_id}, this.value)">

                        <option value="Pending" ${!item.status || item.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Accepted" ${item.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                        <option value="Rejected" ${item.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    </select>
                    <small style="display:block; max-width:200px;">${item.message || '-'}</small>
                </td>
                <td style="white-space:nowrap">
                    <button class="view-all" style="background:#ff4444; color:white; padding:4px 8px; border-radius:4px;" 
                            onclick="deleteBooking(${item.booking_id})">Delete</button>
                </td>

            </tr>
        `).join('') || '<tr><td colspan="7" style="text-align:center">No bookings found</td></tr>';

    } catch (err) {
        console.error('Error fetching bookings:', err);
    }
}

async function fetchContacts() {
    try {
        const res = await fetch(getApiUrl('/api/admin/contacts'));
        const data = await res.json();
        const tbody = document.getElementById('contacts-table-body');
        tbody.innerHTML = data.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.message}</td>
                <td>${formatDate(item.submitted_at)}</td>
                <td>
                    <button class="view-all" style="background:#ff4444; color:white; padding:4px 8px; border-radius:4px;" 
                            onclick="deleteContact(${item.contact_id})">Delete</button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="6" style="text-align:center">No enquiries found</td></tr>';

    } catch (err) {
        console.error('Error fetching contacts:', err);
    }
}

async function fetchFeedback() {
    try {
        console.log('Fetching feedback from:', getApiUrl('/api/admin/feedback'));
        const res = await fetch(getApiUrl('/api/admin/feedback'));
        const data = await res.json();
        console.log('Feedback data received:', data);
        const tbody = document.getElementById('feedback-table-body');
        if (!tbody) {
            console.error('Feedback table body not found!');
            return;
        }

        tbody.innerHTML = data.map(item => `
            <tr>
                <td><strong>${item.client_name}</strong><br><small>${item.email}</small></td>
                <td>${'⭐'.repeat(item.rating || 0)}</td>
                <td>${item.feedback}</td>
                <td>${formatDate(item.submitted_at)}</td>
                <td>
                    <button class="view-all" style="background:#ff4444; color:white; padding:4px 8px; border-radius:4px;" 
                            onclick="deleteFeedback(${item.testimonial_id})">Delete</button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="5" style="text-align:center">No feedback found</td></tr>';

    } catch (err) {
        console.error('Error fetching feedback:', err);
    }
}

async function fetchGallery() {
    try {
        const res = await fetch(getApiUrl('/api/gallery'));
        const data = await res.json();
        const tbody = document.getElementById('portfolio-table-body');
        tbody.innerHTML = data.map(item => `
            <tr>
                <td><img src="${item.image_url}" alt="Preview" style="height:50px; border-radius:4px; object-fit:cover;"></td>
                <td style="text-transform: capitalize;">${item.category}</td>
                <td>${item.description || '-'}</td>
                <td>
                    <button class="view-all" style="background:#ff4444; color:white; padding:4px 8px; border-radius:4px;" 
                            onclick="deletePhoto(${item.photo_id})">Delete</button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="4" style="text-align:center">No images in gallery</td></tr>';
    } catch (err) {
        console.error('Error fetching gallery:', err);
    }
}

async function deletePhoto(id) {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    try {
        const res = await fetch(getApiUrl(`/api/gallery/${id}`), { method: 'DELETE' });
        if (res.ok) fetchGallery();
    } catch (err) {
        console.error('Error deleting photo:', err);
    }
}

async function updateBookingStatus(id, status) {
    console.log(`Updating booking ${id} to ${status}`);
    try {
        const res = await fetch(getApiUrl(`/api/admin/bookings/${id}`), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (res.ok) {
            console.log('Status updated successfully');
            fetchBookings();
        } else {
            console.error('Failed to update status:', await res.text());
        }
    } catch (err) {
        console.error('Error updating status:', err);
    }
}

async function deleteBooking(id) {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
        console.log(`Deleting booking ${id}`);
        const res = await fetch(getApiUrl(`/api/admin/bookings/${id}`), { method: 'DELETE' });
        if (res.ok) {
            console.log('Booking deleted');
            fetchBookings();
            fetchStats();
        } else {
            console.error('Delete failed:', await res.text());
        }
    } catch (err) {
        console.error('Error deleting booking:', err);
    }
}


async function deleteContact(id) {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
        console.log(`Deleting contact ${id}`);
        const res = await fetch(getApiUrl(`/api/admin/contacts/${id}`), { method: 'DELETE' });
        if (res.ok) {
            console.log('Contact deleted');
            fetchContacts();
            fetchStats();
        } else {
            console.error('Delete failed:', await res.text());
        }
    } catch (err) {
        console.error('Error deleting contact:', err);
    }
}

async function deleteFeedback(id) {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    try {
        console.log(`Deleting feedback ${id}`);
        const res = await fetch(getApiUrl(`/api/admin/feedback/${id}`), { method: 'DELETE' });
        if (res.ok) {
            console.log('Feedback deleted');
            fetchFeedback();
            fetchStats();
        } else {
            console.error('Delete failed:', await res.text());
        }
    } catch (err) {
        console.error('Error deleting feedback:', err);
    }
}



// File Name Display Logic
const imageInput = document.getElementById('portfolio-image');
const uploadText = document.getElementById('upload-text');

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        uploadText.innerText = file.name;
    } else {
        uploadText.innerText = 'Click to select file';
    }
});

// Form Submission handling
document.getElementById('portfolio-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('upload-btn');
    const OriginalText = btn.innerText;
    btn.innerText = 'Uploading...';
    btn.disabled = true;

    const formData = new FormData();
    formData.append('image', document.getElementById('portfolio-image').files[0]);
    formData.append('category', document.getElementById('portfolio-category').value);
    formData.append('description', document.getElementById('portfolio-desc').value);

    try {
        const res = await fetch(getApiUrl('/api/gallery'), {
            method: 'POST',
            body: formData
        });
        const result = await res.json();
        if (result.success) {
            alert('Image uploaded successfully!');
            document.getElementById('portfolio-form').reset();
            // Reset text
            uploadText.innerText = 'Click to select file';
            
            fetchGallery();
        } else {
            alert(`Upload failed: ${result.error}\nDetails: ${result.details || 'Check server logs'}`);
        }
    } catch (err) {
        console.error('Upload Error:', err);
        alert('An error occurred during upload.');
    } finally {
        btn.innerText = OriginalText;
        btn.disabled = false;
    }
});

// Update init
document.addEventListener('DOMContentLoaded', () => {
    fetchStats();
    fetchBookings();
    fetchContacts();
    fetchFeedback();
    fetchGallery();
});

// --- HELPERS ---

function populateRecentList(id, items, templateFn) {
    const list = document.getElementById(id);
    if (!items || items.length === 0) {
        list.innerHTML = '<p class="loading">No recent data</p>';
        return;
    }
    list.innerHTML = items.map(templateFn).join('');
}

function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTimeAgo(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

function truncateText(text, len) {
    if (!text) return '';
    return text.length > len ? text.substring(0, len) + '...' : text;
}