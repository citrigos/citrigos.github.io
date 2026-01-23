# Content Files

This folder contains easy-to-edit JSON files for updating your website content.

## Files

### `bio.json`
Contains your biography paragraphs. Each paragraph is a separate object with a `text` field.

**To edit:**
1. Open `bio.json`
2. Edit the text within the quotes
3. Use HTML tags for links: `<a href='URL' target='_blank'>link text</a>`
4. Save the file
5. Run the update script (see below)

### `news.json`
Contains your news items in reverse chronological order (newest first).

**Format:**
- Each news item has a `date` field (e.g., "January 2026")
- Simple items have a `text` field
- Items with multiple points have an `items` array

**To add a new news item:**
1. Open `news.json`
2. Add a new object at the top of the `news` array:
   ```json
   {
     "date": "March 2026",
     "text": "Your news here"
   }
   ```
3. Or for multiple items:
   ```json
   {
     "date": "March 2026",
     "items": [
       "First item",
       "Second item"
     ]
   }
   ```
4. Save the file
5. Run the update script (see below)

## Updating the Website

After editing these files, you need to regenerate `index.html`:

```bash
# From the root of your website directory
node scripts/update-content.js
```

Then commit and push your changes:

```bash
git add .
git commit -m "Update bio/news content"
git push
```
