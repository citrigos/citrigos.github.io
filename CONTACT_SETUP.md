# Contact Form Setup Instructions

The contact form uses [Formspree](https://formspree.io/) to handle form submissions and send emails to you.

## Setup Steps

1. **Go to Formspree**: Visit https://formspree.io/
2. **Sign up** for a free account (allows 50 submissions per month)
3. **Create a new form**:
   - Click "New Form"
   - Enter your email: `citrigos@berkeley.edu`
   - Copy the form endpoint (looks like: `https://formspree.io/f/xyzabc123`)
4. **Update index.html**:
   - Open `index.html`
   - Find the line: `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
   - Replace `YOUR_FORM_ID` with your actual form ID from Formspree
5. **Deploy** and test

## Alternative: Simple mailto link

If you prefer not to use Formspree, you can replace the entire form with a simple mailto link:

```html
<div style="text-align: center; padding: 3rem;">
    <h2 style="color: #666; font-weight: 400; margin-bottom: 1.5rem;">Get in Touch</h2>
    <p style="color: #666; margin-bottom: 2rem;">Feel free to reach out via email</p>
    <a href="mailto:citrigos@berkeley.edu"
       style="display: inline-block; padding: 0.75rem 2rem; background: #666; color: white; text-decoration: none; border-radius: 4px; font-weight: 400;">
        Send Email
    </a>
</div>
```

## Current Status

The form is ready but needs the Formspree form ID to be functional. Until then, users can still use the direct email link provided below the form.
