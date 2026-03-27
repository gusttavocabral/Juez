#!/bin/bash
echo "🔄 Sincronizando Juez com o Vercel..."
git add .
git commit -m "sync: automação de atualização"
git push origin main
echo "✅ Pronto! Suas alterações estão sendo publicadas."
