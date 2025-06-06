
# Myst Detailing - Web App

## 🧠 Project Overview

Myst Detailing needed a modern, fast, and self-hosted eCommerce solution to sell their flagship detailing extractor kit. I built a full-stack web application using **Django** and **Vite + React**, with full **Stripe integration** and a clean, user-friendly interface.

This project demonstrates my ability to design, build, and integrate all layers of a web app—from the backend APIs and admin panel to the frontend shopping experience and payment flow.


## 🔧 Key Features

### 💻 Frontend (Vite + React)
- Clean single-product landing page
- Responsive layout with modern UI
- Smooth Stripe Checkout integration
- Contact form with backend delivery
- Real-time form validation and user feedback

### 💾 Backend (Django)
- REST API with custom serializers and viewsets
- Admin panel for:
  - Managing product info (name, price, description)
  - Uploading and editing product images
  - Viewing and updating orders
  - Tracking customer info and order status
  - Viewing contact form submissions
- Stripe integration (Checkout + Webhooks)
- Django admin secured via authentication

## 🛒 Stripe Checkout Flow

1. Customer clicks "Buy Now"
2. Customer selects quantity of product
3. Customer clicks "Procced to Checkout"
2. Redirected to secure Stripe Checkout
3. On success, they're redirected to a confirmation page
4. Webhook updates order status in backend
5. Admin can see order details, payment status, and fulfillment info

## 🖼️ Admin Interface

The Django admin panel gives the business owner full control:

- **Product Editor** – change title, description, price, and images
- **Order Viewer** – see customer details and Stripe payment status
- **Status Updates** – mark orders as fulfilled/shipped
- **Contact Submissions** – track customer inquiries
- **Review Viewer** - see customer reviews on product

## 🛠 Tech Stack

| Layer       | Technology                |
|------------|----------------------------|
| Frontend    | Vite + React 19, Mantine UI |
| Backend     | Django 5+ (with REST Framework) |
| Database    | MySQL (or SQLite for local dev) |
| Payments    | Stripe Checkout & Webhooks |
| Auth        | Django Admin Auth |
| Deployment  | Self-hosted, Dockerized |
| CDN/DNS     | Cloudflare |


## 🎯 Skills Demonstrated

- Full-stack development with Django + React
- RESTful API design and integration
- Payment processing with Stripe
- Admin dashboard design for non-technical users
- Frontend performance optimization (Vite)
- Dockerized architecture and secure hosting
- End-to-end project delivery for a real business

## 👨‍🔧 Built by

**Izaak Ford-Dow**  
[https://rillastudios.ca](https://rillastudios.ca)

## 📝 License

This work is licensed under a [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/).