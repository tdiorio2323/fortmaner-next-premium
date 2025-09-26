import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterLegal(){
  const cls="hover:text-white transition-colors text-sm text-neutral-400"
  return (
    <nav aria-label="Legal" className="flex flex-wrap gap-4">
      <Link to="/size-guide" className={cls}>Size Guide</Link>
      <Link to="/shipping" className={cls}>Shipping</Link>
      <Link to="/returns" className={cls}>Returns</Link>
      <Link to="/privacy" className={cls}>Privacy</Link>
      <Link to="/contact" className={cls}>Contact</Link>
    </nav>
  )
}