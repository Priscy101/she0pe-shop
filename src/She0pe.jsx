import { useState, useRef } from "react";

/* ─── GOOGLE FONTS ─────────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Satisfy&display=swap');`;

/* ─── GLOBAL CSS ────────────────────────────────────────────────────────── */
const CSS = `
:root {
  --c: #F5EFE4;        /* cream */
  --cd: #E8DDC8;       /* cream dark */
  --ink: #1E1B15;      /* near black */
  --forest: #2C4A3E;   /* deep green */
  --flt: #3D6455;      /* forest light */
  --moss: #6B8F71;     /* moss */
  --gold: #C4913A;     /* gold */
  --goldf: #E6B05A;    /* gold fade */
  --terra: #A0522D;    /* terracotta */
  --blush: #D9B896;    /* blush */
  --white: #FEFCF7;    /* warm white */
  --shadow: rgba(30,27,21,0.12);
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Lora',Georgia,serif;background:var(--c);color:var(--ink);min-height:100vh;}
button{cursor:pointer;font-family:'Lora',serif;}
input,select,textarea{font-family:'Lora',serif;}
img{max-width:100%;display:block;}

/* ── NAV ──────────────────────────────────────────── */
.nav{position:fixed;top:0;left:0;right:0;z-index:200;background:var(--forest);height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;box-shadow:0 2px 24px rgba(0,0,0,0.18);}
.nav-logo{font-family:'Satisfy',cursive;font-size:1.75rem;color:var(--blush);cursor:pointer;letter-spacing:1px;}
.nav-logo span{color:var(--gold);}
.nav-links{display:flex;align-items:center;gap:0.2rem;}
.nav-btn{background:none;border:none;color:rgba(232,221,200,0.8);font-family:'Lora',serif;font-size:0.88rem;letter-spacing:0.4px;padding:0.5rem 0.8rem;border-radius:4px;transition:all 0.2s;position:relative;}
.nav-btn:hover{color:var(--blush);background:rgba(255,255,255,0.07);}
.nav-btn.act{color:var(--blush);font-weight:600;}
.nav-btn.act::after{content:'';position:absolute;bottom:4px;left:0.8rem;right:0.8rem;height:1.5px;background:var(--gold);}
.nav-admin-btn{background:rgba(196,145,58,0.2);border:1px solid rgba(196,145,58,0.4);color:var(--goldf);font-size:0.82rem;padding:0.4rem 0.9rem;border-radius:20px;transition:all 0.2s;}
.nav-admin-btn:hover{background:rgba(196,145,58,0.35);}

/* ── PAGE ─────────────────────────────────────────── */
.page{min-height:100vh;padding-top:60px;animation:fadeIn 0.3s ease;}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* ── HERO ─────────────────────────────────────────── */
.hero{background:var(--forest);min-height:92vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:3rem 2rem;}
.hero-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(196,145,58,0.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;}
.hero-glow{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(196,145,58,0.09) 0%,transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
.hero-leaf{position:absolute;font-size:8rem;opacity:0.04;pointer-events:none;}
.hero-leaf.l1{top:10%;left:5%;transform:rotate(-20deg);}
.hero-leaf.l2{bottom:10%;right:5%;transform:rotate(30deg);}
.hero-inner{position:relative;z-index:2;text-align:center;max-width:780px;}
.hero-eyebrow{font-size:0.78rem;letter-spacing:5px;text-transform:uppercase;color:var(--moss);margin-bottom:1.4rem;}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(3.2rem,8vw,6.5rem);color:var(--white);line-height:1.05;margin-bottom:1.8rem;}
.hero-title em{color:var(--gold);font-style:italic;}
.hero-quote{font-size:clamp(0.95rem,2vw,1.15rem);color:var(--blush);line-height:1.9;max-width:640px;margin:0 auto 2.5rem;font-style:italic;font-weight:400;}
.hero-quote strong{color:var(--goldf);font-style:normal;}
.hero-actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btn-gold{background:var(--gold);color:var(--ink);border:none;padding:0.8rem 2rem;font-family:'Lora',serif;font-size:0.95rem;border-radius:4px;letter-spacing:0.4px;transition:all 0.22s;}
.btn-gold:hover{background:var(--goldf);transform:translateY(-2px);box-shadow:0 8px 24px rgba(196,145,58,0.3);}
.btn-ghost{background:transparent;color:var(--blush);border:1.5px solid rgba(109,143,113,0.5);padding:0.8rem 2rem;font-family:'Lora',serif;font-size:0.95rem;border-radius:4px;transition:all 0.22s;}
.btn-ghost:hover{border-color:var(--moss);background:rgba(109,143,113,0.1);transform:translateY(-2px);}
.scroll-hint{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);color:rgba(232,221,200,0.4);font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:0.4rem;}
.scroll-hint::after{content:'↓';animation:bounce 2s infinite;}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}

/* ── SECTION SHARED ───────────────────────────────── */
.section{padding:4.5rem 2rem;max-width:1140px;margin:0 auto;}
.section.wide{max-width:100%;padding-left:4vw;padding-right:4vw;}
.sh{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4vw,2.7rem);color:var(--forest);text-align:center;margin-bottom:0.4rem;}
.sh em{color:var(--terra);font-style:italic;}
.sh-line{width:52px;height:2px;background:var(--gold);margin:0.6rem auto 3rem;}
.sh-sub{text-align:center;color:var(--moss);font-style:italic;font-size:1rem;margin-bottom:2.5rem;margin-top:-2rem;}

/* ── BOOK GRID ────────────────────────────────────── */
.book-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:2rem;}
.bcard{background:var(--white);border-radius:10px;overflow:hidden;box-shadow:0 4px 20px var(--shadow);transition:transform 0.25s,box-shadow 0.25s;cursor:pointer;}
.bcard:hover{transform:translateY(-7px);box-shadow:0 14px 40px rgba(30,27,21,0.15);}
.bcover{height:260px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:1.2rem;}
.bcover img{width:100%;height:100%;object-fit:cover;border-radius:4px;}
.bcover-placeholder{width:148px;height:210px;border-radius:4px 10px 10px 4px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;text-align:center;position:relative;box-shadow:5px 5px 18px rgba(0,0,0,0.22),inset -4px 0 8px rgba(0,0,0,0.12);}
.bcover-spine{position:absolute;left:0;top:0;bottom:0;width:10px;border-radius:4px 0 0 4px;background:rgba(0,0,0,0.2);}
.bcover-title{font-family:'Cormorant Garamond',serif;font-size:0.82rem;color:white;font-weight:700;line-height:1.3;margin-bottom:0.5rem;}
.bcover-author{font-size:0.65rem;color:rgba(255,255,255,0.75);font-style:italic;}
.binfo{padding:1.2rem;}
.b-genre{font-size:0.72rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--moss);margin-bottom:0.35rem;}
.b-title{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;color:var(--ink);margin-bottom:0.25rem;line-height:1.3;}
.b-author{font-size:0.85rem;color:#777;font-style:italic;margin-bottom:0.5rem;}
.b-price{font-size:0.95rem;color:var(--terra);font-weight:600;margin-bottom:0.8rem;}
.b-excerpt{font-size:0.88rem;color:#555;line-height:1.65;margin-bottom:1rem;font-style:italic;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.b-actions{display:flex;gap:0.5rem;}
.btn-order{flex:1;background:var(--forest);color:white;border:none;padding:0.55rem 0.7rem;border-radius:4px;font-size:0.88rem;transition:background 0.2s;}
.btn-order:hover{background:var(--flt);}
.btn-about{background:var(--cd);color:var(--forest);border:1.5px solid var(--cd);padding:0.55rem 0.7rem;border-radius:4px;font-size:0.88rem;transition:all 0.2s;}
.btn-about:hover{border-color:var(--forest);background:var(--c);}

/* ── GREEN BAND ───────────────────────────────────── */
.green-band{background:var(--forest);padding:4rem 2rem;text-align:center;}
.green-band-inner{max-width:720px;margin:0 auto;}
.gb-quote{font-family:'Cormorant Garamond',serif;font-size:clamp(1.3rem,3.5vw,2rem);color:var(--white);font-style:italic;line-height:1.7;margin:0.5rem 0 1rem;}
.gb-attr{font-size:0.78rem;letter-spacing:3px;text-transform:uppercase;color:var(--moss);}
.gb-open{font-size:3.5rem;color:var(--gold);line-height:0.6;display:block;margin-bottom:0.5rem;font-family:'Cormorant Garamond',serif;}

/* ── ABOUT ────────────────────────────────────────── */
.about-wrap{display:grid;grid-template-columns:1fr 1.7fr;gap:4rem;align-items:center;padding:5rem 2rem;max-width:1100px;margin:0 auto;}
.author-card{background:var(--forest);border-radius:12px;aspect-ratio:3/4;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:2rem;position:relative;overflow:hidden;}
.author-card-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0.06;font-family:'Cormorant Garamond',serif;font-size:7rem;color:white;text-align:center;line-height:1.1;padding:1rem;}
.author-icon{width:90px;height:90px;border-radius:50%;background:var(--blush);display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin-bottom:1rem;position:relative;z-index:1;}
.author-card-name{font-family:'Satisfy',cursive;font-size:1.6rem;color:var(--blush);position:relative;z-index:1;}
.author-card-tag{font-size:0.75rem;color:var(--moss);letter-spacing:2px;text-transform:uppercase;position:relative;z-index:1;margin-top:0.3rem;}
.about-content h2{font-family:'Cormorant Garamond',serif;font-size:2.4rem;color:var(--forest);margin-bottom:0.3rem;}
.about-content .sub{color:var(--terra);font-style:italic;font-size:1.05rem;margin-bottom:1.5rem;}
.about-content p{line-height:1.95;color:#3A3530;font-size:1rem;margin-bottom:1rem;}
.about-stats{display:flex;gap:2.5rem;margin-top:1.8rem;flex-wrap:wrap;}
.stat{text-align:center;}
.stat-n{font-family:'Cormorant Garamond',serif;font-size:2.2rem;color:var(--terra);font-weight:700;}
.stat-l{font-size:0.75rem;color:var(--moss);letter-spacing:1.5px;text-transform:uppercase;}

/* ── EVENTS ───────────────────────────────────────── */
.events-bg{background:var(--forest);padding:5rem 2rem;}
.events-inner{max-width:1140px;margin:0 auto;}
.ev-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;}
.ev-card{background:rgba(255,255,255,0.07);border:1px solid rgba(196,145,58,0.28);border-radius:10px;padding:1.5rem;transition:background 0.2s;}
.ev-card:hover{background:rgba(255,255,255,0.11);}
.ev-date-box{display:inline-flex;flex-direction:column;align-items:center;background:var(--terra);border-radius:8px;padding:0.45rem 0.9rem;margin-bottom:1rem;min-width:56px;}
.ev-day{font-family:'Cormorant Garamond',serif;font-size:1.7rem;color:white;line-height:1;}
.ev-month{font-size:0.7rem;color:rgba(255,255,255,0.85);text-transform:uppercase;letter-spacing:1px;}
.ev-title{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:var(--blush);margin-bottom:0.4rem;font-weight:600;}
.ev-detail{font-size:0.9rem;color:var(--moss);margin-bottom:0.22rem;line-height:1.5;}
.ev-badge{display:inline-block;background:rgba(196,145,58,0.2);color:var(--goldf);font-size:0.72rem;letter-spacing:1px;text-transform:uppercase;padding:0.2rem 0.6rem;border-radius:12px;margin-top:0.6rem;}
.no-events{text-align:center;color:rgba(196,145,58,0.5);font-style:italic;padding:3rem 0;font-size:1.1rem;}

/* ── FEEDBACK ─────────────────────────────────────── */
.reviews-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;margin-bottom:3rem;}
.rv-card{background:var(--white);border-radius:10px;padding:1.5rem;box-shadow:0 4px 18px var(--shadow);border-left:3px solid var(--gold);}
.rv-stars{color:var(--gold);font-size:1rem;margin-bottom:0.6rem;letter-spacing:2px;}
.rv-text{font-size:0.97rem;line-height:1.75;color:#3A3530;font-style:italic;margin-bottom:0.8rem;}
.rv-name{font-size:0.87rem;color:var(--moss);font-weight:600;}
.rv-book{font-size:0.8rem;color:#999;}
.fb-form{background:var(--white);border-radius:12px;padding:2rem;box-shadow:0 4px 22px var(--shadow);}
.fb-form h3{font-family:'Cormorant Garamond',serif;font-size:1.6rem;color:var(--forest);margin-bottom:1.5rem;}
.no-reviews{text-align:center;color:#aaa;font-style:italic;padding:2rem;grid-column:1/-1;}

/* ── FORM ELEMENTS ────────────────────────────────── */
.frow{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;}
.fg{display:flex;flex-direction:column;gap:0.35rem;margin-bottom:1rem;}
.fg label{font-size:0.84rem;color:var(--forest);font-weight:600;letter-spacing:0.3px;}
.fg input,.fg select,.fg textarea{background:var(--c);border:1.5px solid var(--cd);border-radius:5px;padding:0.65rem 0.85rem;font-size:0.97rem;color:var(--ink);outline:none;transition:border-color 0.2s;}
.fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--forest);}
.fg textarea{resize:vertical;min-height:100px;}
.star-row{display:flex;gap:0.3rem;}
.star-btn{background:none;border:none;font-size:1.6rem;line-height:1;padding:0;transition:transform 0.15s;}
.star-btn:hover{transform:scale(1.25);}

/* ── MODAL ────────────────────────────────────────── */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:500;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(4px);animation:fadeIn 0.2s;}
.modal{background:var(--white);border-radius:14px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;padding:2rem;box-shadow:0 24px 64px rgba(0,0,0,0.25);animation:slideUp 0.25s ease;}
.modal.wide{max-width:680px;}
@keyframes slideUp{from{transform:translateY(22px);opacity:0}to{transform:translateY(0);opacity:1}}
.modal-hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;}
.modal-hd h2{font-family:'Cormorant Garamond',serif;color:var(--forest);font-size:1.7rem;line-height:1.2;}
.modal-close{background:none;border:none;font-size:1.5rem;color:#aaa;line-height:1;transition:color 0.2s;flex-shrink:0;margin-left:1rem;}
.modal-close:hover{color:var(--terra);}
.modal-sub{color:var(--moss);font-style:italic;font-size:0.95rem;margin-top:-1rem;margin-bottom:1.5rem;}

/* ── ORDER MODAL ─────────────────────────────────── */
.type-toggle{display:flex;border:1.5px solid var(--forest);border-radius:6px;overflow:hidden;margin-bottom:1.5rem;}
.type-btn{flex:1;padding:0.7rem;border:none;font-family:'Lora',serif;font-size:0.92rem;transition:all 0.2s;background:transparent;color:var(--forest);}
.type-btn+.type-btn{border-left:1.5px solid var(--forest);}
.type-btn.on{background:var(--forest);color:white;}
.fee-row{background:var(--c);border:1px solid var(--cd);border-radius:6px;padding:0.8rem 1rem;display:flex;justify-content:space-between;align-items:center;margin:0.8rem 0;}
.fee-row span{font-size:0.88rem;color:#777;}
.fee-row strong{color:var(--terra);font-size:1.05rem;}
.total-row{display:flex;justify-content:space-between;align-items:center;border-top:2px solid var(--cd);padding-top:1rem;margin-top:0.5rem;}
.total-row span{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:var(--forest);}
.total-row strong{font-size:1.45rem;color:var(--terra);}
.pay-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.7rem;margin-bottom:1rem;}
.pay-opt{border:1.5px solid var(--cd);border-radius:7px;padding:0.85rem;text-align:center;background:var(--c);transition:all 0.2s;font-size:0.9rem;color:var(--ink);}
.pay-opt.on{border-color:var(--forest);background:rgba(44,74,62,0.07);font-weight:600;color:var(--forest);}
.pay-opt:hover{border-color:var(--forest);}
.pay-opt .ico{font-size:1.5rem;display:block;margin-bottom:0.25rem;}
.acct-box{background:var(--c);border-radius:8px;padding:1rem 1.2rem;font-size:0.94rem;line-height:1.9;margin-bottom:1rem;}
.acct-box strong{color:var(--forest);}
.acct-box .acct-copy{font-size:0.8rem;color:var(--moss);font-style:italic;}
.success-view{text-align:center;padding:1.5rem 0;}
.success-icon{font-size:4rem;margin-bottom:1rem;}
.success-view h3{font-family:'Cormorant Garamond',serif;font-size:2rem;color:var(--forest);margin-bottom:0.6rem;}
.success-view p{color:#666;line-height:1.7;}

/* ── BOOK DETAIL MODAL ───────────────────────────── */
.book-detail-cover{display:flex;gap:2rem;margin-bottom:1.5rem;align-items:flex-start;}
.bd-cover-img{width:120px;height:170px;border-radius:4px 8px 8px 4px;object-fit:cover;flex-shrink:0;box-shadow:4px 4px 16px rgba(0,0,0,0.2);}
.bd-cover-placeholder{width:120px;height:170px;border-radius:4px 8px 8px 4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:0.75rem;color:white;text-align:center;padding:0.5rem;box-shadow:4px 4px 16px rgba(0,0,0,0.2);}
.bd-meta{flex:1;}
.bd-genre{font-size:0.72rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--moss);margin-bottom:0.4rem;}
.bd-title{font-family:'Cormorant Garamond',serif;font-size:1.7rem;color:var(--forest);font-weight:600;margin-bottom:0.25rem;line-height:1.2;}
.bd-author{font-style:italic;color:#777;margin-bottom:0.7rem;}
.bd-price-row{display:flex;gap:1rem;flex-wrap:wrap;}
.bd-price-tag{background:var(--c);border-radius:5px;padding:0.3rem 0.8rem;font-size:0.88rem;}
.bd-price-tag span{color:var(--moss);margin-right:0.3rem;}
.bd-price-tag strong{color:var(--terra);}
.bd-desc{font-size:0.97rem;line-height:1.8;color:#3A3530;}
.bd-excerpt{font-style:italic;color:#555;border-left:3px solid var(--gold);padding-left:1rem;margin:1rem 0;font-size:0.96rem;line-height:1.8;}

/* ── ADMIN ────────────────────────────────────────── */
.admin-page{padding:5rem 2rem 3rem;max-width:800px;margin:0 auto;}
.admin-lock{background:var(--white);border-radius:14px;padding:3rem;text-align:center;box-shadow:0 4px 28px var(--shadow);max-width:420px;margin:0 auto;}
.admin-lock .lock-icon{font-size:3.5rem;margin-bottom:1rem;}
.admin-lock h2{font-family:'Cormorant Garamond',serif;color:var(--forest);font-size:2rem;margin-bottom:0.4rem;}
.admin-lock p{color:#999;font-style:italic;margin-bottom:1.5rem;}
.admin-tabs{display:flex;border:1.5px solid var(--forest);border-radius:8px;overflow:hidden;margin-bottom:1.8rem;}
.atab{flex:1;padding:0.8rem;border:none;font-family:'Lora',serif;font-size:0.92rem;background:transparent;color:var(--forest);transition:all 0.2s;}
.atab+.atab{border-left:1.5px solid var(--forest);}
.atab.on{background:var(--forest);color:white;font-weight:600;}
.atab:hover:not(.on){background:var(--cd);}
.admin-card{background:var(--white);border-radius:12px;padding:1.75rem;box-shadow:0 4px 22px var(--shadow);margin-bottom:1.5rem;}
.admin-card h3{font-family:'Cormorant Garamond',serif;color:var(--forest);font-size:1.5rem;margin-bottom:0.3rem;}
.admin-card p.hint{color:#aaa;font-style:italic;font-size:0.88rem;margin-bottom:1.4rem;}
.item-row{display:flex;align-items:center;gap:1rem;padding:0.8rem;background:var(--c);border-radius:7px;margin-bottom:0.6rem;}
.item-row-mini{width:42px;height:58px;border-radius:3px;flex-shrink:0;object-fit:cover;}
.item-row-placeholder{width:42px;height:58px;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:0.42rem;color:white;text-align:center;padding:2px;}
.item-info{flex:1;min-width:0;}
.item-title{font-size:0.95rem;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.item-sub{font-size:0.8rem;color:var(--moss);}
.item-actions{display:flex;gap:0.4rem;flex-shrink:0;}
.btn-edit{background:none;border:1px solid var(--forest);color:var(--forest);border-radius:4px;padding:0.3rem 0.65rem;font-size:0.78rem;transition:all 0.2s;}
.btn-edit:hover{background:var(--forest);color:white;}
.btn-del{background:none;border:1px solid #ddd;color:#aaa;border-radius:4px;padding:0.3rem 0.65rem;font-size:0.78rem;transition:all 0.2s;}
.btn-del:hover{background:#fee;color:var(--terra);border-color:var(--terra);}
.color-row{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.4rem;}
.cswatch{width:30px;height:30px;border-radius:50%;border:2px solid transparent;transition:all 0.15s;}
.cswatch.on{border-color:var(--forest);transform:scale(1.18);}
.upload-area{border:2px dashed var(--cd);border-radius:8px;padding:1.5rem;text-align:center;cursor:pointer;transition:border-color 0.2s;background:var(--c);}
.upload-area:hover{border-color:var(--forest);}
.upload-preview{width:100px;height:140px;object-fit:cover;border-radius:4px;margin:0 auto 0.5rem;}
.upload-hint{font-size:0.84rem;color:#aaa;font-style:italic;}
.acct-manage{display:flex;flex-direction:column;gap:0.8rem;}
.acct-item{display:flex;align-items:center;gap:1rem;background:var(--c);border-radius:7px;padding:0.9rem 1rem;}
.acct-item-icon{font-size:1.4rem;}
.acct-item-info{flex:1;}
.acct-item-label{font-size:0.82rem;color:var(--moss);text-transform:uppercase;letter-spacing:1px;}
.acct-item-val{font-size:0.97rem;font-weight:600;color:var(--ink);}
.acct-item-name{font-size:0.85rem;color:#777;font-style:italic;}
.badge-default{background:rgba(44,74,62,0.12);color:var(--forest);font-size:0.72rem;padding:0.15rem 0.5rem;border-radius:10px;margin-left:0.4rem;}
.lock-out-btn{background:none;border:1.5px solid #ddd;color:#bbb;padding:0.6rem 1.5rem;border-radius:6px;font-family:'Lora',serif;font-size:0.9rem;transition:all 0.2s;}
.lock-out-btn:hover{border-color:var(--terra);color:var(--terra);}

/* ── CONTACT ──────────────────────────────────────── */
.contact-wrap{max-width:860px;margin:0 auto;padding:5rem 2rem;}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-top:1rem;}
.contact-card{background:var(--white);border-radius:12px;padding:2rem;box-shadow:0 4px 22px var(--shadow);display:flex;flex-direction:column;gap:1.4rem;}
.contact-card h3{font-family:'Cormorant Garamond',serif;font-size:1.45rem;color:var(--forest);margin-bottom:0.2rem;}
.contact-item{display:flex;align-items:flex-start;gap:1rem;}
.contact-icon{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;}
.contact-icon.phone{background:rgba(44,74,62,0.1);}
.contact-icon.email{background:rgba(196,145,58,0.12);}
.contact-icon.ig{background:rgba(193,53,132,0.1);}
.contact-icon.li{background:rgba(0,119,181,0.1);}
.contact-icon.x{background:rgba(30,27,21,0.08);}
.contact-label{font-size:0.72rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--moss);margin-bottom:0.2rem;}
.contact-value{font-size:1rem;color:var(--ink);font-weight:500;line-height:1.4;}
.contact-value a{color:var(--forest);text-decoration:none;transition:color 0.2s;}
.contact-value a:hover{color:var(--terra);}
.contact-note{background:var(--forest);border-radius:12px;padding:2rem;color:var(--blush);font-style:italic;line-height:1.85;font-size:1rem;display:flex;flex-direction:column;justify-content:center;}
.contact-note strong{color:var(--gold);font-style:normal;}
.contact-note .cn-title{font-family:'Cormorant Garamond',serif;font-size:1.6rem;color:var(--white);font-style:normal;margin-bottom:1rem;}

/* ── FOOTER ───────────────────────────────────────── */
.footer{background:var(--ink);padding:3rem 2rem;text-align:center;}
.footer-logo{font-family:'Satisfy',cursive;font-size:2.2rem;color:var(--blush);margin-bottom:0.7rem;}
.footer-logo span{color:var(--gold);}
.footer-tag{color:var(--moss);font-style:italic;margin-bottom:1.5rem;font-size:0.95rem;}
.footer-links{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.5rem;}
.footer-links button{background:none;border:none;color:#888;font-family:'Lora',serif;font-size:0.88rem;transition:color 0.2s;}
.footer-links button:hover{color:var(--blush);}
.footer-copy{font-size:0.8rem;color:#555;}

/* ── TOAST ────────────────────────────────────────── */
.toast{position:fixed;bottom:2rem;right:2rem;z-index:900;background:var(--forest);color:white;padding:0.9rem 1.5rem;border-radius:8px;font-size:0.95rem;box-shadow:0 8px 28px rgba(0,0,0,0.2);animation:slideUp 0.3s ease;max-width:320px;line-height:1.4;}

/* ── RESPONSIVE ───────────────────────────────────── */
@media(max-width:768px){
  .nav-links{gap:0;}
  .nav-btn{font-size:0.78rem;padding:0.4rem 0.5rem;}
  .about-wrap{grid-template-columns:1fr;gap:2rem;}
  .author-card{max-width:280px;margin:0 auto;}
  .frow{grid-template-columns:1fr;}
  .book-detail-cover{flex-direction:column;align-items:center;}
  .admin-tabs{flex-wrap:wrap;}
  .atab{flex:1 0 40%;}
}
`;

