#!/bin/bash

echo "🔍 Checking Calibre Food Setup..."
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "✅ .env file exists"
else
    echo "❌ .env file missing - run: cp .env.example .env"
    exit 1
fi

# Check if node_modules exists
if [ -d node_modules ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Dependencies not installed - run: npm install"
    exit 1
fi

# Check for required env variables
if grep -q "EXPO_PUBLIC_SUPABASE_URL=https://nghwumkltrfttybispmr.supabase.co" .env; then
    echo "✅ Supabase URL configured"
else
    echo "⚠️  Supabase URL might not be configured correctly"
fi

if grep -q "your_supabase_service_role_key_here" .env; then
    echo "⚠️  Supabase service key needs to be updated in .env"
else
    echo "✅ Supabase service key appears to be set"
fi

if grep -q "your_gemini_api_key_here" .env; then
    echo "⚠️  Gemini API key not set (optional - AI scanning won't work)"
else
    echo "✅ Gemini API key appears to be set"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Update .env with your actual Supabase keys from:"
echo "   https://supabase.com/dashboard/project/nghwumkltrfttybispmr/settings/api"
echo ""
echo "2. Run database migration in Supabase SQL Editor"
echo ""
echo "3. Start the app: npx expo start"
echo ""
