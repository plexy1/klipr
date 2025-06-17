# KLIPR Media Website

Website for KLIPR Media, hosted on Vercel.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SHEETS_API_URL="your-google-sheets-api-url-here"
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `NEXT_PUBLIC_SHEETS_API_URL`: Google Sheets API endpoint for form submissions

## Security Notes

- Never commit `.env.local` or any other files containing sensitive information
- Keep your Google Sheets API endpoint URL private
- The repository is configured to ignore sensitive files through `.gitignore`