/* ─── SEED DATA ─────────────────────────────────────────────────────────── */
const COVER_COLORS = [
  ["#2C4A3E","#1A2E26"],["#A0522D","#6B3520"],["#3D3060","#221840"],
  ["#1B4A6B","#0D2D45"],["#4E6B40","#2F4226"],["#7A3A50","#4E2232"],
  ["#2C5F6E","#173845"],["#5A4020","#3A2810"],
];
const COVER_OPTS = [
  "#2C4A3E","#A0522D","#3D3060","#1B4A6B","#4E6B40","#7A3A50","#2C5F6E","#5A4020",
  "#8B5E3C","#1E4D5C","#4A3060","#3B5A2F",
];

const INIT_BOOKS = [
  {
    id:1,title:"JENNY",author:"Oyesiji Titilopemi (She0pe)",genre:"Contemporary Fiction",
    digitalPrice:3500,physicalPrice:6500,coverColor:COVER_COLORS[0],coverImg:null,
    excerpt:"JENNY is not just a story… it is an experience. It is the unfolding of a life that appears structured and successful on the outside, yet deeply conflicted within.",
    about:"Jenny's journey mirrors a reality many people live but rarely speak about: the tension between purpose and pressure, faith and fear, healing and avoidance. This book explores themes of emotional trauma, spiritual identity, personal growth, and the courage to confront the past. Jenny is not perfect — she is ambitious yet uncertain, strong yet fragile, faithful yet struggling. A story of breaking, mending, and rising again.",
    year:"2025",pages:"166",
  },
  {
    id:2,title:"Whispers of Faith",author:"She0pe",genre:"Inspirational",
    digitalPrice:2800,physicalPrice:5500,coverColor:COVER_COLORS[1],coverImg:null,
    excerpt:"What happens when the voice you've been waiting for was inside you all along? A collection of stories about hearing God in the ordinary.",
    about:"A soul-stirring collection that draws from real experiences of faith tested and proven. For every season of silence, doubt, and waiting — this is the book that says you are not alone.",
    year:"2024",pages:"120",
  },
  {
    id:3,title:"The Okra Garden",author:"She0pe",genre:"Poetry Collection",
    digitalPrice:2200,physicalPrice:4800,coverColor:COVER_COLORS[2],coverImg:null,
    excerpt:"I plant words the way my mother planted seeds — in the dark, not knowing which would break through, trusting that something would survive.",
    about:"A poetry collection rooted in womanhood, memory, God, and growth. She0pe writes about the body, the kitchen, the prayers said in silence, and the joy that comes after weeping. Raw. Tender. Necessary.",
    year:"2024",pages:"88",
  },
];

