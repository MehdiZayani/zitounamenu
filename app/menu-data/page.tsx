"use client";
import React, { useState } from "react";
import menus from "../../data/menus_structured.json";

export default function MenuDataEditor() {
  const [text, setText] = useState(JSON.stringify(menus, null, 2));

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    alert('JSON copié dans le presse-papiers');
  };

  const download = () => {
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'menus_structured.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: '100vh', padding: 20, background: "url('/coffee/bg.png') center / cover fixed" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', background: 'rgba(0,0,0,0.4)', padding: 18, borderRadius: 8 }}>
        <h2 style={{ fontFamily: "'LaLuxes', serif", color: '#efe8d6', fontSize: 36 }}>Menus structurés</h2>
        <p style={{ color: '#c9b896' }}>Copiez/collez ou téléchargez le JSON pour le corriger localement, puis repastez-le ici si vous voulez prévisualiser.</p>

        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={copy} className="px-3 py-1 rounded bg-[#d4a574]">Copier</button>
            <button onClick={download} className="px-3 py-1 rounded bg-white/10">Télécharger</button>
          </div>

          <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ width: '100%', height: '70vh', marginTop: 12, background: 'rgba(255,255,255,0.02)', color: '#efe8d6', padding: 12, borderRadius: 6, border: '1px solid rgba(201,184,150,0.15)', fontFamily: 'monospace' }} />
        </div>
      </div>
    </div>
  );
}
