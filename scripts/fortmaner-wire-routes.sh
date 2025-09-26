set -euo pipefail

APP=src/App.tsx
FOOT=src/components/Footer.tsx

# 1) Ensure pages exist
for p in Contact SizeGuide Shipping Returns Privacy; do
  [ -f "src/pages/$p.tsx" ] || { echo "Missing src/pages/$p.tsx"; exit 1; }
done

# 2) Add imports to App.tsx if absent
node - <<'NODE'
const fs=require('fs'), f='src/App.tsx'
let s=fs.readFileSync(f,'utf8')
const imports=[
  `import Contact from './pages/Contact'`,
  `import SizeGuide from './pages/SizeGuide'`,
  `import Shipping from './pages/Shipping'`,
  `import Returns from './pages/Returns'`,
  `import Privacy from './pages/Privacy'`,
]
for(const imp of imports){ if(!s.includes(imp)) s = s.replace(/(^import .*?\n)(?!import )/ms, `$1${imp}\n`) }
if(!/import Contact from '\.\/pages\/Contact'/.test(s)){ // fallback: prepend to file
  s = imports.join('\n') + '\n' + s
}
fs.writeFileSync(f,s)
NODE

# 3) Inject <Route/> entries inside <Routes>…</Routes>
node - <<'NODE'
const fs=require('fs'), f='src/App.tsx'
let s=fs.readFileSync(f,'utf8')
const block = `
              <Route path="/contact" element={<Contact />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/privacy" element={<Privacy />} />`
if(!s.includes('path="/size-guide"')){
  s = s.replace(/(<Route path="\/account" element={<Account \/>} \/>)/m, `$1${block}`)
}
fs.writeFileSync(f,s)
NODE

# 4) Wire FooterLegal into Footer.tsx (import + JSX)
if [ -f "$FOOT" ]; then
  node - <<'NODE'
const fs=require('fs'), f='src/components/Footer.tsx'
let s=fs.readFileSync(f,'utf8')
if(!s.includes(`FooterLegal`)){
  // import
  if(!s.includes(`@/components/FooterLegal`)){
    s = s.replace(/(^import .*?\n)(?!import )/ms, `$1import FooterLegal from '@/components/FooterLegal'\n`)
  }
  // inject <FooterLegal />
  if(!s.includes('<FooterLegal')){
    s = s.replace(/(<\/footer>)/i, `        <FooterLegal />\n      $1`)
  }
  fs.writeFileSync(f,s)
}
NODE
else
  echo "Note: $FOOT not found. Manually place <FooterLegal /> in your footer."
fi

echo "Routes and footer links wired."