const INIT_EVENTS = [
  {id:1,day:"14",month:"Jun",title:"JENNY Book Reading & Signing",location:"Terra Kulture, Victoria Island, Lagos",time:"4:00 PM — 7:00 PM",type:"In-Person",desc:"Join She0pe for a live reading of JENNY, a conversation about mental health, faith, and healing."},
  {id:2,day:"28",month:"Jun",title:"Online Reading: Women, Words & God",location:"Instagram Live @sheope_writes",time:"7:00 PM WAT",type:"Online",desc:"An intimate online reading and discussion for readers everywhere."},
  {id:3,day:"19",month:"Jul",title:"Book Club Session: JENNY",location:"Patabah Books, Abuja",time:"3:00 PM — 5:30 PM",type:"In-Person",desc:"Bring your copy of JENNY — we'll dig into the themes of identity, purpose, and healing together."},
];

const INIT_REVIEWS = [
  {id:1,name:"Ngozi A.",book:"JENNY",stars:5,text:"I read JENNY in one sitting and cried three times. She0pe writes the kind of truth that sits in your chest for days.",date:"May 2025"},
  {id:2,name:"Michael O.",book:"Whispers of Faith",stars:5,text:"This book came at exactly the right time. I've never felt so seen by a story.",date:"March 2025"},
  {id:3,name:"Chisom E.",book:"The Okra Garden",stars:5,text:"The poem about the garden and the mother is living rent-free in my mind. Pure artistry.",date:"April 2025"},
];

const INIT_ACCOUNTS = [
  {id:1,currency:"NGN",icon:"🇳🇬",bank:"Opay",name:"Oyesiji Titilopemi",number:"7066499192",isDefault:true},
];

const DELIVERY = {
  "Lagos":1500,"Abuja":3000,"Port Harcourt":3000,
  "Ibadan":2500,"Kano":3500,"Enugu":3000,"Other Nigeria":3500,"International":15000,
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ─── APP ───────────────────────────────────────────────────────────────── */
export default function She0pe() {
  const [page, setPage] = useState("home");
  const [books, setBooks] = useState(INIT_BOOKS);
  const [events, setEvents] = useState(INIT_EVENTS);
  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const [accounts, setAccounts] = useState(INIT_ACCOUNTS);
  const [toast, setToast] = useState(null);
  const [orderModal, setOrderModal] = useState(null);
  const [detailModal, setDetailModal] = useState(null);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminTab, setAdminTab] = useState("books");

  /* order state */
  const [oType, setOType] = useState("digital");
  const [oStep, setOStep] = useState(1);
  const [oForm, setOForm] = useState({name:"",email:"",phone:"",address:"",city:"Lagos",state:"",country:"Nigeria"});
  const [oPay, setOPay] = useState("");
  const [oSuccess, setOSuccess] = useState(false);
  const [oRef, setORef] = useState("");

  /* review form */
  const [rvForm, setRvForm] = useState({name:"",email:"",book:"",stars:5,text:""});

  /* admin login */
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  /* book form */
  const BLANK_BOOK = {id:null,title:"",author:"She0pe",genre:"",digitalPrice:"",physicalPrice:"",coverColor:COVER_OPTS[0],coverImg:null,excerpt:"",about:"",year:new Date().getFullYear().toString(),pages:""};
  const [bForm, setBForm] = useState(BLANK_BOOK);
  const [editingBook, setEditingBook] = useState(false);
  const bImgRef = useRef();

  /* event form */
  const BLANK_EV = {id:null,day:"",month:"Jun",title:"",location:"",time:"",type:"In-Person",desc:""};
  const [evForm, setEvForm] = useState(BLANK_EV);
  const [editingEv, setEditingEv] = useState(false);

  /* account form */
  const BLANK_ACCT = {id:null,currency:"NGN",icon:"🇳🇬",bank:"",name:"",number:"",isDefault:false};
  const [acctForm, setAcctForm] = useState(BLANK_ACCT);
  const [editingAcct, setEditingAcct] = useState(false);
  const [showAcctForm, setShowAcctForm] = useState(false);

  const showToast = (msg, duration=3200) => {
    setToast(msg);
    setTimeout(() => setToast(null), duration);
  };

  const go = (p) => { setPage(p); window.scrollTo(0,0); };

  /* ── ORDER ── */
  const openOrder = (book) => {
    setOrderModal(book); setOType("digital"); setOStep(1);
    setOForm({name:"",email:"",phone:"",address:"",city:"Lagos",state:"",country:"Nigeria"});
    setOPay(""); setOSuccess(false);
    setORef(Date.now().toString().slice(-6));
  };
  const delivFee = DELIVERY[oForm.city] || 3500;
  const bookPrice = orderModal ? (oType==="digital" ? orderModal.digitalPrice : orderModal.physicalPrice) : 0;
  const total = oType==="physical" ? bookPrice + delivFee : bookPrice;
  const defaultAcct = accounts.find(a=>a.isDefault) || accounts[0];

  const placeOrder = () => {
    if (!oPay) return showToast("Please select a payment method.");
    setOSuccess(true);
    showToast("Order received! 🎉 Thank you.");
  };

  /* ── REVIEW ── */
  const submitReview = () => {
    if (!rvForm.name || !rvForm.book || !rvForm.text) return showToast("Please fill name, book and review.");
    setReviews(p => [{id:Date.now(),name:rvForm.name,book:rvForm.book,stars:rvForm.stars,text:rvForm.text,
      date:new Date().toLocaleDateString("en-GB",{month:"long",year:"numeric"})}, ...p]);
    setRvForm({name:"",email:"",book:"",stars:5,text:""});
    showToast("Thank you for your feedback! 💛");
  };

  /* ── ADMIN ── */
  const tryLogin = () => {
    if (adminUser==="She0pe_Weh0pe" && adminPass==="she0petop101#") {
      setAdminAuth(true); showToast("Welcome, She0pe! 👑");
    } else { showToast("Incorrect username or password."); }
  };
  const logout = () => { setAdminAuth(false); setAdminUser(""); setAdminPass(""); };

  /* book image upload */
  const handleImgUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setBForm(p=>({...p, coverImg: ev.target.result}));
    reader.readAsDataURL(file);
  };

  /* save book */
  const saveBook = () => {
    const {title,genre,digitalPrice,excerpt} = bForm;
    if (!title||!genre||!digitalPrice||!excerpt) return showToast("Please fill: title, genre, digital price, excerpt.");
    const cc = [bForm.coverColor, bForm.coverColor+"99"];
    if (editingBook) {
      setBooks(p=>p.map(b=>b.id===bForm.id?{...bForm,digitalPrice:Number(bForm.digitalPrice),physicalPrice:Number(bForm.physicalPrice)||0,coverColor:cc}:b));
      showToast("Book updated! ✅");
    } else {
      setBooks(p=>[...p,{...bForm,id:Date.now(),digitalPrice:Number(bForm.digitalPrice),physicalPrice:Number(bForm.physicalPrice)||0,coverColor:cc}]);
      showToast("Book added to shop! 📚");
    }
    setBForm(BLANK_BOOK); setEditingBook(false);
  };
  const editBook = (b) => {
    setBForm({...b, coverColor:b.coverColor[0]||COVER_OPTS[0], digitalPrice:String(b.digitalPrice), physicalPrice:String(b.physicalPrice)});
    setEditingBook(true); setAdminTab("books"); window.scrollTo(0,0);
  };
  const delBook = (id) => { setBooks(p=>p.filter(b=>b.id!==id)); showToast("Book removed."); };

  /* save event */
  const saveEvent = () => {
    const {title,day,location,time} = evForm;
    if (!title||!day||!location||!time) return showToast("Please fill all required event fields.");
    if (editingEv) {
      setEvents(p=>p.map(e=>e.id===evForm.id?evForm:e)); showToast("Event updated! 📅");
    } else {
      setEvents(p=>[...p,{...evForm,id:Date.now()}]); showToast("Event added! 🎉");
    }
    setEvForm(BLANK_EV); setEditingEv(false);
  };
  const editEvent = (e) => { setEvForm(e); setEditingEv(true); setAdminTab("events"); window.scrollTo(0,0); };
  const delEvent = (id) => { setEvents(p=>p.filter(e=>e.id!==id)); showToast("Event removed."); };

  /* save account */
  const saveAcct = () => {
    const {bank,name,number,currency} = acctForm;
    if (!bank||!name||!number||!currency) return showToast("Please fill all account fields.");
    if (editingAcct) {
      setAccounts(p=>p.map(a=>a.id===acctForm.id?acctForm:a)); showToast("Account updated! ✅");
    } else {
      setAccounts(p=>[...p,{...acctForm,id:Date.now()}]); showToast("Account added! 💳");
    }
    setAcctForm(BLANK_ACCT); setEditingAcct(false); setShowAcctForm(false);
  };
  const setDefaultAcct = (id) => setAccounts(p=>p.map(a=>({...a,isDefault:a.id===id})));
  const delAcct = (id) => { if (accounts.length<=1) return showToast("You need at least one account."); setAccounts(p=>p.filter(a=>a.id!==id)); };

  /* ── RENDER ── */
  return (
    <>
      <style>{FONTS+CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={()=>go("home")}>She<span>0</span>pe</div>
        <div className="nav-links">
          {[["home","Home"],["shop","Shop"],["about","About"],["events","Events"],["feedback","Feedback"],["contact","Contact"]].map(([k,v])=>(
            <button key={k} className={`nav-btn ${page===k?"act":""}`} onClick={()=>go(k)}>{v}</button>
          ))}
          <button className="nav-btn nav-admin-btn" onClick={()=>go("admin")}>🔐</button>
        </div>
      </nav>

      {/* ═══ HOME ══════════════════════════════════════════════════════════ */}
      {page==="home" && <div className="page">
        {/* Hero */}
        <div className="hero">
          <div className="hero-dots"/>
          <div className="hero-glow"/>
          <div className="hero-leaf l1">🍃</div>
          <div className="hero-leaf l2">🌿</div>
          <div className="hero-inner">
            <div className="hero-eyebrow">✦ Step into the world of</div>
            <h1 className="hero-title">She<em>0</em>pe<br/>Writes</h1>
            <p className="hero-quote">
              Welcome to the Literary world of She0pe — stories and books are birth from experiences and inspirations,
              and <strong>a heart that reads hope finds hope.</strong>
            </p>
            <div className="hero-actions">
              <button className="btn-gold" onClick={()=>go("shop")}>Browse Books</button>
              <button className="btn-ghost" onClick={()=>go("about")}>Meet the Author</button>
            </div>
          </div>
          <div className="scroll-hint"><span>Scroll</span></div>
        </div>

        {/* Featured Titles */}
        <div className="section">
          <h2 className="sh">Featured <em>Titles</em></h2>
          <div className="sh-line"/>
          <div className="book-grid">
            {books.slice(0,4).map(b=><BookCard key={b.id} book={b} onOrder={openOrder} onDetail={setDetailModal}/>)}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <button className="btn-gold" onClick={()=>go("shop")}>View All Books →</button>
          </div>
        </div>

        {/* Green Band Quote */}
        <div className="green-band">
          <div className="green-band-inner">
            <span className="gb-open">"</span>
            <p className="gb-quote">We find hope in stories, faith is strengthened from testimonies, and we can keep living because we read that someone lived.</p>
            <span className="gb-attr">— She0pe</span>
          </div>
        </div>

        {/* Events preview */}
        <div style={{padding:"4.5rem 2rem",background:"var(--forest)"}}>
          <div style={{maxWidth:"1140px",margin:"0 auto"}}>
            <h2 className="sh" style={{color:"var(--white)"}}>Upcoming <em style={{color:"var(--gold)"}}>Events</em></h2>
            <div className="sh-line"/>
            {events.length===0 && <p className="no-events">No upcoming events. Check back soon!</p>}
            <div className="ev-grid">
              {events.slice(0,3).map(e=><EventCard key={e.id} event={e}/>)}
            </div>
            <div style={{textAlign:"center",marginTop:"2rem"}}>
              <button className="btn-ghost" onClick={()=>go("events")}>All Events →</button>
            </div>
          </div>
        </div>
      </div>}

      {/* ═══ SHOP ══════════════════════════════════════════════════════════ */}
      {page==="shop" && <div className="page">
        <div className="section">
          <h2 className="sh">The <em>Bookshelf</em></h2>
          <div className="sh-line"/>
          <p className="sh-sub">Browse softcopy and physical editions — every book ships with love.</p>
          {books.length===0 && <p style={{textAlign:"center",color:"#aaa",fontStyle:"italic",padding:"3rem"}}>No books in the shop yet. Check back soon!</p>}
          <div className="book-grid">
            {books.map(b=><BookCard key={b.id} book={b} onOrder={openOrder} onDetail={setDetailModal}/>)}
          </div>
        </div>
      </div>}

      {/* ═══ ABOUT ═════════════════════════════════════════════════════════ */}
      {page==="about" && <div className="page">
        <div className="about-wrap">
          <div>
            <div className="author-card" style={{maxWidth:"320px"}}>
              <div className="author-card-bg">Stories<br/>live here</div>
              <div className="author-icon">✍🏾</div>
              <div className="author-card-name">She0pe</div>
              <div className="author-card-tag">Nigerian Author · Novelist · Poet</div>
            </div>
          </div>
          <div className="about-content">
            <div style={{fontSize:"0.78rem",color:"var(--moss)",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"0.5rem"}}>The Author</div>
            <h2>Oyesiji Titilopemi</h2>
            <div className="sub">She0pe — Novelist · Poet · Storyteller</div>
            <p>She0pe is a Nigerian author whose work breathes in the space between our lives as humans and our relationship with God. She writes on major topics like faith, marriage, finance, career, friendship, purpose and struggles — stories that don't shy away from the hard, honest truth of being human.</p>
            <p>She believes we find hope in stories. Faith is strengthened from testimonies, and we can keep living because we read that someone lived. Her writing holds space for the broken and the building — for everyone in between.</p>
            <p>When she is not writing, she's managing a project or analyzing a dataset, or worshipping, or creating content or learning recipes she will never cook, and looking for the perfect sentence.</p>
            <div className="about-stats">
              <div className="stat"><div className="stat-n">{books.length}</div><div className="stat-l">Books</div></div>
              <div className="stat"><div className="stat-n">12K+</div><div className="stat-l">Readers</div></div>
              <div className="stat"><div className="stat-n">3</div><div className="stat-l">Awards</div></div>
              <div className="stat"><div className="stat-n">7yrs</div><div className="stat-l">Writing</div></div>
            </div>
            <div style={{marginTop:"2rem",display:"flex",gap:"1rem",flexWrap:"wrap"}}>
              <button className="btn-gold" onClick={()=>go("shop")}>Explore Books</button>
              <button className="btn-ghost" style={{border:"1.5px solid var(--forest)",color:"var(--forest)"}} onClick={()=>go("feedback")}>Read Reviews</button>
            </div>
          </div>
        </div>
      </div>}

      {/* ═══ EVENTS ════════════════════════════════════════════════════════ */}
      {page==="events" && <div className="page">
        <div className="events-bg" style={{minHeight:"calc(100vh - 60px)"}}>
          <div className="events-inner" style={{paddingTop:"1rem"}}>
            <h2 className="sh" style={{color:"var(--white)"}}>Upcoming <em style={{color:"var(--gold)"}}>Events</em></h2>
            <div className="sh-line"/>
            {events.length===0 && <p className="no-events">No upcoming events. Follow <strong style={{color:"var(--gold)"}}>@sheope_writes</strong> for updates!</p>}
            <div className="ev-grid">
              {events.map(e=><EventCard key={e.id} event={e}/>)}
            </div>
          </div>
        </div>
      </div>}

      {/* ═══ FEEDBACK ══════════════════════════════════════════════════════ */}
      {page==="feedback" && <div className="page">
        <div className="section" style={{maxWidth:"960px"}}>
          <h2 className="sh">Reader <em>Voices</em></h2>
          <div className="sh-line"/>
          {reviews.length===0
            ? <p className="no-reviews" style={{textAlign:"center",color:"#aaa",fontStyle:"italic",marginBottom:"2rem"}}>No reviews yet — be the first!</p>
            : <div className="reviews-grid">
                {reviews.map(r=>(
                  <div key={r.id} className="rv-card">
                    <div className="rv-stars">{"★".repeat(r.stars)}{"☆".repeat(5-r.stars)}</div>
                    <p className="rv-text">"{r.text}"</p>
                    <div className="rv-name">{r.name}</div>
                    <div className="rv-book">on <em>{r.book}</em> · {r.date}</div>
                  </div>
                ))}
              </div>
          }
          <div className="fb-form">
            <h3>Leave Your Feedback</h3>
            <div className="frow">
              <div className="fg"><label>Your Name *</label><input value={rvForm.name} onChange={e=>setRvForm(p=>({...p,name:e.target.value}))} placeholder="Full name"/></div>
              <div className="fg"><label>Email (optional)</label><input value={rvForm.email} onChange={e=>setRvForm(p=>({...p,email:e.target.value}))} placeholder="your@email.com"/></div>
            </div>
            <div className="fg">
              <label>Book *</label>
              <select value={rvForm.book} onChange={e=>setRvForm(p=>({...p,book:e.target.value}))}>
                <option value="">— Select a book —</option>
                {books.map(b=><option key={b.id} value={b.title}>{b.title}</option>)}
              </select>
            </div>
            <div className="fg">
              <label>Rating</label>
              <div className="star-row">{[1,2,3,4,5].map(s=>(
                <button key={s} className="star-btn" onClick={()=>setRvForm(p=>({...p,stars:s}))}>{s<=rvForm.stars?"★":"☆"}</button>
              ))}</div>
            </div>
            <div className="fg"><label>Your Review *</label><textarea value={rvForm.text} onChange={e=>setRvForm(p=>({...p,text:e.target.value}))} placeholder="Share your thoughts about the book..."/></div>
            <button className="btn-gold" style={{width:"100%",padding:"0.85rem"}} onClick={submitReview}>Submit Feedback</button>
          </div>
        </div>
      </div>}

      {/* ═══ ADMIN ═════════════════════════════════════════════════════════ */}
      {page==="admin" && <div className="page">
        <div className="admin-page">
          <h2 className="sh">Admin <em>Panel</em></h2>
          <div className="sh-line"/>
          {!adminAuth ? (
            <div className="admin-lock">
              <div className="lock-icon">🔐</div>
              <h2>Author Dashboard</h2>
              <p>Enter your credentials to continue</p>
              <div className="fg"><label>Username</label><input value={adminUser} onChange={e=>setAdminUser(e.target.value)} placeholder="Username" autoComplete="off"/></div>
              <div className="fg">
                <label>Password</label>
                <div style={{position:"relative"}}>
                  <input type={showPass?"text":"password"} value={adminPass} onChange={e=>setAdminPass(e.target.value)} placeholder="Password" onKeyDown={e=>e.key==="Enter"&&tryLogin()} style={{width:"100%",paddingRight:"2.5rem"}}/>
                  <button onClick={()=>setShowPass(p=>!p)} style={{position:"absolute",right:"0.6rem",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#aaa",fontSize:"1rem"}}>{showPass?"🙈":"👁️"}</button>
                </div>
              </div>
              <button className="btn-gold" style={{width:"100%",padding:"0.85rem",marginTop:"0.5rem"}} onClick={tryLogin}>Unlock Dashboard</button>
            </div>
          ) : (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
                <p style={{color:"var(--moss)",fontStyle:"italic"}}>Welcome back, <strong style={{color:"var(--forest)"}}>She0pe</strong> 👑</p>
                <button className="lock-out-btn" onClick={logout}>🔒 Lock Dashboard</button>
              </div>

              {/* Tabs */}
              <div className="admin-tabs">
                {[["books","📚 Books"],["events","📅 Events"],["accounts","💳 Accounts"]].map(([k,v])=>(
                  <button key={k} className={`atab ${adminTab===k?"on":""}`} onClick={()=>setAdminTab(k)}>{v}</button>
                ))}
              </div>

              {/* ── BOOKS TAB ── */}
              {adminTab==="books" && <>
                <div className="admin-card">
                  <h3>{editingBook?"✏️ Edit Book":"Add New Book"}</h3>
                  <p className="hint">{editingBook?"Update the book details and save.":"Fill in the details to list a new book or product."}</p>
                  <div className="frow">
                    <div className="fg"><label>Title *</label><input value={bForm.title} onChange={e=>setBForm(p=>({...p,title:e.target.value}))} placeholder="Book title"/></div>
                    <div className="fg"><label>Author</label><input value={bForm.author} onChange={e=>setBForm(p=>({...p,author:e.target.value}))}/></div>
                  </div>
                  <div className="frow">
                    <div className="fg">
                      <label>Genre *</label>
                      <select value={bForm.genre} onChange={e=>setBForm(p=>({...p,genre:e.target.value}))}>
                        <option value="">— Genre —</option>
                        {["Contemporary Fiction","Inspirational","Poetry Collection","Historical Fiction","Romance","Non-Fiction","Memoir","Children's Book","Faith & Spirituality","Self Help","Short Stories","Other"].map(g=><option key={g}>{g}</option>)}
                      </select>
                    </div>
                    <div className="fg">
                      <label>Year</label>
                      <input value={bForm.year} onChange={e=>setBForm(p=>({...p,year:e.target.value}))} placeholder="e.g. 2025"/>
                    </div>
                  </div>
                  <div className="frow">
                    <div className="fg"><label>Digital Price (₦) *</label><input type="number" value={bForm.digitalPrice} onChange={e=>setBForm(p=>({...p,digitalPrice:e.target.value}))} placeholder="e.g. 3500"/></div>
                    <div className="fg"><label>Physical Price (₦)</label><input type="number" value={bForm.physicalPrice} onChange={e=>setBForm(p=>({...p,physicalPrice:e.target.value}))} placeholder="e.g. 6500"/></div>
                  </div>
                  <div className="frow">
                    <div className="fg"><label>Pages</label><input value={bForm.pages} onChange={e=>setBForm(p=>({...p,pages:e.target.value}))} placeholder="e.g. 166"/></div>
                    <div className="fg">
                      <label>Spine Colour (fallback)</label>
                      <div className="color-row">
                        {COVER_OPTS.map(c=>(
                          <div key={c} className={`cswatch ${bForm.coverColor===c?"on":""}`} style={{background:c}} onClick={()=>setBForm(p=>({...p,coverColor:c}))}/>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Cover Image Upload */}
                  <div className="fg">
                    <label>Book Cover Image</label>
                    <input type="file" accept="image/*" ref={bImgRef} style={{display:"none"}} onChange={handleImgUpload}/>
                    <div className="upload-area" onClick={()=>bImgRef.current.click()}>
                      {bForm.coverImg
                        ? <img src={bForm.coverImg} className="upload-preview" alt="cover"/>
                        : <div style={{padding:"1rem"}}><div style={{fontSize:"2rem",marginBottom:"0.4rem"}}>📷</div><div className="upload-hint">Click to upload book cover image</div></div>
                      }
                    </div>
                    {bForm.coverImg && <button style={{marginTop:"0.4rem",background:"none",border:"1px solid #ddd",color:"#aaa",borderRadius:"4px",padding:"0.25rem 0.7rem",fontSize:"0.78rem"}} onClick={()=>setBForm(p=>({...p,coverImg:null}))}>Remove image</button>}
                  </div>
                  <div className="fg"><label>Short Excerpt *</label><textarea value={bForm.excerpt} onChange={e=>setBForm(p=>({...p,excerpt:e.target.value}))} placeholder="2–3 sentence teaser shown on the book card..."/></div>
                  <div className="fg"><label>About / Full Description</label><textarea value={bForm.about} onChange={e=>setBForm(p=>({...p,about:e.target.value}))} placeholder="Full description for the book detail view..." style={{minHeight:"120px"}}/></div>
                  <div style={{display:"flex",gap:"0.75rem"}}>
                    {editingBook && <button className="btn-del" style={{padding:"0.6rem 1rem"}} onClick={()=>{setBForm(BLANK_BOOK);setEditingBook(false);}}>Cancel</button>}
                    <button className="btn-gold" style={{flex:1,padding:"0.8rem"}} onClick={saveBook}>{editingBook?"💾 Save Changes":"+ Add Book"}</button>
                  </div>
                </div>

                <div className="admin-card">
                  <h3>All Books ({books.length})</h3>
                  {books.length===0 && <p style={{color:"#aaa",fontStyle:"italic",textAlign:"center",padding:"1rem"}}>No books yet.</p>}
                  {books.map(b=>(
                    <div key={b.id} className="item-row">
                      {b.coverImg
                        ? <img src={b.coverImg} className="item-row-mini" alt={b.title}/>
                        : <div className="item-row-placeholder" style={{background:`linear-gradient(135deg,${b.coverColor[0]},${b.coverColor[1]||b.coverColor[0]})`}}><span>{b.title.slice(0,15)}</span></div>
                      }
                      <div className="item-info">
                        <div className="item-title">{b.title}</div>
                        <div className="item-sub">₦{b.digitalPrice.toLocaleString()} digital · ₦{(b.physicalPrice||0).toLocaleString()} physical · {b.genre}</div>
                      </div>
                      <div className="item-actions">
                        <button className="btn-edit" onClick={()=>editBook(b)}>Edit</button>
                        <button className="btn-del" onClick={()=>delBook(b.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>}

              {/* ── EVENTS TAB ── */}
              {adminTab==="events" && <>
                <div className="admin-card">
                  <h3>{editingEv?"✏️ Edit Event":"Add New Event"}</h3>
                  <p className="hint">{editingEv?"Update the event and save.":"Add an upcoming book reading, signing, or session."}</p>
                  <div className="fg"><label>Event Title *</label><input value={evForm.title} onChange={e=>setEvForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Book Reading & Signing"/></div>
                  <div className="frow">
                    <div className="fg"><label>Day *</label><input value={evForm.day} onChange={e=>setEvForm(p=>({...p,day:e.target.value}))} placeholder="e.g. 14" maxLength={2}/></div>
                    <div className="fg"><label>Month</label>
                      <select value={evForm.month} onChange={e=>setEvForm(p=>({...p,month:e.target.value}))}>
                        {MONTHS.map(m=><option key={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="fg"><label>Type</label>
                      <select value={evForm.type} onChange={e=>setEvForm(p=>({...p,type:e.target.value}))}>
                        {["In-Person","Online","Hybrid"].map(t=><option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="fg"><label>Location / Platform *</label><input value={evForm.location} onChange={e=>setEvForm(p=>({...p,location:e.target.value}))} placeholder="e.g. Terra Kulture, Victoria Island, Lagos"/></div>
                  <div className="fg"><label>Time *</label><input value={evForm.time} onChange={e=>setEvForm(p=>({...p,time:e.target.value}))} placeholder="e.g. 4:00 PM — 7:00 PM"/></div>
                  <div className="fg"><label>Description</label><textarea value={evForm.desc} onChange={e=>setEvForm(p=>({...p,desc:e.target.value}))} placeholder="Brief event description..." style={{minHeight:"80px"}}/></div>
                  <div style={{display:"flex",gap:"0.75rem"}}>
                    {editingEv && <button className="btn-del" style={{padding:"0.6rem 1rem"}} onClick={()=>{setEvForm(BLANK_EV);setEditingEv(false);}}>Cancel</button>}
                    <button className="btn-gold" style={{flex:1,padding:"0.8rem"}} onClick={saveEvent}>{editingEv?"💾 Save Changes":"+ Add Event"}</button>
                  </div>
                </div>
                <div className="admin-card">
                  <h3>All Events ({events.length})</h3>
                  {events.length===0 && <p style={{color:"#aaa",fontStyle:"italic",textAlign:"center",padding:"1rem"}}>No events yet.</p>}
                  {events.map(e=>(
                    <div key={e.id} className="item-row">
                      <div style={{background:"var(--terra)",borderRadius:"6px",padding:"0.35rem 0.6rem",textAlign:"center",minWidth:"44px",flexShrink:0}}>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",color:"white",lineHeight:1}}>{e.day}</div>
                        <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.85)",textTransform:"uppercase",letterSpacing:"1px"}}>{e.month}</div>
                      </div>
                      <div className="item-info">
                        <div className="item-title">{e.title}</div>
                        <div className="item-sub">📍 {e.location} · {e.type}</div>
                      </div>
                      <div className="item-actions">
                        <button className="btn-edit" onClick={()=>editEvent(e)}>Edit</button>
                        <button className="btn-del" onClick={()=>delEvent(e.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>}

              {/* ── ACCOUNTS TAB ── */}
              {adminTab==="accounts" && <>
                <div className="admin-card">
                  <h3>Payment Accounts</h3>
                  <p className="hint">Manage bank accounts where customers send payments. The default account is shown to customers at checkout.</p>
                  <div className="acct-manage">
                    {accounts.map(a=>(
                      <div key={a.id} className="acct-item">
                        <div className="acct-item-icon">{a.icon}</div>
                        <div className="acct-item-info">
                          <div className="acct-item-label">{a.currency} · {a.bank}{a.isDefault&&<span className="badge-default">Default</span>}</div>
                          <div className="acct-item-val">{a.number}</div>
                          <div className="acct-item-name">{a.name}</div>
                        </div>
                        <div className="item-actions" style={{flexDirection:"column",gap:"0.3rem"}}>
                          <button className="btn-edit" onClick={()=>{setAcctForm(a);setEditingAcct(true);setShowAcctForm(true);}}>Edit</button>
                          {!a.isDefault && <button className="btn-edit" style={{fontSize:"0.72rem"}} onClick={()=>setDefaultAcct(a.id)}>Set Default</button>}
                          {!a.isDefault && <button className="btn-del" onClick={()=>delAcct(a.id)}>Remove</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-gold" style={{width:"100%",padding:"0.75rem",marginTop:"1.2rem"}} onClick={()=>{setAcctForm(BLANK_ACCT);setEditingAcct(false);setShowAcctForm(p=>!p);}}>
                    {showAcctForm?"✕ Cancel":"+ Add New Account"}
                  </button>
                </div>

                {showAcctForm && <div className="admin-card">
                  <h3>{editingAcct?"✏️ Edit Account":"Add New Account"}</h3>
                  <div className="frow">
                    <div className="fg"><label>Currency *</label><input value={acctForm.currency} onChange={e=>setAcctForm(p=>({...p,currency:e.target.value}))} placeholder="e.g. NGN, USD"/></div>
                    <div className="fg"><label>Flag Emoji</label><input value={acctForm.icon} onChange={e=>setAcctForm(p=>({...p,icon:e.target.value}))} placeholder="🇳🇬"/></div>
                  </div>
                  <div className="fg"><label>Bank Name *</label><input value={acctForm.bank} onChange={e=>setAcctForm(p=>({...p,bank:e.target.value}))} placeholder="e.g. Opay, GTBank, PayPal"/></div>
                  <div className="fg"><label>Account Name *</label><input value={acctForm.name} onChange={e=>setAcctForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Oyesiji Titilopemi"/></div>
                  <div className="fg"><label>Account Number *</label><input value={acctForm.number} onChange={e=>setAcctForm(p=>({...p,number:e.target.value}))} placeholder="Account number or username"/></div>
                  <div className="fg" style={{flexDirection:"row",alignItems:"center",gap:"0.7rem"}}>
                    <input type="checkbox" id="defAcct" checked={acctForm.isDefault} onChange={e=>setAcctForm(p=>({...p,isDefault:e.target.checked}))} style={{width:"auto"}}/>
                    <label htmlFor="defAcct" style={{marginBottom:0}}>Set as default account</label>
                  </div>
                  <button className="btn-gold" style={{width:"100%",padding:"0.8rem"}} onClick={saveAcct}>{editingAcct?"💾 Save Changes":"+ Add Account"}</button>
                </div>}
              </>}

              <div style={{textAlign:"center",marginTop:"2rem"}}>
                <button className="lock-out-btn" onClick={logout}>🔒 Lock Dashboard</button>
              </div>
            </div>
          )}
        </div>
      </div>}

      {/* ═══ CONTACT ═══════════════════════════════════════════════════════ */}
      {page==="contact" && <div className="page">
        <div className="contact-wrap">
          <h2 className="sh">Get in <em>Touch</em></h2>
          <div className="sh-line"/>
          <p className="sh-sub">Reach out for book orders, collaborations, events or just to say hello.</p>
          <div className="contact-grid">
            {/* Contact details card */}
            <div className="contact-card">
              <h3>Contact She0pe</h3>

              <div className="contact-item">
                <div className="contact-icon phone">📞</div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value"><a href="tel:09115739055">09115739055</a></div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon email">✉️</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value"><a href="mailto:she00pe@gmail.com">she00pe@gmail.com</a></div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon ig">📸</div>
                <div>
                  <div className="contact-label">Instagram</div>
                  <div className="contact-value"><a href="https://instagram.com" target="_blank" rel="noreferrer">Oyesiji Titilopemi (We0pe)</a></div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon li">💼</div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value"><a href="https://linkedin.com" target="_blank" rel="noreferrer">Oyesiji Titilopemi</a></div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon x">𝕏</div>
                <div>
                  <div className="contact-label">X (Twitter)</div>
                  <div className="contact-value"><a href="https://x.com/TitilopemiOyes1" target="_blank" rel="noreferrer">Oyesiji Titilopemi<br/><span style={{fontSize:"0.85rem",color:"var(--moss)"}}>@TitilopemiOyes1</span></a></div>
                </div>
              </div>
            </div>

            {/* Message note card */}
            <div className="contact-note">
              <div className="cn-title">A word from She0pe</div>
              <p>Every message I receive reminds me why I write. Whether you finished a book and just needed to tell someone, or you have a question about an order — <strong>my inbox is always open.</strong></p>
              <p style={{marginTop:"1rem"}}>For proof of payment, please send to <strong>she00pe@gmail.com</strong> with your name and book title as the subject.</p>
              <p style={{marginTop:"1rem"}}>I read every message. I may not reply in 24 hours — but I will reply.</p>
              <p style={{marginTop:"1.5rem",fontSize:"0.9rem",color:"var(--moss)"}}>— With love, She0pe ✍🏾</p>
            </div>
          </div>
        </div>
      </div>}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">She<span>0</span>pe</div>
        <div className="footer-tag">Stories that find you where you live.</div>
        <div className="footer-links">
          {[["home","Home"],["shop","Shop"],["about","About"],["events","Events"],["feedback","Feedback"],["contact","Contact"]].map(([k,v])=>(
            <button key={k} onClick={()=>go(k)}>{v}</button>
          ))}
        </div>
        <div className="footer-copy">© 2025 She0pe · Oyesiji Titilopemi · All rights reserved.</div>
      </footer>

      {/* ═══ ORDER MODAL ═══════════════════════════════════════════════════ */}
      {orderModal && <div className="overlay" onClick={e=>{if(e.target.className==="overlay")setOrderModal(null);}}>
        <div className="modal">
          {oSuccess ? (
            <div className="success-view">
              <div className="success-icon">🎉</div>
              <h3>Order Received!</h3>
              <p>Thank you for ordering <em>{orderModal.title}</em>.<br/>
              {oType==="digital" ? "Your digital copy will be sent to your email." : "Your physical copy will be delivered within 3–7 business days."}<br/><br/>
              {defaultAcct && <>Please transfer <strong>₦{total.toLocaleString()}</strong> to:<br/><strong>{defaultAcct.bank}</strong> · {defaultAcct.number} · {defaultAcct.name}<br/><small>Use your name as reference.</small></>}
              </p>
              <button className="btn-gold" style={{marginTop:"1.5rem",width:"100%",padding:"0.85rem"}} onClick={()=>setOrderModal(null)}>Done</button>
            </div>
          ) : <>
            <div className="modal-hd">
              <h2>{orderModal.title}</h2>
              <button className="modal-close" onClick={()=>setOrderModal(null)}>✕</button>
            </div>
            <p className="modal-sub">by {orderModal.author}</p>

            <div className="type-toggle">
              <button className={`type-btn ${oType==="digital"?"on":""}`} onClick={()=>setOType("digital")}>📱 Digital — ₦{orderModal.digitalPrice?.toLocaleString()}</button>
              <button className={`type-btn ${oType==="physical"?"on":""}`} onClick={()=>setOType("physical")}>📦 Physical — ₦{orderModal.physicalPrice?.toLocaleString()}</button>
            </div>

            {oStep===1 && <>
              <div className="frow">
                <div className="fg"><label>Full Name *</label><input value={oForm.name} onChange={e=>setOForm(p=>({...p,name:e.target.value}))} placeholder="Your name"/></div>
                <div className="fg"><label>Email *</label><input value={oForm.email} onChange={e=>setOForm(p=>({...p,email:e.target.value}))} placeholder="your@email.com"/></div>
              </div>
              <div className="fg"><label>Phone</label><input value={oForm.phone} onChange={e=>setOForm(p=>({...p,phone:e.target.value}))} placeholder="+234…"/></div>

              {oType==="physical" && <>
                <div style={{borderTop:"2px dashed var(--cd)",margin:"1rem 0",paddingTop:"1rem"}}>
                  <p style={{fontSize:"0.84rem",color:"var(--forest)",fontWeight:600,marginBottom:"0.75rem"}}>📍 Delivery Address</p>
                  <div className="fg"><label>Street Address *</label><input value={oForm.address} onChange={e=>setOForm(p=>({...p,address:e.target.value}))} placeholder="Street, house number"/></div>
                  <div className="frow">
                    <div className="fg"><label>State</label><input value={oForm.state} onChange={e=>setOForm(p=>({...p,state:e.target.value}))} placeholder="e.g. Lagos State"/></div>
                    <div className="fg"><label>Delivery Zone</label>
                      <select value={oForm.city} onChange={e=>setOForm(p=>({...p,city:e.target.value}))}>
                        {Object.keys(DELIVERY).map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="fg"><label>Country</label><input value={oForm.country} onChange={e=>setOForm(p=>({...p,country:e.target.value}))}/></div>
                </div>
                <div className="fee-row"><span>🚚 Delivery fee ({oForm.city})</span><strong>₦{delivFee.toLocaleString()}</strong></div>
              </>}
              <div className="total-row"><span>Total</span><strong>₦{total.toLocaleString()}</strong></div>
              <button className="btn-gold" style={{width:"100%",marginTop:"1rem",padding:"0.85rem"}} onClick={()=>{
                if (!oForm.name||!oForm.email) return showToast("Please enter your name and email.");
                if (oType==="physical"&&!oForm.address) return showToast("Please enter your delivery address.");
                setOStep(2);
              }}>Proceed to Payment →</button>
            </>}

            {oStep===2 && <>
              <p style={{color:"var(--moss)",fontStyle:"italic",marginBottom:"1rem",fontSize:"0.92rem"}}>Choose your payment method:</p>
              <div className="pay-grid">
                {accounts.map(a=>(
                  <div key={a.id} className={`pay-opt ${oPay===String(a.id)?"on":""}`} onClick={()=>setOPay(String(a.id))}>
                    <span className="ico">{a.icon}</span>{a.currency} · {a.bank}
                  </div>
                ))}
                {[{id:"card",ico:"💳",label:"Debit Card"},{id:"paystack",ico:"🟢",label:"Paystack"},{id:"flutterwave",ico:"🦋",label:"Flutterwave"}].map(m=>(
                  <div key={m.id} className={`pay-opt ${oPay===m.id?"on":""}`} onClick={()=>setOPay(m.id)}>
                    <span className="ico">{m.ico}</span>{m.label}
                  </div>
                ))}
              </div>

              {/* Show bank details for selected account */}
              {accounts.find(a=>String(a.id)===oPay) && (()=>{
                const a = accounts.find(ac=>String(ac.id)===oPay);
                return <div className="acct-box">
                  <strong>Bank:</strong> {a.bank}<br/>
                  <strong>Account Name:</strong> {a.name}<br/>
                  <strong>Account Number:</strong> {a.number}<br/>
                  <strong>Amount:</strong> ₦{total.toLocaleString()}<br/>
                  <strong>Reference:</strong> {oForm.name?.split(" ")[0]||"ORDER"}-{oRef}<br/>
                  <span className="acct-copy">Send proof of payment to she00pe@gmail.com</span>
                </div>;
              })()}
              {(oPay==="card"||oPay==="paystack"||oPay==="flutterwave") && (
                <div className="acct-box" style={{textAlign:"center"}}>
                  <div style={{fontSize:"1.5rem",marginBottom:"0.4rem"}}>💳</div>
                  You'll be redirected to a secure payment page.<br/>
                  <small style={{color:"#aaa"}}>Amount: ₦{total.toLocaleString()}</small>
                </div>
              )}

              <div className="total-row"><span>Order Total</span><strong>₦{total.toLocaleString()}</strong></div>
              <div style={{display:"flex",gap:"0.75rem",marginTop:"1rem"}}>
                <button className="btn-about" onClick={()=>setOStep(1)}>← Back</button>
                <button className="btn-gold" style={{flex:1,padding:"0.8rem"}} onClick={placeOrder}>Confirm & Place Order</button>
              </div>
            </>}
          </>}
        </div>
      </div>}

      {/* ═══ BOOK DETAIL MODAL ════════════════════════════════════════════ */}
      {detailModal && <div className="overlay" onClick={e=>{if(e.target.className==="overlay")setDetailModal(null);}}>
        <div className="modal wide">
          <div className="modal-hd">
            <div/>
            <button className="modal-close" onClick={()=>setDetailModal(null)}>✕</button>
          </div>
          <div className="book-detail-cover">
            {detailModal.coverImg
              ? <img src={detailModal.coverImg} className="bd-cover-img" alt={detailModal.title}/>
              : <div className="bd-cover-placeholder" style={{background:`linear-gradient(160deg,${detailModal.coverColor[0]},${detailModal.coverColor[1]||detailModal.coverColor[0]})`}}>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"0.75rem",color:"white",textAlign:"center",padding:"0.3rem"}}>{detailModal.title}</span>
                </div>
            }
            <div className="bd-meta">
              <div className="bd-genre">{detailModal.genre}</div>
              <div className="bd-title">{detailModal.title}</div>
              <div className="bd-author">by {detailModal.author}</div>
              {detailModal.year && <div style={{fontSize:"0.82rem",color:"#aaa",marginBottom:"0.8rem"}}>{detailModal.year}{detailModal.pages ? ` · ${detailModal.pages} pages` : ""}</div>}
              <div className="bd-price-row">
                <div className="bd-price-tag"><span>Digital</span><strong>₦{detailModal.digitalPrice?.toLocaleString()}</strong></div>
                {detailModal.physicalPrice>0 && <div className="bd-price-tag"><span>Physical</span><strong>₦{detailModal.physicalPrice?.toLocaleString()}</strong></div>}
              </div>
            </div>
          </div>
          {detailModal.excerpt && <div className="bd-excerpt">{detailModal.excerpt}</div>}
          {detailModal.about && <p className="bd-desc">{detailModal.about}</p>}
          <div style={{display:"flex",gap:"0.75rem",marginTop:"1.5rem"}}>
            <button className="btn-gold" style={{flex:1,padding:"0.8rem"}} onClick={()=>{setDetailModal(null);openOrder(detailModal);}}>Order This Book</button>
            <button className="btn-about" onClick={()=>setDetailModal(null)}>Close</button>
          </div>
        </div>
      </div>}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

/* ─── SUB-COMPONENTS ────────────────────────────────────────────────────── */
function BookCard({book, onOrder, onDetail}) {
  return (
    <div className="bcard">
      <div className="bcover" style={{background:`linear-gradient(160deg,${book.coverColor[0]}18,${book.coverColor[0]}0a)`}}>
        {book.coverImg
          ? <img src={book.coverImg} alt={book.title} style={{width:"148px",height:"210px",objectFit:"cover",borderRadius:"4px 10px 10px 4px",boxShadow:"5px 5px 18px rgba(0,0,0,0.25)"}}/>
          : <div className="bcover-placeholder" style={{background:`linear-gradient(160deg,${book.coverColor[0]},${book.coverColor[1]||book.coverColor[0]})`}}>
              <div className="bcover-spine"/>
              <div className="bcover-title">{book.title}</div>
              <div className="bcover-author">{book.author}</div>
            </div>
        }
      </div>
      <div className="binfo">
        <div className="b-genre">{book.genre}</div>
        <div className="b-title">{book.title}</div>
        <div className="b-author">by {book.author}</div>
        <div className="b-price">from ₦{book.digitalPrice?.toLocaleString()}</div>
        <div className="b-excerpt">{book.excerpt}</div>
        <div className="b-actions">
          <button className="btn-order" onClick={()=>onOrder(book)}>Order Now</button>
          <button className="btn-about" onClick={()=>onDetail(book)}>About Book</button>
        </div>
      </div>
    </div>
  );
}

function EventCard({event}) {
  return (
    <div className="ev-card">
      <div className="ev-date-box">
        <div className="ev-day">{event.day}</div>
        <div className="ev-month">{event.month}</div>
      </div>
      <div className="ev-title">{event.title}</div>
      <div className="ev-detail">📍 {event.location}</div>
      <div className="ev-detail">🕐 {event.time}</div>
      {event.desc && <div className="ev-detail" style={{marginTop:"0.5rem",color:"rgba(216,220,196,0.7)",fontStyle:"italic",fontSize:"0.85rem"}}>{event.desc}</div>}
      <div className="ev-badge">{event.type}</div>
    </div>
  );
}